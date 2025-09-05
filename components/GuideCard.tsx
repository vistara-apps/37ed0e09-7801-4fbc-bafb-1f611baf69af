'use client';

import { Shield, MapPin, Clock } from 'lucide-react';
import { RightsGuide } from '@/lib/types';

interface GuideCardProps {
  guide: RightsGuide;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function GuideCard({ guide, variant = 'detailed', onClick }: GuideCardProps) {
  if (variant === 'compact') {
    return (
      <div 
        className="glass-card p-4 cursor-pointer hover:bg-opacity-20 transition-all duration-200"
        onClick={onClick}
      >
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text-primary">{guide.title}</h3>
        </div>
        <p className="text-sm text-text-secondary line-clamp-2">{guide.summary}</p>
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary">{guide.state}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-accent" />
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{guide.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">{guide.state} State Laws</span>
          </div>
        </div>
      </div>

      <p className="text-text-secondary mb-6">{guide.summary}</p>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Your Key Rights
          </h3>
          <ul className="space-y-2">
            {guide.keyRights.map((right, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-text-secondary">{right}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-400 mb-3">✓ What to Say</h3>
            <ul className="space-y-2">
              {guide.whatToSay.map((item, index) => (
                <li key={index} className="text-sm text-text-secondary bg-green-500 bg-opacity-10 p-2 rounded border-l-2 border-green-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-400 mb-3">✗ What NOT to Say</h3>
            <ul className="space-y-2">
              {guide.whatNotToSay.map((item, index) => (
                <li key={index} className="text-sm text-text-secondary bg-red-500 bg-opacity-10 p-2 rounded border-l-2 border-red-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
