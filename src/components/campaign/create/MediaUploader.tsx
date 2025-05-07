
import { useState, useRef, ChangeEvent } from 'react';
import { CloudUpload, FileText, XCircle, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaUploaderProps {
  onChange: (files: File[]) => void;
  value: File[];
  maxFiles?: number;
  acceptedTypes?: string;
}

const MediaUploader = ({
  onChange,
  value = [],
  maxFiles = 5,
  acceptedTypes = 'image/*,video/*',
}: MediaUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...value, ...newFiles].slice(0, maxFiles);
    onChange(combinedFiles);
    
    // Reset the input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.length) {
      const newFiles = Array.from(e.dataTransfer.files);
      const combinedFiles = [...value, ...newFiles].slice(0, maxFiles);
      onChange(combinedFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const renderPreview = (file: File, index: number) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    return (
      <div key={`${file.name}-${index}`} className="relative group">
        <div className="border rounded-md p-2 flex items-center gap-2 bg-muted/20">
          {isImage ? (
            <div className="w-12 h-12 bg-muted rounded-sm overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : isVideo ? (
            <video
              className="w-12 h-12 object-cover bg-muted rounded-sm"
              src={URL.createObjectURL(file)}
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-sm">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeFile(index)}
          >
            <XCircle className="w-5 h-5 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
          id="file-upload"
        />
        
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <CloudUpload className="w-6 h-6 text-primary" />
          </div>
          <label
            htmlFor="file-upload"
            className="text-sm font-medium cursor-pointer text-primary hover:underline"
          >
            Click to upload
          </label>
          <p className="text-xs text-muted-foreground">
            or drag and drop files here
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {value.length} / {maxFiles} files • {acceptedTypes.replace(/\*/g, 'all')}
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {value.map((file, index) => renderPreview(file, index))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
