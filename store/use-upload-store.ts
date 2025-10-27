"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface UploadState {
  selectedFile: File | null;
  fileMetadata: FileMetadata | null;
  setFile: (file: File | null) => void;
  clearFile: () => void;
}

export const useUploadStore = create<UploadState>()(
  persist(
    (set) => ({
      selectedFile: null,
      fileMetadata: null,
      setFile: (file) => {
        if (!file) {
          set({ selectedFile: null, fileMetadata: null });
          return;
        }

        const metadata: FileMetadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        };

        set({
          selectedFile: file,
          fileMetadata: metadata,
        });
      },
      clearFile: () => {
        set({ selectedFile: null, fileMetadata: null });
      },
    }),
    {
      name: "orbit-x-upload-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ fileMetadata: state.fileMetadata }),
    }
  )
);
