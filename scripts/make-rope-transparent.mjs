import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public", "images", "rope-bg.png");
const pngOutput = path.join(root, "public", "images", "rope-transparent.png");
const webpOutput = path.join(root, "public", "images", "rope-transparent.webp");
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);

for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
  const source = pixel * info.channels;
  const target = pixel * 4;
  const red = data[source];
  const green = data[source + 1];
  const blue = data[source + 2];
  const alpha = Math.max(0, Math.min(1, (Math.max(red, green, blue) - 8) / 52));
  rgba[target] = red;
  rgba[target + 1] = green;
  rgba[target + 2] = blue;
  rgba[target + 3] = Math.round(alpha * 255);
}

const transparent = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } });
await transparent.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(pngOutput);

for (const quality of [86, 80, 74, 68, 62]) {
  const webp = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality, alphaQuality: 100, effort: 6 })
    .toBuffer();
  if (webp.length < 250 * 1024) {
    await sharp(webp).toFile(webpOutput);
    console.log(`Created transparent PNG and ${Math.round(webp.length / 1024)} KB WebP at quality ${quality}.`);
    process.exit(0);
  }
}

throw new Error("Could not compress the transparent rope below 250 KB; lower the WebP quality or resize the source.");
