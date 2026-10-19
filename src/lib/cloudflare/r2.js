import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
    HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	region: "auto", // Required by AWS SDK, not used by R2
	// Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
	endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
	credentials: {
		// Provide your R2 Access Key ID and Secret Access Key
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});

// generates a signed URL for uploading a file to R2
export async function createUploadUrl(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET,
    Key: key,
    ContentType: contentType,
    Metadata: { service: "notiya-contributions" },
  });
  return getSignedUrl(s3, command, { expiresIn: 300 });
}

// check if an object exists in the R2 bucket. 
export async function headObject(key) {
  return s3.send(new HeadObjectCommand({ Bucket: process.env.CLOUDFLARE_R2_BUCKET, Key: key }));
}

// reads the first 8 bytes of a PDF file stored in an R2 bucket.
export async function readPdfHeader(key) {
  const out = await s3.send(new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET, 
    Key: key, 
    Range: "bytes=0-7",
  }));
  const bytes = await out.Body?.transformToByteArray();
  return bytes ? Buffer.from(bytes) : Buffer.alloc(0);
}

// generates a signed URL for downloading a file from R2
export async function createDownloadUrl(key) {
  return getSignedUrl(s3, new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET, Key: key, 
    ResponseContentType: "application/pdf",
    ResponseContentDisposition: "inline",
  }), { expiresIn: 600 });
}

//deletes an object from an R2 bucket.
export async function deleteObject(key) {
  return s3.send(new DeleteObjectCommand({ Bucket: process.env.CLOUDFLARE_R2_BUCKET, Key: key }));
}










