"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Document from "../svg/document";
import { useUploadStore } from "@/store/use-upload-store";
import { Button } from "@/components/ui/button";
import { sourceCodePro } from "@/lib/fonts";
import { useRouter } from "next/navigation";

interface PdfUploadProps {
  className?: string;
}

const PdfUpload = ({ className }: PdfUploadProps) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { selectedFile, fileMetadata, setFile, clearFile } = useUploadStore();

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

  const onClickDashboardHandler = () => {
    router.push("/dashboard");
  };

  if (selectedFile) {
    return (
      <section className="flex flex-col gap-4">
        <div
          className={cn(
            "flex items-center justify-between gap-4 p-6 border border-dashed border-neutral-200 rounded-lg bg-neutral-50",
            className
          )}
        >
          <div className="flex items-center gap-3">
            <Document />
            <div>
              <p
                className={cn(
                  "font-medium text-gray-800",
                  sourceCodePro.className
                )}
              >
                {fileMetadata?.name}
              </p>
              <p className="text-sm text-neutral-500">
                {(fileMetadata?.size ? fileMetadata.size / 1024 : 0).toFixed(2)}{" "}
                KB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-zinc-200 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-600 hover:text-zinc-800 transition-colors" />
          </button>
        </div>
        <Button className="w-full py-6" onClick={onClickDashboardHandler}>
          Go to Dashboard
        </Button>
      </section>
    );
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-all",
        isDragging
          ? "border-neutral-200 bg-neutral-50"
          : "border-gray-300 hover:border-neutral-200 hover:bg-neutral-50",
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
          <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
            <Upload className="h-8 w-8 text-neutral-600" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">
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
