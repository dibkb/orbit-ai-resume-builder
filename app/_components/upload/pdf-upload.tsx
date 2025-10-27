"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileIcon, X } from "lucide-react";
import { useUploadStore } from "@/store/use-upload-store";

interface PdfUploadProps {
  className?: string;
}

const PdfUpload = ({ className }: PdfUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { selectedFile, fileMetadata, setFile, clearFile } = useUploadStore();

  useEffect(() => {
    if (fileMetadata && !selectedFile) {
      console.log("File metadata available:", fileMetadata);
    }
  }, [fileMetadata, selectedFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    }
  };

  const handleRemove = () => {
    clearFile();
  };

  if (selectedFile) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 p-6 border-2 border-blue-500 rounded-lg bg-blue-50",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <FileIcon className="h-8 w-8 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-red-100 transition-colors"
        >
          <X className="h-5 w-5 text-red-600" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-all",
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="pdf-upload"
        className="flex flex-col items-center justify-center cursor-pointer p-12 min-h-[200px]"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              Drag and drop your PDF here
            </p>
            <p className="text-sm text-gray-500 mt-2">or click to browse</p>
          </div>
        </div>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};

export default PdfUpload;
