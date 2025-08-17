import { Brain, Zap, Gamepad2 } from 'lucide-react';

export const featuredProjects = [
  {
    id: 'pr-reviewer',
    title: 'PR Reviewer',
    domain: 'pr-reviewer.aswincloud.com',
    description:
      'ML-trained application that intelligently analyzes pull requests to determine the minimum person approval required for merging. Features prediction algorithms to identify reviewers who will approve faster, optimizing development workflows.',
    technologies: ['Machine Learning', 'Python', 'React', 'Node.js', 'Cloud'],
    features: [
      'Intelligent PR analysis',
      'Approval prediction algorithms',
      'Fast reviewer identification',
      'Development workflow optimization',
      'Real-time PR insights',
    ],
    icon: <Brain size={48} />,
    link: 'https://pr-reviewer.aswincloud.com',
    status: 'Live',
  },
];

export const additionalProjects = [
  {
    id: 'mirror-download-bot',
    title: 'Mirror Download Bot',
    domain: 't.me/Testdownload123bot',
    description:
      'A powerful Telegram bot for downloading content from various sources including torrents, direct links, and YouTube videos. Features automated downloads, progress tracking, and file management.',
    technologies: ['Python', 'Telegram Bot API', 'aria2', 'yt-dlp', 'Cloud Storage'],
    features: [
      'Torrent download support',
      'YouTube video downloading',
      'Direct link processing',
      'Download progress tracking',
      'File organization and management',
    ],
    icon: <Zap size={48} />,
    link: 'https://t.me/Testdownload123bot',
    status: 'Live',
  },
  {
    id: 'word-chain-game-bot',
    title: 'Word Chain Game Bot',
    domain: 't.me/gamebotbyashbot',
    description:
      'An interactive Telegram bot where players take turns creating words starting with the last letter of the previous word. Features multiplayer support, scoring system, and word validation.',
    technologies: ['Python', 'Telegram Bot API', 'SQLite', 'Game Logic', 'Multiplayer Support'],
    features: [
      'Multiplayer word chain game',
      'Word validation and scoring',
      'Turn-based gameplay',
      'Game statistics tracking',
      'Custom game rules and settings',
    ],
    icon: <Gamepad2 size={48} />,
    link: 'https://t.me/gamebotbyashbot',
    status: 'Live',
  },
];

export const allProjects = [...featuredProjects, ...additionalProjects];
