import fs from "node:fs";
import path from "node:path";
import { getWriteClient } from "../src/sanity/writeClient";

async function main() {
  const [filePath, altText] = process.argv.slice(2);
  if (!filePath || !altText) {
    console.error(
      "Usage: npx tsx scripts/upload-sanity-image.ts <file-path> <alt-text>"
    );
    process.exit(1);
  }

  const client = getWriteClient();
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(filePath),
  });

  const imageField = {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: altText,
  };

  console.log(JSON.stringify(imageField));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
