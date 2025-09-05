'use client';

import { Mic, Square, Play } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface RecordIndicatorProps {
  variant: 'active' | 'inactive';
  startTime?: Date;
  onStart?: () => void;
  onStop?: () => void;
}

export function RecordIndicator({ variant, startTime, onStart, onStop }: RecordIndicatorProps) {
  if (variant === 'inactive') {
    return (
      <div className="flex items-center justify-center">
        <button
          onClick={onStart}
          className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Mic className="w-8 h-8 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center animate-pulse-slow">
          <Mic className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -inset-2 border-2 border-red-400 rounded-full animate-ping"></div>
      </div>
      
      <div className="text-center">
        <div className="text-red-400 font-semibold text-lg">
          {startTime ? formatDuration(startTime) : '0:00'}
        </div>
        <div className="text-text-secondary text-sm">Recording...</div>
      </div>

      <button
        onClick={onStop}
        className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200"
      >
        <Square className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
