
import { useState, useEffect } from 'react';
import {
  Bold, Italic, List, ListOrdered, Link, Heading1, Heading2
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  minRows = 5,
  maxRows = 10
}: RichTextEditorProps) => {
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  
  useEffect(() => {
    if (linkDialogOpen) {
      const selectedText = value.substring(selectionStart, selectionEnd);
      setLinkText(selectedText);
    }
  }, [linkDialogOpen, selectionStart, selectionEnd, value]);

  const handleSelectionChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const insertFormatting = (prefix: string, suffix: string) => {
    const newText =
      value.substring(0, selectionStart) +
      prefix +
      value.substring(selectionStart, selectionEnd) +
      suffix +
      value.substring(selectionEnd);
    
    onChange(newText);
  };

  const handleBold = () => insertFormatting('**', '**');
  const handleItalic = () => insertFormatting('_', '_');
  const handleH1 = () => insertFormatting('# ', '\n');
  const handleH2 = () => insertFormatting('## ', '\n');
  
  const handleList = () => {
    const selectedText = value.substring(selectionStart, selectionEnd);
    const lines = selectedText.split('\n');
    const formattedLines = lines.map(line => (line ? `- ${line}` : ''));
    const newText =
      value.substring(0, selectionStart) +
      formattedLines.join('\n') +
      value.substring(selectionEnd);
    
    onChange(newText);
  };

  const handleOrderedList = () => {
    const selectedText = value.substring(selectionStart, selectionEnd);
    const lines = selectedText.split('\n');
    const formattedLines = lines.map((line, index) =>
      line ? `${index + 1}. ${line}` : ''
    );
    const newText =
      value.substring(0, selectionStart) +
      formattedLines.join('\n') +
      value.substring(selectionEnd);
    
    onChange(newText);
  };

  const handleLink = () => {
    if (linkUrl) {
      const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`;
      const newText =
        value.substring(0, selectionStart) +
        linkMarkdown +
        value.substring(selectionEnd);
      
      onChange(newText);
      setLinkUrl('');
      setLinkText('');
      setLinkDialogOpen(false);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/20">
        <Toggle aria-label="Bold" onClick={handleBold}>
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Italic" onClick={handleItalic}>
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Heading 1" onClick={handleH1}>
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Heading 2" onClick={handleH2}>
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Bullet List" onClick={handleList}>
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Numbered List" onClick={handleOrderedList}>
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        
        <Popover open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <PopoverTrigger asChild>
            <Toggle aria-label="Add Link">
              <Link className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Insert Link</h4>
                <p className="text-sm text-muted-foreground">
                  Add a hyperlink to your content
                </p>
              </div>
              <div className="grid gap-2">
                <Input 
                  placeholder="Link URL" 
                  value={linkUrl} 
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <Input 
                  placeholder="Link Text (optional)" 
                  value={linkText} 
                  onChange={(e) => setLinkText(e.target.value)}
                />
                <Button onClick={handleLink} disabled={!linkUrl}>
                  Insert Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelectionChange}
        onClick={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        placeholder={placeholder}
        rows={minRows}
        className="border-0 rounded-t-none focus-visible:ring-0 min-h-[120px]"
        style={{ 
          resize: 'vertical',
          minHeight: `${minRows * 24}px`, 
          maxHeight: maxRows ? `${maxRows * 24}px` : 'none' 
        }}
      />
    </div>
  );
};

export default RichTextEditor;
