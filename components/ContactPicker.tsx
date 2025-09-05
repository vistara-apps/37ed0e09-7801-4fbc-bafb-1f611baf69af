'use client';

import { useState } from 'react';
import { Check, User, Phone, Mail } from 'lucide-react';
import { Contact } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ContactPickerProps {
  contacts: Contact[];
  selectedContacts: string[];
  onSelectionChange: (contactIds: string[]) => void;
  variant?: 'singleSelect' | 'multiSelect';
}

export function ContactPicker({
  contacts,
  selectedContacts,
  onSelectionChange,
  variant = 'multiSelect'
}: ContactPickerProps) {
  const handleContactToggle = (contactId: string) => {
    if (variant === 'singleSelect') {
      onSelectionChange([contactId]);
    } else {
      const newSelection = selectedContacts.includes(contactId)
        ? selectedContacts.filter(id => id !== contactId)
        : [...selectedContacts, contactId];
      onSelectionChange(newSelection);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <User className="w-12 h-12 text-text-secondary mx-auto mb-3" />
        <h3 className="font-semibold text-text-primary mb-2">No Emergency Contacts</h3>
        <p className="text-text-secondary text-sm">Add emergency contacts in settings to enable quick alerts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text-primary">
        {variant === 'singleSelect' ? 'Select Contact' : 'Select Contacts to Alert'}
      </h3>
      
      <div className="space-y-2">
        {contacts.map((contact) => {
          const isSelected = selectedContacts.includes(contact.id);
          
          return (
            <div
              key={contact.id}
              onClick={() => handleContactToggle(contact.id)}
              className={cn(
                'glass-card p-4 cursor-pointer transition-all duration-200',
                isSelected ? 'bg-primary bg-opacity-20 border-primary border-opacity-50' : 'hover:bg-opacity-20'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    isSelected ? 'bg-primary' : 'bg-surface'
                  )}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  
                  <div>
                    <div className="font-medium text-text-primary">{contact.name}</div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      {contact.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
