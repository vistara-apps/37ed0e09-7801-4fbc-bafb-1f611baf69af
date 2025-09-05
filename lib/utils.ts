import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export function formatDuration(startTime: Date, endTime?: Date): string {
  const end = endTime || new Date();
  const duration = Math.floor((end.getTime() - startTime.getTime()) / 1000);
  
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function detectUserLocation(): Promise<string> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you'd use a geocoding service
            // For demo purposes, we'll return a default state
            resolve('CA');
          } catch (error) {
            resolve('CA'); // Default fallback
          }
        },
        () => resolve('CA') // Default fallback on error
      );
    } else {
      resolve('CA'); // Default fallback
    }
  });
}

export function generateShareableCard(encounter: any, userState: string): string {
  const card = {
    timestamp: new Date().toISOString(),
    location: userState,
    status: 'Active encounter documented',
    rights: [
      'Right to remain silent exercised',
      'Recording in progress',
      'Legal representation requested'
    ],
    emergencyContact: 'Contacts have been notified'
  };
  
  return JSON.stringify(card, null, 2);
}
