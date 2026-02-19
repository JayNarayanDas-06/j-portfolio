import React, { useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (url: string) => void;
  className?: string;
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = '',
  ...rest
}) => {
  const { isEditMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(src);

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} {...rest} />;
  }

  return (
    <div className="relative group/img inline-block">
      <img src={src} alt={alt} className={className} {...rest} />
      <button
        onClick={() => {
          setUrl(src);
          setEditing(true);
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer rounded-[inherit]"
      >
        <Camera className="w-8 h-8 text-white" />
      </button>
      {editing && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 bg-card border border-border rounded-xl shadow-2xl z-[100] w-80"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs font-medium text-muted-foreground mb-2">Image URL</p>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste image URL..."
            className="text-sm"
          />
          <div className="flex gap-2 mt-3 justify-end">
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onChange(url);
                setEditing(false);
              }}
            >
              <Check className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
