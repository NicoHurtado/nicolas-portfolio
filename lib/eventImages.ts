import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "events");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

export type EventImage = {
  src: string;
  /**
   * True when the file carries a non-default EXIF orientation. Next's image
   * optimizer drops that tag without baking the rotation into the pixels, so
   * the photo would render sideways. Serving the original file instead lets
   * the browser apply the orientation itself — the photo looks exactly as it
   * does in Finder, and the file on disk is never modified.
   */
  raw: boolean;
};

/** Reads the EXIF orientation tag, or 1 when there is none. */
function exifOrientation(file: string): number {
  let buf: Buffer;
  try {
    const fd = fs.openSync(file, "r");
    buf = Buffer.alloc(128 * 1024);
    const read = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, read);
  } catch {
    return 1;
  }

  const start = buf.indexOf("Exif\0\0", 0, "binary");
  if (start < 0) return 1;

  const tiff = start + 6;
  const big = buf.toString("binary", tiff, tiff + 2) === "MM";
  const u16 = (o: number) => (big ? buf.readUInt16BE(o) : buf.readUInt16LE(o));
  const u32 = (o: number) => (big ? buf.readUInt32BE(o) : buf.readUInt32LE(o));

  try {
    const ifd = tiff + u32(tiff + 4);
    const count = u16(ifd);
    for (let i = 0; i < count; i++) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    return 1;
  }
  return 1;
}

/**
 * Every image in `public/events` whose filename starts with the event slug,
 * sorted so `slug-1`, `slug-2`… come in order.
 *
 * This is why adding photos needs no code: drop `bancolab2.jpeg` next to
 * `bancolab1.jpeg` and the collage picks it up on the next build.
 */
export function eventImages(slug: string): EventImage[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => IMAGE_EXT.test(f) && f.toLowerCase().startsWith(slug))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((f) => ({
      src: `/events/${f}`,
      raw: exifOrientation(path.join(DIR, f)) !== 1,
    }));
}
