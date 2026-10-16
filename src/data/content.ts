export type StarId =
  | 'coolness'
  | 'complaint'
  | 'therapist'
  | 'secret'
  | 'final';

export interface StarContent {
  id: StarId;
  title: string;
  body: string;
  /** Percentage positions — tuned for mobile first, still fine on desktop */
  position: { x: number; y: number };
  size: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'final';
  /** Optional CTA for interactive stars */
  actionLabel?: string;
}

export const STARS: StarContent[] = [
  {
    id: 'coolness',
    title: 'Official Coolness Report',
    body: `Coolness: 9999/10.
Confidence: Unreasonably high.
Humility: Currently unavailable.
Overall verdict: Unfortunately, she's actually pretty cool.`,
    position: { x: 18, y: 28 },
    size: 'md',
  },
  {
    id: 'complaint',
    title: 'A Very Serious Complaint',
    body: `Subject: Tâm.
Crime: Bullying an innocent person for an unreasonable amount of time.
Evidence: Her own words.
Sentence: Continue being herself, apparently.`,
    position: { x: 72, y: 22 },
    size: 'md',
    actionLabel: 'File another complaint',
  },
  {
    id: 'therapist',
    title: 'Professional Emotional Support',
    body: `She said I could confide in her.
Then she said I'd have to worry about her instead.
Therapy rating: 10/10.
Methods: Highly questionable.`,
    position: { x: 28, y: 58 },
    size: 'sm',
  },
  {
    id: 'secret',
    title: 'A Little Secret',
    body: `Okay, jokes aside...
Talking to you genuinely makes ordinary days a little better.`,
    position: { x: 78, y: 52 },
    size: 'sm',
  },
  {
    id: 'final',
    title: 'One Last Thing',
    body: 'There is something waiting for you beyond this star.',
    position: { x: 50, y: 40 },
    size: 'lg',
    variant: 'final',
  },
];

export const COMPLAINT_MESSAGES = [
  'Addendum: Suspect continues to bully with alarming consistency.',
  'Follow-up report: The victim (me) is somehow still talking to her.',
  'Update: Coolness used as a weapon. Requesting backup. Backup declined.',
  'New evidence filed: A smirk. Highly incriminating.',
  'Status: Case remains open. Suspect remains unbothered.',
];

export const CHAOS_MESSAGES = [
  "Warning: Tâm's ego has exceeded recommended limits.",
  'The universe has confirmed that she will win the argument.',
  'Coolness detected. Humility not found.',
  'A reminder that somebody is probably being bullied right now.',
  'This website has been reviewed by Tâm herself. It received a 10/10. Obviously.',
  'Alert: Mischief levels are rising. Do not engage. (You already did.)',
  'Scientific finding: She is, in fact, that cool. Frustrating, I know.',
];

export const EASTER_EGG_MESSAGE =
  'You found the secret. Your observational skills are almost as impressive as your ego.';

export const INTRO = {
  heading: 'Oi, Tâm. You found your way here. ✦',
  support: "I made a tiny universe for someone who thinks she's ridiculously cool.",
  aside: "(Unfortunately, she might be right.)",
  cta: 'Enter my little universe ✨',
  skip: 'Skip intro',
};

export const FINAL = {
  line1: 'Some people make ordinary days a little more interesting.',
  line2: "You're one of those people, Tâm. ♡",
  tease: "Don't let this compliment inflate your ego any further. 😾",
  button: "Okay, I'll stop embarrassing myself",
  after: "Too late. You already know you're cool. 🌙",
};

export const TOTAL_STARS = STARS.length;
