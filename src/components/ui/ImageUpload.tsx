
'use client';

import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from './button';
import Image from 'next/image';

interface ImageUploadProps {
  bucket: string;
  onUpload: (url: string) => void;
  initialUrl?: string | null;
  onRemove?: () => void;
}

export default function ImageUpload({ bucket, onUpload, initialUrl, onRemove }: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl || null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = fileName;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      onUpload(publicUrl);
      toast({ title: 'Image uploaded successfully' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error uploading image',
        description: error.message,
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (onRemove) {
        onRemove();
    } else {
        onUpload('');
    }
  };

  return (
    <div className="space-y-2">
      {imageUrl ? (
        <div className="relative group w-full max-w-sm">
          <Image
            src={imageUrl}
            alt="Uploaded image"
            width={400}
            height={200}
            className="rounded-lg object-cover border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={`image-upload-${bucket}`}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF</p>
                </>
              )}
            </div>
            <input id={`image-upload-${bucket}`} type="file" className="hidden" onChange={handleFileChange} disabled={uploading} accept="image/*" />
          </label>
        </div>
      )}
    </div>
  );
}
