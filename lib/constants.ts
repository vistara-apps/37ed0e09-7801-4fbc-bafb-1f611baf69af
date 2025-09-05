export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const DEFAULT_RIGHTS_GUIDE = {
  keyRights: [
    'You have the right to remain silent',
    'You have the right to refuse searches',
    'You have the right to ask if you are free to leave',
    'You have the right to an attorney',
    'You have the right to record the interaction'
  ],
  whatToSay: [
    '"I am exercising my right to remain silent"',
    '"I do not consent to any searches"',
    '"Am I free to leave?"',
    '"I want to speak to a lawyer"'
  ],
  whatNotToSay: [
    'Don\'t lie or provide false information',
    'Don\'t resist physically',
    'Don\'t argue or become confrontational',
    'Don\'t consent to searches',
    'Don\'t answer questions without a lawyer'
  ]
};

export const EMERGENCY_SCRIPTS = {
  en: {
    traffic: "Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave?",
    general: "I am exercising my right to remain silent and I want to speak to a lawyer. I do not consent to any searches.",
    arrest: "I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches."
  },
  es: {
    traffic: "Oficial, estoy ejerciendo mi derecho a permanecer en silencio. No consiento a ningún registro. ¿Soy libre de irme?",
    general: "Estoy ejerciendo mi derecho a permanecer en silencio y quiero hablar con un abogado. No consiento a ningún registro.",
    arrest: "Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento a ningún registro."
  }
};
