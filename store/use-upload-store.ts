"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  data: string;
}

interface UploadState {
  selectedFile: File | null;
  fileMetadata: FileMetadata | null;
  setFile: (file: File | null) => void;
  clearFile: () => void;
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const convertBase64ToFile = (
  base64: string,
  name: string,
  type: string,
  lastModified: number
): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || type;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], name, { type: mime, lastModified });
  return file;
};

export const useUploadStore = create<UploadState>()(
  persist(
    (set) => ({
      selectedFile: null,
      fileMetadata: null,
      setFile: async (file) => {
        if (!file) {
          set({ selectedFile: null, fileMetadata: null });
          return;
        }
        try {
          const base64 = await convertFileToBase64(file);
          const metadata: FileMetadata = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            data: base64,
          };

          set({
            selectedFile: file,
            fileMetadata: metadata,
          });
        } catch (error) {
          console.error("Error converting file to base64:", error);
        }
      },
      clearFile: () => {
        set({ selectedFile: null, fileMetadata: null });
      },
    }),
    {
      name: "orbit-x-upload-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        fileMetadata: state.fileMetadata,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.fileMetadata) {
          const file = convertBase64ToFile(
            state.fileMetadata.data,
            state.fileMetadata.name,
            state.fileMetadata.type,
            state.fileMetadata.lastModified
          );
          state.selectedFile = file;
        }
      },
    }
  )
);
