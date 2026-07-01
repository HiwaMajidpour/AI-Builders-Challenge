/**
 * features/dashboard/data/mockData.js
 * Shared mock data for the dashboard.
 * Replace each array/object with real API responses when backend is ready.
 */

// ── Stats ─────────────────────────────────────────────────────────────────────
export const MOCK_STATS = [
  {
    id:      'stories',
    label:   'Stories',
    value:   '24',
    raw:     24,
    delta:   '+3',
    trend:   'up',
    pct:     '+14%',
    icon:    'story',
    color:   'brand',
  },
  {
    id:      'projects',
    label:   'Projects',
    value:   '8',
    raw:     8,
    delta:   '+1',
    trend:   'up',
    pct:     '+14%',
    icon:    'folder',
    color:   'accent',
  },
  {
    id:      'generations',
    label:   'AI Generations',
    value:   '142',
    raw:     142,
    delta:   '+12',
    trend:   'up',
    pct:     '+9%',
    icon:    'ai',
    color:   'success',
  },
  {
    id:      'words',
    label:   'Words Written',
    value:   '94k',
    raw:     94000,
    delta:   '+6k',
    trend:   'up',
    pct:     '+7%',
    icon:    'words',
    color:   'warning',
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────
export const MOCK_PROJECTS = [
  {
    id:         'proj_001',
    title:      'The Neon Chronicles',
    genre:      'Sci-Fi Novel',
    updatedAt:  new Date(Date.now() - 3_600_000).toISOString(),
    status:     'in-progress',
    progress:   67,
    wordCount:  28_400,
  },
  {
    id:         'proj_002',
    title:      'Dragon Heart',
    genre:      'Fantasy Script',
    updatedAt:  new Date(Date.now() - 86_400_000).toISOString(),
    status:     'draft',
    progress:   22,
    wordCount:  7_100,
  },
  {
    id:         'proj_003',
    title:      'Under Quiet Skies',
    genre:      'Short Story',
    updatedAt:  new Date(Date.now() - 259_200_000).toISOString(),
    status:     'completed',
    progress:   100,
    wordCount:  12_200,
  },
  {
    id:         'proj_004',
    title:      'Echoes of Tomorrow',
    genre:      'Thriller Novella',
    updatedAt:  new Date(Date.now() - 432_000_000).toISOString(),
    status:     'in-progress',
    progress:   45,
    wordCount:  18_900,
  },
  {
    id:         'proj_005',
    title:      'The Last Garden',
    genre:      'Literary Fiction',
    updatedAt:  new Date(Date.now() - 604_800_000).toISOString(),
    status:     'draft',
    progress:   8,
    wordCount:  2_300,
  },
];

// ── Activity feed ─────────────────────────────────────────────────────────────
export const MOCK_ACTIVITY = [
  {
    id:        'act_001',
    type:      'generation',
    title:     'AI generated opening chapter',
    detail:    'The Neon Chronicles · 1 200 words',
    timestamp: new Date(Date.now() - 1_800_000).toISOString(),
  },
  {
    id:        'act_002',
    type:      'login',
    title:     'Signed in',
    detail:    'Chrome · macOS',
    timestamp: new Date(Date.now() - 7_200_000).toISOString(),
  },
  {
    id:        'act_003',
    type:      'export',
    title:     'Exported PDF',
    detail:    'Under Quiet Skies · 12 200 words',
    timestamp: new Date(Date.now() - 86_400_000).toISOString(),
  },
  {
    id:        'act_004',
    type:      'generation',
    title:     'AI generated plot outline',
    detail:    'Dragon Heart · 800 words',
    timestamp: new Date(Date.now() - 172_800_000).toISOString(),
  },
  {
    id:        'act_005',
    type:      'export',
    title:     'Exported EPUB',
    detail:    'The Neon Chronicles · 28 400 words',
    timestamp: new Date(Date.now() - 259_200_000).toISOString(),
  },
  {
    id:        'act_006',
    type:      'login',
    title:     'Signed in',
    detail:    'Safari · iPhone',
    timestamp: new Date(Date.now() - 432_000_000).toISOString(),
  },
];

// ── Quick actions ─────────────────────────────────────────────────────────────
export const QUICK_ACTIONS = [
  {
    id:      'new-story',
    label:   'New Story',
    icon:    'pen',
    variant: 'primary',
    to:      '/dashboard/projects/new',
  },
  {
    id:      'generate-ai',
    label:   'Generate AI',
    icon:    'ai',
    variant: 'brand',
    to:      '/dashboard/ai-studio',
  },
  {
    id:      'open-editor',
    label:   'Open Editor',
    icon:    'editor',
    variant: 'secondary',
    to:      '/dashboard/editor',
  },
  {
    id:      'templates',
    label:   'Browse Templates',
    icon:    'template',
    variant: 'secondary',
    to:      '/dashboard/templates',
  },
];
