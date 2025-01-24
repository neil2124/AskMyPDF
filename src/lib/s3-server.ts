import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import os from "os";
import { Readable } from "stream";

export async function downloadFromS3(file_key: string): Promise<string> {
  try {
    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    console.log("Attempting to download with params:", params);

    const command = new GetObjectCommand(params);
    const obj = await s3Client.send(command);

    // ✅ Use cross-platform temp directory
    const tmpDir = path.join(os.tmpdir(), "myapp");
    const file_name = path.join(tmpDir, `elliott_${Date.now()}.pdf`);

    // ✅ Ensure the temp directory exists
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // ✅ Handle AWS SDK ReadableStream properly
    if (obj.Body instanceof Readable) {
      const writeStream = fs.createWriteStream(file_name);
      obj.Body.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      console.log(`File downloaded successfully to: ${file_name}`);
      return file_name;
    } else {
      throw new Error("Response body is not a readable stream.");
    }
  } catch (error) {
    console.error("Error downloading from S3:", error);
    throw error;
  }
}
