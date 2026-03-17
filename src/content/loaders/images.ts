import fs from 'fs/promises';
import path from 'path';
import {
  type ContentType,
  type ImageEntryData,
  findPreviewFile,
  getImageDimensions,
  isContentFile,
  isPreviewFileName,
} from './shared';

/**
 * Logical flow:
 * 1. Walk the images directory recursively so nested folders become navigable collection entries.
 * 2. Visit child directories before emitting the current folder entry, which keeps the flat output aligned
 *    with the folder-path-to-direct-children model used by the image routes.
 * 3. Skip standalone preview files because they are display metadata for folders, not downloadable tiles.
 * 4. For each folder, choose its tile asset in this order: explicit preview image, first displayable file,
 *    then a placeholder marker when the folder has no usable asset.
 * 5. Preserve the current routing metadata (`relativePath`, `parentPath`, `depth`, and slash-to-- IDs)
 *    because the image pages and breadcrumb utilities rely on those exact fields and semantics.
 * 6. Special-case a folder literally named "preview": if the parent already has a preview image, do not emit
 *    that directory as a folder tile, which avoids duplicate preview-looking entries in the gallery.
 */

async function scanDirectoryRecursive(
  dirPath: string,
  basePath: string,
  entries: ImageEntryData[]
): Promise<void> {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const relativeDirPath = path.relative(basePath, dirPath);
  const parentPath = relativeDirPath === '.' ? '' : relativeDirPath.replace(/\\/g, '/');
  const depth = relativeDirPath === '.' ? 0 : relativeDirPath.split(path.sep).length;

  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    const relativeItemPath = path.relative(basePath, itemPath).replace(/\\/g, '/');

    if (item.isDirectory()) {
      await scanDirectoryRecursive(itemPath, basePath, entries);

      if (item.name.toLowerCase() === 'preview') {
        const parentItems = await fs.readdir(dirPath).catch(() => [] as string[]);
        if (parentItems.some((file) => isPreviewFileName(file))) {
          continue;
        }
      }

      const subItems = await fs.readdir(itemPath);
      const previewFile = findPreviewFile(subItems);
      const mainFile = subItems.find((file) => {
        return isContentFile(file) && !file.toLowerCase().startsWith('preview.');
      });
      const displayFile = previewFile || mainFile || null;
      const type = displayFile
        ? (path.extname(displayFile).toLowerCase().slice(1) as ContentType)
        : ('png' as ContentType);
      const displayFilePath = displayFile ? path.join(itemPath, displayFile) : null;
      const mainDimensions = displayFilePath ? await getImageDimensions(displayFilePath) : {};
      const previewDimensions = previewFile
        ? await getImageDimensions(path.join(itemPath, previewFile))
        : {};

      entries.push({
        id: relativeItemPath.replace(/\//g, '--'),
        name: item.name,
        file: displayFile ? `${relativeItemPath}/${displayFile}` : `${relativeItemPath}/.folder`,
        preview: previewFile ? `${relativeItemPath}/${previewFile}` : null,
        type,
        isFolder: true,
        width: previewDimensions.width ?? mainDimensions.width,
        height: previewDimensions.height ?? mainDimensions.height,
        previewWidth: previewDimensions.width,
        previewHeight: previewDimensions.height,
        relativePath: relativeItemPath,
        parentPath,
        depth,
      });
      continue;
    }

    if (!item.isFile()) {
      continue;
    }

    if (isPreviewFileName(item.name) || !isContentFile(item.name)) {
      continue;
    }

    const dimensions = await getImageDimensions(itemPath);

    entries.push({
      id: relativeItemPath.replace(/\//g, '--'),
      name: item.name,
      file: relativeItemPath,
      preview: null,
      type: path.extname(item.name).toLowerCase().slice(1) as ContentType,
      isFolder: false,
      width: dimensions.width,
      height: dimensions.height,
      relativePath: relativeItemPath,
      parentPath,
      depth,
    });
  }
}

export function loadContentInDirectory(basePath: string) {
  return async () => {
    const entries: ImageEntryData[] = [];

    await scanDirectoryRecursive(basePath, basePath, entries);

    return entries;
  };
}
