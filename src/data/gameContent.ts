export interface CollectiblePen {
  id: string;
  name: string;
  archetype: string;
  accentHex: string;
  handlingSummary: string;
  unlockPath: string;
  attributes: {
    weight: number;
    control: number;
    impact: number;
  };
}

export interface GameplayPlaceholderSlot {
  id: string;
  title: string;
  category: string;
  aspect: '16:9' | '9:16';
  captureBrief: string;
  recommendedFilename: string;
}

export interface SupportFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const HERO_KEY_ART = '/src/assets/images/hero_desk_clash_1795434220411.jpg';
export const PEN_LINEUP_ART = '/src/assets/images/pen_arsenal_lineup_1795434225842.jpg';
export const DESK_MECHANICS_ART = '/src/assets/images/desk_arena_mechanics_1795434216065.jpg';

export const COLLECTIBLE_PENS: CollectiblePen[] = [
  {
    id: 'classic-ballpoint',
    name: 'Classic Ballpoint',
    archetype: 'Balanced Starter',
    accentHex: '#3B82F6',
    handlingSummary:
      'Lightweight, predictable classroom staple built for learning flick angles, bank shots, and clean desk-edge positioning.',
    unlockPath: 'Starter pen available from the beginning of gameplay.',
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
    unlockPath: 'Unlocked through in-game coins and progression milestones.',
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
    unlockPath: 'Unlocked through in-game coins and gameplay progression.',
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
    unlockPath: 'Unlocked through coins and competitive tournament progress.',
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
    unlockPath: 'Unlocked through coins, gameplay progression, and supported achievements.',
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
    unlockPath: 'Unlocked through sustained coin savings, progression milestones, and supported achievements.',
    attributes: {
      weight: 84,
      control: 86,
      impact: 90,
    },
  },
];

export const GAMEPLAY_PLACEHOLDER_SLOTS: GameplayPlaceholderSlot[] = [
  {
    id: 'tournament-gameplay',
    title: 'Tournament Gameplay',
    category: 'Single-Player Ladder',
    aspect: '16:9',
    captureBrief:
      'Replace with an actual Android capture showing the Tournament bracket and live wooden desk match against an AI opponent.',
    recommendedFilename: 'public/media/gameplay-tournament.png',
  },
  {
    id: 'pen-collision-effects',
    title: 'Pen Collision Effects',
    category: 'Physics & Impact',
    aspect: '16:9',
    captureBrief:
      'Replace with a verified in-game frame capturing high-momentum impact sparks, rotational momentum, and desk-edge knockouts.',
    recommendedFilename: 'public/media/gameplay-collision.png',
  },
  {
    id: 'pen-collection-upgrades',
    title: 'Pen Collection & Armory',
    category: 'Collectibles',
    aspect: '16:9',
    captureBrief:
      'Replace with a genuine screenshot of the in-game armory displaying Classic Ballpoint through Gold Fountain unlock progress.',
    recommendedFilename: 'public/media/gameplay-armory.png',
  },
  {
    id: 'online-multiplayer',
    title: 'Online 1v1 Multiplayer',
    category: 'Competitive Arena',
    aspect: '16:9',
    captureBrief:
      'Replace with a real capture of live 1v1 matchmaking and turn synchronization once production multiplayer is verified.',
    recommendedFilename: 'public/media/gameplay-online-1v1.png',
  },
  {
    id: 'leaderboards-aura',
    title: 'Leaderboards & Aura Rating',
    category: 'Rankings',
    aspect: '16:9',
    captureBrief:
      'Replace with a real screenshot of competitive rankings, Aura Rating standings, and player profile cards.',
    recommendedFilename: 'public/media/gameplay-leaderboard.png',
  },
  {
    id: 'victory-animations',
    title: 'Victory Animations',
    category: 'Match Resolution',
    aspect: '16:9',
    captureBrief:
      'Replace with an actual capture of post-knockout victory feedback, coin rewards, and match progression summary.',
    recommendedFilename: 'public/media/gameplay-victory.png',
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
      'You can request permanent deletion of your game account and associated cloud data at any time through our dedicated Account Deletion page (/delete-account) or from inside the Android app account settings once signed in.',
  },
];
