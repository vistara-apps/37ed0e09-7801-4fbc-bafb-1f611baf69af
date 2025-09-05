export interface User {
  userId: string;
  walletAddress: string;
  predefinedContacts: Contact[];
  preferredLanguage: 'en' | 'es';
  currentState?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface RecordedEncounter {
  encounterId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  recordingUrl?: string;
  location?: string;
  notes?: string;
  sharedWithContacts: string[];
  status: 'recording' | 'completed' | 'shared';
}

export interface StateLaw {
  state: string;
  topic: string;
  summary: string;
  rights: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface RightsGuide {
  state: string;
  title: string;
  summary: string;
  keyRights: string[];
  whatToSay: string[];
  whatNotToSay: string[];
  emergencyContacts: string[];
}

export interface EncounterScript {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  category: 'traffic' | 'general' | 'search' | 'arrest';
}
