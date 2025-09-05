'use client';

import { useState, useEffect } from 'react';
import { Shield, Mic, BookOpen, Share2, MapPin, Users, AlertTriangle } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/Header';
import { GuideCard } from '@/components/GuideCard';
import { ActionButton } from '@/components/ActionButton';
import { RecordIndicator } from '@/components/RecordIndicator';
import { ContactPicker } from '@/components/ContactPicker';
import { ScriptInput } from '@/components/ScriptInput';
import { RightsGuide, RecordedEncounter, Contact, EncounterScript } from '@/lib/types';
import { DEFAULT_RIGHTS_GUIDE, EMERGENCY_SCRIPTS } from '@/lib/constants';
import { detectUserLocation, generateShareableCard } from '@/lib/utils';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentView, setCurrentView] = useState<'home' | 'guide' | 'record' | 'scripts' | 'contacts'>('home');
  const [userState, setUserState] = useState<string>('CA');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStart, setRecordingStart] = useState<Date | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // Mock data - in a real app, this would come from APIs/database
  const [rightsGuide] = useState<RightsGuide>({
    state: 'CA',
    title: 'California Rights Guide',
    summary: 'Know your rights during law enforcement interactions in California. This guide covers your constitutional rights and state-specific protections.',
    keyRights: DEFAULT_RIGHTS_GUIDE.keyRights,
    whatToSay: DEFAULT_RIGHTS_GUIDE.whatToSay,
    whatNotToSay: DEFAULT_RIGHTS_GUIDE.whatNotToSay,
    emergencyContacts: ['911', 'ACLU Hotline: 1-877-328-2258']
  });

  const [emergencyContacts] = useState<Contact[]>([
    { id: '1', name: 'Emergency Contact 1', phone: '+1 (555) 123-4567', email: 'contact1@example.com' },
    { id: '2', name: 'Legal Aid', phone: '+1 (555) 987-6543', email: 'legal@example.com' },
    { id: '3', name: 'Family Member', phone: '+1 (555) 456-7890' }
  ]);

  const [scripts] = useState<EncounterScript[]>([
    {
      id: '1',
      title: 'Traffic Stop Script',
      content: EMERGENCY_SCRIPTS.en.traffic,
      language: 'en',
      category: 'traffic'
    },
    {
      id: '2',
      title: 'General Encounter',
      content: EMERGENCY_SCRIPTS.en.general,
      language: 'en',
      category: 'general'
    },
    {
      id: '3',
      title: 'Arrest Situation',
      content: EMERGENCY_SCRIPTS.en.arrest,
      language: 'en',
      category: 'arrest'
    }
  ]);

  useEffect(() => {
    setFrameReady();
    
    // Detect user location
    detectUserLocation().then(state => {
      setUserState(state);
    });
  }, [setFrameReady]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingStart(new Date());
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const encounter: RecordedEncounter = {
      encounterId: Date.now().toString(),
      userId: 'current-user',
      startTime: recordingStart!,
      endTime: new Date(),
      location: userState,
      sharedWithContacts: selectedContacts,
      status: 'completed'
    };
    
    // In a real app, save to database and upload recording
    console.log('Encounter recorded:', encounter);
    setCurrentView('home');
  };

  const handleShareEncounter = () => {
    const shareableCard = generateShareableCard({}, userState);
    // In a real app, share via native sharing or copy to clipboard
    navigator.clipboard.writeText(shareableCard);
    alert('Encounter details copied to clipboard!');
  };

  const renderFloatingElements = () => (
    <>
      <div className="floating-element top-20 left-10 w-8 h-8 bg-accent rounded-full animate-pulse-slow"></div>
      <div className="floating-element top-40 right-16 w-4 h-4 bg-primary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="floating-element bottom-32 left-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="floating-element top-60 right-8 w-3 h-3 bg-teal-400 rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
    </>
  );

  const renderHomeView = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8 relative">
        {renderFloatingElements()}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Guardian Script</h1>
          <p className="text-text-secondary mb-6">Your Rights, Instantly. Communicate Clearly.</p>
          
          <Wallet>
            <ConnectWallet>
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          variant="primary"
          onClick={() => setCurrentView('record')}
          icon={<Mic className="w-5 h-5" />}
          className="h-20 flex-col"
        >
          Record & Share
        </ActionButton>
        
        <ActionButton
          variant="secondary"
          onClick={() => setCurrentView('guide')}
          icon={<Shield className="w-5 h-5" />}
          className="h-20 flex-col"
        >
          Rights Guide
        </ActionButton>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-text-primary">Location Recording</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Current State: {userState}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-green-400">Active</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-text-primary">State-Specific Law Lexicon</h3>
          </div>
          <p className="text-text-secondary text-sm mb-3">
            Access simplified, localized legal knowledge for your current location.
          </p>
          <ActionButton
            variant="secondary"
            size="sm"
            onClick={() => setCurrentView('scripts')}
          >
            View Scripts
          </ActionButton>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-text-primary">Emergency Contacts</h3>
          </div>
          <p className="text-text-secondary text-sm mb-3">
            {emergencyContacts.length} contacts ready for urgent alerts.
          </p>
          <ActionButton
            variant="secondary"
            size="sm"
            onClick={() => setCurrentView('contacts')}
          >
            Manage Contacts
          </ActionButton>
        </div>
      </div>
    </div>
  );

  const renderGuideView = () => (
    <div className="space-y-6">
      <GuideCard guide={rightsGuide} variant="detailed" />
      
      <div className="glass-card p-4">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-accent" />
          Share Your Rights
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Generate a shareable summary of your rights and key information.
        </p>
        <ActionButton
          variant="primary"
          onClick={handleShareEncounter}
          icon={<Share2 className="w-4 h-4" />}
        >
          Generate Shareable Card
        </ActionButton>
      </div>
    </div>
  );

  const renderRecordView = () => (
    <div className="space-y-6">
      <div className="glass-card p-6 text-center">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          {isRecording ? 'Recording Active' : 'Start Recording'}
        </h2>
        
        <div className="mb-6">
          <RecordIndicator
            variant={isRecording ? 'active' : 'inactive'}
            startTime={recordingStart || undefined}
            onStart={handleStartRecording}
            onStop={handleStopRecording}
          />
        </div>

        {isRecording && (
          <div className="bg-red-500 bg-opacity-10 border border-red-400 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 justify-center text-red-400 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Recording in Progress</span>
            </div>
            <p className="text-sm text-text-secondary">
              Your encounter is being documented. Stay calm and remember your rights.
            </p>
          </div>
        )}

        <p className="text-text-secondary text-sm">
          {isRecording 
            ? 'Tap the square button to stop recording and share with your contacts.'
            : 'Tap the record button to start documenting your encounter.'
          }
        </p>
      </div>

      {!isRecording && (
        <ContactPicker
          contacts={emergencyContacts}
          selectedContacts={selectedContacts}
          onSelectionChange={setSelectedContacts}
          variant="multiSelect"
        />
      )}
    </div>
  );

  const renderScriptsView = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Emergency Scripts</h2>
        <p className="text-text-secondary text-sm">
          Pre-written phrases to help you communicate clearly during encounters.
        </p>
      </div>

      {scripts.map((script) => (
        <ScriptInput
          key={script.id}
          script={script}
          variant="viewOnly"
          onCopy={() => alert('Script copied to clipboard!')}
        />
      ))}
    </div>
  );

  const renderContactsView = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Emergency Contacts</h2>
        <p className="text-text-secondary text-sm">
          Manage your emergency contacts for quick alerts during encounters.
        </p>
      </div>

      <ContactPicker
        contacts={emergencyContacts}
        selectedContacts={selectedContacts}
        onSelectionChange={setSelectedContacts}
        variant="multiSelect"
      />

      <div className="glass-card p-4 text-center">
        <p className="text-text-secondary text-sm mb-4">
          Need to add more contacts? Configure them in your settings.
        </p>
        <ActionButton variant="secondary" size="sm">
          Add New Contact
        </ActionButton>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <Header
        title={
          currentView === 'home' ? 'Guardian Script' :
          currentView === 'guide' ? 'Rights Guide' :
          currentView === 'record' ? 'Record Encounter' :
          currentView === 'scripts' ? 'Emergency Scripts' :
          'Emergency Contacts'
        }
        variant={currentView === 'home' ? 'titleOnly' : 'withBackButton'}
        onBack={() => setCurrentView('home')}
      />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {currentView === 'home' && renderHomeView()}
        {currentView === 'guide' && renderGuideView()}
        {currentView === 'record' && renderRecordView()}
        {currentView === 'scripts' && renderScriptsView()}
        {currentView === 'contacts' && renderContactsView()}
      </main>
    </div>
  );
}
