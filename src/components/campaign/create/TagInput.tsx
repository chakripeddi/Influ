
import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

const TagInput = ({
  value = [],
  onChange,
  placeholder = 'Add tag...',
  maxTags = 10,
  className,
}: TagInputProps) => {
  const [input, setInput] = useState('');

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    
    if (value.includes(trimmedTag)) {
      setInput('');
      return;
    }
    
    if (value.length >= maxTags) return;
    
    onChange([...value, trimmedTag]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(input);
    }
    
    if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={cn("flex flex-wrap gap-2 p-2 border rounded-md bg-background", className)}>
      {value.map((tag, index) => (
        <Badge key={`${tag}-${index}`} variant="secondary" className="py-1 px-2 flex items-center gap-1">
          {tag}
          <X
            className="h-3 w-3 cursor-pointer hover:text-destructive"
            onClick={() => removeTag(tag)}
          />
        </Badge>
      ))}
      
      {value.length < maxTags && (
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && handleAddTag(input)}
          placeholder={value.length ? placeholder : `${placeholder} (press Enter or comma to add)`}
          className="flex-1 min-w-[120px] border-0 p-0 h-7 focus-visible:ring-0"
        />
      )}
    </div>
  );
};

export default TagInput;
