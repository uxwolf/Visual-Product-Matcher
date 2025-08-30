import React, { useState, useCallback } from 'react';
import { Upload, Link, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { validateImageFile, validateImageUrl, fileToDataUrl } from '@/utils/imageUtils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  isLoading?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUpload, 
  isLoading = false 
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = useCallback(async (imageUrl: string) => {
    setUploadedImage(imageUrl);
    onImageUpload(imageUrl);
  }, [onImageUpload]);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      validateImageFile(file);
      const dataUrl = await fileToDataUrl(file);
      await handleImageUpload(dataUrl);
      
      toast({
        title: "Image uploaded successfully",
        description: "Processing image for similarity search...",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    }
  }, [handleImageUpload, toast]);

  const handleUrlUpload = useCallback(async () => {
    if (!urlInput.trim()) return;

    try {
      await validateImageUrl(urlInput);
      await handleImageUpload(urlInput);
      setUrlInput('');
      
      toast({
        title: "Image loaded successfully",
        description: "Processing image for similarity search...",
      });
    } catch (error) {
      toast({
        title: "Failed to load image",
        description: error instanceof Error ? error.message : "Invalid image URL",
        variant: "destructive",
      });
    }
  }, [urlInput, handleImageUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please drop an image file (JPEG, PNG, or WebP)",
        variant: "destructive",
      });
    }
  }, [handleFileUpload, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearImage = useCallback(() => {
    setUploadedImage(null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className={`relative overflow-hidden transition-all duration-300 ${
        isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border'
      } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
        <div
          className={`relative p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-gradient-primary/10' 
              : 'border-muted hover:border-primary/50'
          } ${uploadedImage ? 'bg-muted/20' : 'bg-gradient-surface'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {uploadedImage ? (
            <div className="relative">
              <div className="relative group">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg glow-soft transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <Button
                  onClick={clearImage}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Image uploaded successfully! {isLoading && 'Analyzing...'}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                <ImageIcon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop an image here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  id="file-upload"
                  disabled={isLoading}
                />
                <label htmlFor="file-upload">
                  <Button 
                    variant="default" 
                    className="bg-gradient-primary hover:shadow-lg transition-all duration-300" 
                    asChild
                    disabled={isLoading}
                  >
                    <span className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* URL Input */}
      <Card className="glass">
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Link className="w-5 h-5 mr-2" />
            Or paste an image URL
          </h4>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUrlUpload()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleUrlUpload}
              disabled={!urlInput.trim() || isLoading}
              className="bg-gradient-primary hover:shadow-lg transition-all duration-300"
            >
              Load
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};