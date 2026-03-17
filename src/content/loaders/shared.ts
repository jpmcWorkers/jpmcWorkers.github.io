import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';

/**
 * Logical flow:
 * 1. Define the set of file extensions the custom content loaders are allowed to emit.
 * 2. Define the shared entry shapes so the loaders and the collection schemas stay aligned.
 * 3. Centralize preview-file detection so both loaders use the same skip and fallback rules.
 * 4. Read image dimensions only for supported raster formats; non-image assets return no dimensions.
 * 5. Keep these helpers behavior-only so config.ts can compose loaders without carrying filesystem logic.
 *
 * Downstream pages depend on these loaders returning stable field names and extension values, so this
 * module is the single source of truth for shared media rules used by both the images and booklets collections.
 */

export const contentList = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf', 'zip', 'mp4'] as const;

export type ContentType = (typeof contentList)[number];

export interface ImageEntryData {
  id: string;
  name: string;
  file: string;
  preview: string | null;
  type: ContentType;
  isFolder: boolean;
  width?: number;
  height?: number;
  previewWidth?: number;
  previewHeight?: number;
  relativePath: string;
  parentPath: string;
  depth: number;
}

export interface BookletEntryData {
  id: string;
  name: string;
  file: string;
  preview: string | null;
  type: ContentType;
  width?: number;
  height?: number;
  previewWidth?: number;
  previewHeight?: number;
}

const previewFileNames = ['preview.png', 'preview.jpeg', 'preview.jpg'] as const;
const supportedImageTypes = ['png', 'jpg', 'jpeg', 'webp', 'gif'] as const;

export function isPreviewFileName(fileName: string): boolean {
  return previewFileNames.includes(fileName.toLowerCase() as (typeof previewFileNames)[number]);
}

export function findPreviewFile(files: string[]): string | undefined {
  return files.find((file) => isPreviewFileName(file));
}

export function isContentFile(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase().slice(1);
  return contentList.includes(ext as ContentType);
}

export async function getImageDimensions(
  filePath: string
): Promise<{ width?: number; height?: number }> {
  try {
    const ext = path.extname(filePath).toLowerCase().slice(1);

    if (supportedImageTypes.includes(ext as (typeof supportedImageTypes)[number])) {
      const buffer = await fs.readFile(filePath);
      const dimensions = sizeOf(buffer);
      return {
        width: dimensions.width,
        height: dimensions.height,
      };
    }
  } catch (error) {
    console.warn(`Could not read dimensions for ${filePath}:`, error);
  }

  return {};
}
