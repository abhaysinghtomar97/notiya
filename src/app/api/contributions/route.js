
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import ConnectDB from "@/dbConfig/dbConfig";
import { createUploadUrl } from "@/lib/cloudflare/r2";
import {
  Contribution,
  MAX_PDF_SIZE,
  contributionSchema,
} from "@/models/Contributions";

export const runtime = "nodejs";

async function verifyTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("Turnstile configuration error: secret key is missing");
    return { success: false, reason: "configuration_error" };
  }

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048
  ) {
    return { success: false, reason: "missing_or_invalid_token" };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret,
          response: token,
          idempotency_key: randomUUID(),
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Turnstile Siteverify HTTP error:", response.status);
      return { success: false, reason: "siteverify_http_error" };
    }

    const result = await response.json();

    if (result.success !== true) {
      // Never log the secret or the complete Turnstile token.
      console.error("Turnstile verification rejected:", {
        errorCodes: result["error-codes"],
        hostname: result.hostname,
      });

      return { success: false, reason: "token_rejected" };
    }

    // Optional: verify the expected hostname as an additional check.
    const allowedHostnames = [
      "notiya.in",
      "www.notiya.in",
      "localhost",
    ];

    if (!allowedHostnames.includes(result.hostname)) {
      console.error("Turnstile hostname mismatch:", result.hostname);
      return { success: false, reason: "hostname_mismatch" };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return { success: false, reason: "verification_request_failed" };
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { turnstileToken } = body;

    const verification = await verifyTurnstile(turnstileToken);

    if (!verification.success) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 403 }
      );
    }

    // Do not store the Turnstile token as contribution data.
    const { turnstileToken: _token, ...submission } = body;

    const parsed = contributionSchema.safeParse(submission);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid submission",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    if (parsed.data.fileSize > MAX_PDF_SIZE) {
      return NextResponse.json(
        { error: "PDF exceeds the maximum allowed size" },
        { status: 413 }
      );
    }

    await ConnectDB();

    const id = randomUUID();
    const objectKey =
      `contributions/${new Date().getUTCFullYear()}/${id}.pdf`;

    const contribution = await Contribution.create({
      ...parsed.data,
      objectKey,
      status: "uploading",
    });

    const uploadUrl = await createUploadUrl(
      objectKey,
      "application/pdf"
    );

    return NextResponse.json(
      {
        contributionId: String(contribution._id),
        uploadUrl,
        uploadHeaders: {
          "Content-Type": "application/pdf",
        },
        expiresInSeconds: 300,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contribution initialization failed:", error);

    return NextResponse.json(
      { error: "Unable to start contribution upload" },
      { status: 500 }
    );
  }
}
