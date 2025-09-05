'use client';

import { useState } from 'react';
import { Copy, Edit3, Save, X } from 'lucide-react';
import { EncounterScript } from '@/lib/types';
import { ActionButton } from './ActionButton';

interface ScriptInputProps {
  script: EncounterScript;
  variant?: 'editable' | 'viewOnly';
  onSave?: (script: EncounterScript) => void;
  onCopy?: (content: string) => void;
}

export function ScriptInput({ script, variant = 'viewOnly', onSave, onCopy }: ScriptInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(script.content);

  const handleSave = () => {
    if (onSave) {
      onSave({ ...script, content: editedContent });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(script.content);
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script.content);
      if (onCopy) {
        onCopy(script.content);
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-text-primary">{script.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-1 bg-accent bg-opacity-20 text-accent rounded">
              {script.category}
            </span>
            <span className="text-xs px-2 py-1 bg-surface text-text-secondary rounded">
              {script.language.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {variant === 'editable' && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4 text-text-secondary" />
            </button>
          )}
          
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200"
          >
            <Copy className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-3 bg-bg bg-opacity-50 border border-white border-opacity-20 rounded-md text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            placeholder="Enter your script..."
          />
          
          <div className="flex items-center gap-2">
            <ActionButton
              variant="primary"
              size="sm"
              onClick={handleSave}
              icon={<Save className="w-4 h-4" />}
            >
              Save
            </ActionButton>
            
            <ActionButton
              variant="secondary"
              size="sm"
              onClick={handleCancel}
              icon={<X className="w-4 h-4" />}
            >
              Cancel
            </ActionButton>
          </div>
        </div>
      ) : (
        <div className="bg-bg bg-opacity-30 p-3 rounded-md border border-white border-opacity-10">
          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
            {script.content}
          </p>
        </div>
      )}
    </div>
  );
}
