export interface CollectiblePen {
  id: string;
  name: string;
  archetype: string;
  accentHex: string;
  handlingSummary: string;
  unlockPath: string;
  impactResistance: number;
  attributes: {
    weight: number;
    control: number;
    impact: number;
  };
}

export interface SupportFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}


// Impact resistance uses base mass × grip × impact grip from the game.
export const COLLECTIBLE_PENS: CollectiblePen[] = [
  {
    id: 'classic-ballpoint',
    name: 'Classic Ballpoint',
    archetype: 'Balanced Starter',
    accentHex: '#3B82F6',
    handlingSummary:
      'Lightweight, predictable classroom staple built for learning flick angles, bank shots, and clean desk-edge positioning.',
    unlockPath: 'Starter pen available from the beginning of gameplay.',
    impactResistance: 1,
    attributes: {
      weight: 52,
      control: 82,
      impact: 58,
    },
  },
  {
    id: 'hyper-gel-pro',
    name: 'Hyper Gel Pro',
    archetype: 'Precision Striker',
    accentHex: '#60A5FA',
    handlingSummary:
      'Smooth metallic barrel with low desk friction for crisp linear velocity, rapid recovery flicks, and clean angular snipes.',
    unlockPath: 'Defeat 8 different Tournament rivals and spend 20,000 Aura Points.',
    impactResistance: 0.91 * 0.92,
    attributes: {
      weight: 60,
      control: 88,
      impact: 70,
    },
  },
  {
    id: 'neon-highlighter',
    name: 'Neon Highlighter',
    archetype: 'Wide-Body Sweeper',
    accentHex: '#A3E635',
    handlingSummary:
      'Broad flat silhouette creates a wide collision contact zone, ideal for pushing opponents off the desk in tight corners.',
    unlockPath: 'Defeat all 16 original rivals and spend 40,000 Aura Points.',
    impactResistance: 1.18 * 1.05 * 1.24,
    attributes: {
      weight: 72,
      control: 68,
      impact: 78,
    },
  },
  {
    id: 'chunky-marker',
    name: 'Chunky Marker',
    archetype: 'Heavy Bruiser',
    accentHex: '#F97316',
    handlingSummary:
      'High-mass barrel that resists knockback from light flicks and transfers heavy momentum on direct center-mass collisions.',
    unlockPath: 'Defeat all 16 original rivals and spend 92,000 Aura Points.',
    impactResistance: 1.34 * 1.22,
    attributes: {
      weight: 92,
      control: 58,
      impact: 94,
    },
  },
  {
    id: 'vortex-spinner',
    name: 'Vortex Spinner',
    archetype: 'Rotational Specialist',
    accentHex: '#8B5CF6',
    handlingSummary:
      'Center-weighted body engineered for whipping rotational strikes and curving off-center deflections around blocking pens.',
    unlockPath: 'Defeat 20 different Tournament rivals and spend 230,000 Aura Points.',
    impactResistance: 1.23 * 0.98 * 1.29,
    attributes: {
      weight: 66,
      control: 90,
      impact: 76,
    },
  },
  {
    id: 'gold-fountain',
    name: 'Gold Fountain',
    archetype: 'Championship Prestige',
    accentHex: '#EAB308',
    handlingSummary:
      'Dense championship-grade metallic balance combining decisive knockout power with steady, authoritative desk control.',
    unlockPath: 'Defeat 24 different Tournament rivals and spend 621,000 Aura Points.',
    impactResistance: 1.37 * 1.01 * 1.33,
    attributes: {
      weight: 84,
      control: 86,
      impact: 90,
    },
  },
];

export const SUPPORT_FAQS: SupportFaqItem[] = [
  {
    id: 'faq-google-play-vs-apk',
    category: 'Downloads',
    question: 'Should I install Pen Fight Aura Wars from Google Play or via the official APK?',
    answer:
      'When the Google Play listing is live, Google Play is the easiest option because updates install automatically. If you prefer direct installation or Google Play is not yet available in your region, use only the signed release APK linked on the official /download page and verify its SHA-256 checksum before installing.',
  },
  {
    id: 'faq-google-signin',
    category: 'Account',
    question: 'Why is Google Sign-In failing or looping back to the title screen?',
    answer:
      'Ensure Google Play Services is up to date on your Android device, your device clock is set to automatic network time, and you have a stable internet connection. If you installed the APK directly, confirm it is the official signed release build—unsigned or modified APKs cannot authenticate with Google Sign-In.',
  },
  {
    id: 'faq-cloud-save',
    category: 'Account',
    question: 'How is my game progress saved if I switch Android phones?',
    answer:
      'Local gameplay progress is stored on your device. When signed in with Google Sign-In and cloud sync is enabled on your build, eligible profile data and unlocked progress sync through our backend authentication and database services. Always ensure you sign in with the same Google account on your new device.',
  },
  {
    id: 'faq-multiplayer-connection',
    category: 'Multiplayer',
    question: 'Why am I seeing matchmaking delays or disconnects in Online 1v1?',
    answer:
      'Online 1v1 matches connect to our hosted multiplayer server. If the server is waking from idle capacity, undergoing maintenance, or your mobile connection switches between Wi-Fi and cellular mid-match, latency or disconnects can occur. Check the Online 1v1 availability notice on the homepage and retry on a stable connection.',
  },
  {
    id: 'faq-ads-privacy',
    category: 'Privacy & Ads',
    question: 'Why does the game show ads, and can I manage ad personalization?',
    answer:
      'Pen Fight Aura Wars uses Google AdMob to support ongoing development and server hosting. You can manage advertising personalization or reset your Android Advertising ID at any time in Android Settings under Google -> Ads, as well as through any in-app privacy consent prompt shown in your region.',
  },
  {
    id: 'faq-delete-account',
    category: 'Privacy & Ads',
    question: 'How do I permanently delete my account and associated data?',
    answer:
      'You can request permanent deletion of your game account and associated cloud data through the Account Deletion page (/delete-account). Use the email linked to your game account so the request can be verified.',
  },
];
