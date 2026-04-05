"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface FileUploadFieldProps {
  label: string;
  description?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string;
  onChange: (files: File[]) => void;
  value?: File[];
  error?: string;
}

export function FileUploadField({
  label,
  description,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = "image/*,.pdf,.doc,.docx",
  onChange,
  value = [],
  error,
}: FileUploadFieldProps) {
  const t = useTranslations("common");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Validate file size
    const validFiles = files.filter((file) => file.size <= maxSize);

    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onChange(newFiles);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onChange(newFiles);
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50",
          error && "border-destructive hover:border-destructive/50",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-primary font-medium">{t("fileUpload.browse")}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {t("fileUpload.maxFiles", { count: maxFiles })} ·{" "}
          {t("fileUpload.maxSize", { size: maxSize / (1024 * 1024) })}MB
        </p>
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {t("fileUpload.uploadedFiles", { count: uploadedFiles.length })}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                {isImage(file) ? (
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                    <FileIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -end-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                  type="button"
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="mt-1 text-xs truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
