"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { LoadingSpinner } from "./loading-spinner";

interface CloudinaryUploadProps {
  folder: "Animations" | "Birthday Designs" | "Graphics Design" | "Logo Montage" | "Motion Graphics";
  accept: string;
  onUpload: (url: string) => void;
  currentUrl?: string;
  disabled?: boolean;
}

export function CloudinaryUpload({
  folder,
  accept,
  onUpload,
  currentUrl,
  disabled,
}: CloudinaryUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", `smp/${folder}`);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.url);
    } catch {
      setError("Failed to upload file. Verify connection and size limit (50MB).");
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-center rounded-none">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-4 text-xs font-mono text-zinc-400">
            <LoadingSpinner />
            <span className="mt-2">Uploading asset...</span>
          </div>
        ) : currentUrl ? (
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current Uploaded Asset:</p>
            <p className="text-[11px] font-mono text-zinc-500 break-all bg-zinc-950 p-2 border border-zinc-800 rounded-none">
              {currentUrl}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors rounded-none"
            >
              Replace Asset
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="w-6 h-6 text-zinc-600 mx-auto" />
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Click to select or drag and drop
              </p>
              <p className="text-[11px] font-mono text-zinc-600">
                High definition video (mp4/webm) or image (png/jpg) up to 50MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors rounded-none font-semibold border border-white"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs font-mono text-red-400">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || loading}
      />
    </div>
  );
}
