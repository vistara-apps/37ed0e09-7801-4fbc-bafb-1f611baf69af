'use client';

import { ArrowLeft, Settings2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  variant?: 'withBackButton' | 'titleOnly';
  onBack?: () => void;
  onSettings?: () => void;
}

export function Header({ title, variant = 'titleOnly', onBack, onSettings }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-surface bg-opacity-50 backdrop-blur-sm border-b border-white border-opacity-10">
      <div className="flex items-center gap-3">
        {variant === 'withBackButton' && (
          <button
            onClick={onBack}
            className="p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>
      
      {onSettings && (
        <button
          onClick={onSettings}
          className="p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
        >
          <Settings2 className="w-5 h-5 text-text-secondary" />
        </button>
      )}
    </header>
  );
}
