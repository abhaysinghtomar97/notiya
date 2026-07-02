"use client";

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PdfPreview({
  driveId,
  pdfUrl,
  buttonText = "Preview",
}) {
  const src = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : pdfUrl;

  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-muted">
          <Eye size={18} />
          {buttonText}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <iframe
          src={src}
          className="w-full h-full rounded-lg"
          allow="autoplay"
        />
      </DialogContent>
    </Dialog>
  );
}