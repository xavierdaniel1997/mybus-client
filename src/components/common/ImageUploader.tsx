"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  busImages?: string[];
  onRemoveExisting?: (remaining: string[]) => void;
}

export default function ImageUploader({
  onChange,
  busImages = [],
  onRemoveExisting,
}: ImageUploaderProps) {
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  // keep existing images synced
  useEffect(() => {
    setExistingImages(busImages);
  }, [busImages]);

  // generate preview URLs whenever new files change
  useEffect(() => {
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    setObjectUrls(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updated = [...newFiles, ...acceptedFiles];
      setNewFiles(updated);
      onChange?.(updated);
    },
    [newFiles, onChange]
  );

  const removeNewFile = (index: number) => {
    const updated = newFiles.filter((_, i) => i !== index);
    setNewFiles(updated);
    onChange?.(updated);
  };

  const removeExistingImage = (index: number) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
    onRemoveExisting?.(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-3xl text-blue-500 mb-2" />
        <p className="text-gray-500">
          Drag & drop images here, or <span className="text-blue-600 font-medium">click to browse</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {existingImages.map((url, idx) => (
          <div key={`existing-${idx}`} className="relative group border rounded-md overflow-hidden">
            <Image 
            unoptimized
            width={0}
              height={0} src={url} alt={`existing-${idx}`} className="object-cover  w-200 h-40" />
            <button
              type="button"
              onClick={() => removeExistingImage(idx)}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}

        {objectUrls.map((url, index) => (
          <div key={`new-${index}`} className="relative group border rounded-md overflow-hidden">
            <Image
              width={0}
              height={0} src={url} alt={`preview-${index}`} className="object-cover w-200 h-40" />
            <button
              type="button"
              onClick={() => removeNewFile(index)}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
