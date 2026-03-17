import fs from 'fs/promises';
import path from 'path';
import {
  type BookletEntryData,
  type ContentType,
  findPreviewFile,
  getImageDimensions,
  isContentFile,
} from './shared';

/**
 * Logical flow:
 * 1. Read only the first level of the booklets directory because each child folder is treated as one booklet tile.
 * 2. Ignore non-directory items so only booklet folders can become collection entries.
 * 3. Inside each booklet folder, locate an optional preview image and the first non-preview content file.
 * 4. Skip folders with no main content file, because the booklet page only knows how to render downloadable assets.
 * 5. Prefer preview dimensions for card display when present, while still storing the main file path and type.
 * 6. Preserve the current slash-to-- ID rule and field names so the existing booklet page can keep mapping entries
 *    directly into cards and download links with no downstream code changes.
 */

export function loadBookletsInDirectory(basePath: string) {
  return async () => {
    const items = await fs.readdir(basePath, { withFileTypes: true });
    const entries: BookletEntryData[] = [];

    for (const item of items) {
      if (!item.isDirectory()) {
        continue;
      }

      const itemPath = path.join(basePath, item.name);
      const subItems = await fs.readdir(itemPath);
      const previewFile = findPreviewFile(subItems);
      const mainFile = subItems.find((file) => {
        return isContentFile(file) && !file.toLowerCase().startsWith('preview.');
      });

      if (!mainFile) {
        continue;
      }

      const mainFilePath = path.join(itemPath, mainFile);
      const previewPath = previewFile ? path.join(itemPath, previewFile) : null;
      const mainDimensions = await getImageDimensions(mainFilePath);
      const previewDimensions = previewPath ? await getImageDimensions(previewPath) : {};

      entries.push({
        id: item.name.replace(/\//g, '--'),
        name: item.name,
        file: `${item.name}/${mainFile}`,
        preview: previewFile ? `${item.name}/${previewFile}` : null,
        type: path.extname(mainFile).toLowerCase().slice(1) as ContentType,
        width: previewDimensions.width ?? mainDimensions.width,
        height: previewDimensions.height ?? mainDimensions.height,
        previewWidth: previewDimensions.width,
        previewHeight: previewDimensions.height,
      });
    }

    return entries;
  };
}
