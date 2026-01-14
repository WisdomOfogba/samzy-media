import { CloudinaryResponse } from '../types';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../constants';

export const cloudinaryService = {
  uploadFile: async (
    file: File, 
    folder: string
  ): Promise<CloudinaryResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);

    // Determine resource type based on file type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data: CloudinaryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw error;
    }
  }
};
