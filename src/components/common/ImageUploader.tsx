"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
}

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  }, [files, onChange]);

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  return (
    <div className="w-full">
      {/* Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition 
          ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-3xl text-blue-500 mb-2" />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the files here...</p>
        ) : (
          <p className="text-gray-500">
            Drag & drop images here, or <span className="text-blue-600 font-medium">click to browse</span>
          </p>
        )}
      </div>

      {/* Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {files.map((file, index) => (
            <div key={index} className="relative group border rounded-md overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
