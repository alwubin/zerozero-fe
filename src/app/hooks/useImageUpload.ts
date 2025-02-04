'use client';
import { useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '@/app/api/interceptor';

export const useImageUpload = (prefix: string, maxImages: number = 3) => {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getPresignedUrl = async (file: File): Promise<{ presignedUrl: string; objectUrl: string } | null> => {
    try {
      const { data } = await axiosInstance.get('/image/presigned-url', {
        params: { prefix, fileName: file.name },
      });

      return {
        presignedUrl: data.presignedUrl,
        objectUrl: data.objectUrl,
      };
    } catch (error) {
      console.error('Presigned URL 요청 실패:', error);
      return null;
    }
  };

  const uploadToS3 = async (file: File, presignedUrl: string): Promise<boolean> => {
    try {
      const response = await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type }, 
      });

      return response.status === 200; 
    } catch (error) {
      console.error('S3 업로드 실패:', error);
      return false;
    }
  };

  const addImage = async (file: File) => {
    if (images.length >= maxImages) return;

    setIsUploading(true);
    const presignedData = await getPresignedUrl(file);

    if (presignedData) {
      const { presignedUrl, objectUrl } = presignedData;
      const isUploaded = await uploadToS3(file, presignedUrl);

      if (isUploaded) {
        setImages((prev) => [...prev, objectUrl]); 
      }
    }

    setIsUploading(false);
  };

  return {
    images,
    addImage,
    isFull: images.length >= maxImages,
    isUploading,
  };
};
