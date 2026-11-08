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
      <div className="border-2 border-dashed border-purple-500/25 bg-purple-950/10 hover:bg-purple-950/20 p-8 text-center rounded-2xl transition-colors">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-4 text-xs font-medium text-purple-300">
            <LoadingSpinner />
            <span className="mt-2">Uploading asset to Cloudinary...</span>
          </div>
        ) : currentUrl ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">Current Uploaded Asset:</p>
            <p className="text-xs text-zinc-400 break-all bg-black/40 p-3 border border-white/10 rounded-xl">
              {currentUrl}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors rounded-full"
            >
              Replace Asset
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center mx-auto text-purple-400">
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-200">
                Click to select or drag and drop
              </p>
              <p className="text-xs text-zinc-400">
                High definition video (mp4/webm) or image (png/jpg) up to 50MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all rounded-full shadow-lg shadow-purple-950/40"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

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
