import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, FileImage, FileVideo, CheckCircle2 } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinaryService';
import { Button } from './ui/Button';

interface FileUploadProps {
  label: string;
  folder: string;
  accept: 'image' | 'video';
  currentUrl?: string;
  onUploadComplete: (url: string, resourceType: string) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  folder,
  accept,
  currentUrl,
  onUploadComplete,
  error: parentError,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = accept === 'image' 
    ? 'image/jpeg,image/png,image/webp,image/gif' 
    : 'video/mp4,video/webm';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setIsUploading(true);

    // Basic Validation
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File size too large (Max 50MB)');
      setIsUploading(false);
      return;
    }

    try {
      // Create local preview immediately for better UX (images only)
      if (file.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }

      const response = await cloudinaryService.uploadFile(file, folder);
      
      setPreview(response.secure_url);
      onUploadComplete(response.secure_url, response.resource_type);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Upload failed');
      // Revert preview if upload failed
      if (!currentUrl) setPreview(null);
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading same file if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPreview(null);
    onUploadComplete('', ''); // Clear in parent form
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none text-gray-200">
        {label}
      </label>
      
      <div 
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-colors
          ${error || parentError ? 'border-red-500 bg-red-500/5' : 'border-border hover:border-primary/50 hover:bg-white/5'}
          ${preview ? 'border-solid border-primary/20' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-8 text-primary">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <span className="text-sm font-medium">Uploading to Cloudinary...</span>
          </div>
        ) : preview ? (
          <div className="relative group">
            {accept === 'image' ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md" 
              />
            ) : (
              <video 
                src={preview} 
                className="w-full h-48 object-cover rounded-md bg-black"
                controls
              />
            )}
            
            <div className="absolute top-2 right-2 flex gap-2">
              <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="h-3 w-3" />
                Uploaded
              </span>
            </div>
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md pointer-events-none">
               <div className="flex gap-2 pointer-events-auto">
                 <Button 
                   type="button" 
                   variant="secondary" 
                   size="sm"
                   onClick={() => fileInputRef.current?.click()}
                 >
                   Replace
                 </Button>
                 <Button 
                   type="button" 
                   variant="destructive" 
                   size="sm"
                   onClick={handleClear}
                 >
                   Remove
                 </Button>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            {accept === 'image' ? <FileImage className="h-8 w-8 mb-2" /> : <FileVideo className="h-8 w-8 mb-2" />}
            <span className="text-sm font-medium text-white">Click or drag to upload {accept}</span>
            <span className="text-xs mt-1">
              {accept === 'image' ? 'JPG, PNG, WebP' : 'MP4, WebM'} (Max 50MB)
            </span>
          </div>
        )}
      </div>
      {(error || parentError) && (
        <p className="text-xs text-red-500">{error || parentError}</p>
      )}
    </div>
  );
};
