export interface Category {
  name: string;
  slug: string;
  icon: string;
  type: 'evergreen' | 'seasonal';
  price: number;
  headline: string;
  subheadline: string;
  description: string;
  displayOrder: number;
  // Seasonal-specific fields
  startDate?: string; // Format: MM-DD
  endDate?: string; // Format: MM-DD
  priority?: 'hero' | 'secondary';
  offSeasonMessage?: string;
}

export const categories: Category[] = [
  // EVERGREEN CATEGORIES (Always Visible)
  {
    name: 'Manifestation & Affirmations',
    slug: 'manifestation',
    icon: '🎯',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Manifestation" Songs',
    subheadline: 'Powerful affirmation music to attract your dreams into reality',
    description: 'Transform your mindset with custom affirmation songs',
    displayOrder: 1,
  },
  {
    name: 'Birthday Songs',
    slug: 'birthday',
    icon: '🎂',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Birthday" Songs',
    subheadline: 'Make their special day unforgettable with a custom birthday song',
    description: 'Celebrate with a one-of-a-kind birthday song',
    displayOrder: 2,
  },
  {
    name: 'Confidence & Self-Love',
    slug: 'confidence',
    icon: '💪',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Confidence" Songs',
    subheadline: 'Build unshakeable self-love and confidence',
    description: 'Empower yourself with uplifting confidence anthems',
    displayOrder: 3,
  },
  {
    name: 'Prayer & Spiritual Healing',
    slug: 'prayer',
    icon: '🙏',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Prayer" Songs',
    subheadline: 'Deepen your spiritual connection through sacred music',
    description: 'Find peace and healing through personalized prayer music',
    displayOrder: 4,
  },
  {
    name: 'Love & Relationships',
    slug: 'love',
    icon: '💑',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Love" Songs',
    subheadline: 'Express your love with a song made just for them',
    description: 'Strengthen your bonds with custom love songs',
    displayOrder: 5,
  },
  {
    name: 'Morning Motivation',
    slug: 'motivation',
    icon: '🌅',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Morning Motivation" Songs',
    subheadline: 'Start every day energized and inspired',
    description: 'Wake up to your personal morning anthem',
    displayOrder: 6,
  },
  {
    name: 'Peace & Calm',
    slug: 'peace',
    icon: '🧘',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Peace" Songs',
    subheadline: 'Find your calm in the chaos with soothing melodies',
    description: 'Reduce stress and anxiety with peaceful music',
    displayOrder: 7,
  },
  {
    name: 'Career Success',
    slug: 'career',
    icon: '💼',
    type: 'evergreen',
    price: 7.99,
    headline: 'Personalized "Career Success" Songs',
    subheadline: 'Achieve your professional goals with motivational music',
    description: 'Unlock your career potential with success anthems',
    displayOrder: 8,
  },

  // SEASONAL CATEGORIES (Date-Activated)
  {
    name: 'Christmas Songs',
    slug: 'christmas',
    icon: '🎄',
    type: 'seasonal',
    price: 9.99,
    headline: 'Personalized "Christmas" Songs, Made Just for You',
    subheadline: 'Custom holiday music - the perfect gift for loved ones',
    description: 'Spread holiday joy with personalized Christmas songs',
    displayOrder: 101,
    startDate: '11-01',
    endDate: '12-25',
    priority: 'hero',
    offSeasonMessage: 'Christmas songs return November 1st! Get notified when they\'re back.',
  },
  {
    name: 'Valentine\'s Day Songs',
    slug: 'valentines',
    icon: '💝',
    type: 'seasonal',
    price: 9.99,
    headline: 'Personalized "Valentine\'s Day" Songs',
    subheadline: 'Say "I love you" with a song made just for them',
    description: 'Create the ultimate romantic gift this Valentine\'s',
    displayOrder: 102,
    startDate: '01-15',
    endDate: '02-14',
    priority: 'hero',
    offSeasonMessage: 'Valentine\'s Day songs return January 15th! Get notified when they\'re back.',
  },
  {
    name: 'Mother\'s Day Songs',
    slug: 'mothers-day',
    icon: '👩',
    type: 'seasonal',
    price: 8.99,
    headline: 'Personalized "Mother\'s Day" Songs',
    subheadline: 'Honor mom with a heartfelt tribute she\'ll treasure forever',
    description: 'Show mom how much she means with a custom song',
    displayOrder: 103,
    startDate: '04-15',
    endDate: '05-12',
    priority: 'hero',
    offSeasonMessage: 'Mother\'s Day songs return April 15th! Get notified when they\'re back.',
  },
  {
    name: 'Father\'s Day Songs',
    slug: 'fathers-day',
    icon: '👨',
    type: 'seasonal',
    price: 8.99,
    headline: 'Personalized "Father\'s Day" Songs',
    subheadline: 'Celebrate dad with a personalized tribute song',
    description: 'Give dad a gift he\'ll never forget',
    displayOrder: 104,
    startDate: '05-15',
    endDate: '06-21',
    priority: 'secondary',
    offSeasonMessage: 'Father\'s Day songs return May 15th! Get notified when they\'re back.',
  },
  {
    name: 'Graduation Songs',
    slug: 'graduation',
    icon: '🎓',
    type: 'seasonal',
    price: 7.99,
    headline: 'Personalized "Graduation" Songs',
    subheadline: 'Celebrate their achievement with a custom graduation anthem',
    description: 'Mark this milestone with a personalized song',
    displayOrder: 105,
    startDate: '05-01',
    endDate: '06-30',
    priority: 'secondary',
    offSeasonMessage: 'Graduation songs return May 1st! Get notified when they\'re back.',
  },
  {
    name: 'Thanksgiving Songs',
    slug: 'thanksgiving',
    icon: '🦃',
    type: 'seasonal',
    price: 7.99,
    headline: 'Personalized "Thanksgiving" Songs',
    subheadline: 'Express gratitude with a heartfelt Thanksgiving song',
    description: 'Share your thankfulness with custom music',
    displayOrder: 106,
    startDate: '11-01',
    endDate: '11-30',
    priority: 'secondary',
    offSeasonMessage: 'Thanksgiving songs return November 1st! Get notified when they\'re back.',
  },
  {
    name: 'New Year Goals',
    slug: 'new-year',
    icon: '🎊',
    type: 'seasonal',
    price: 7.99,
    headline: 'Personalized "New Year" Songs',
    subheadline: 'Start the year strong with your personal resolution anthem',
    description: 'Turn your New Year\'s resolutions into music',
    displayOrder: 107,
    startDate: '01-01',
    endDate: '01-31',
    priority: 'secondary',
    offSeasonMessage: 'New Year songs return January 1st! Get notified when they\'re back.',
  },
];

// ===== DATE CHECKING HELPER FUNCTIONS =====

/**
 * Check if today's date falls within a seasonal date range
 * Handles same-month, cross-month, and year-crossing ranges
 */
export function isDateInRange(startDate: string, endDate: string): boolean {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate();

  const [startMonth, startDay] = startDate.split('-').map(Number);
  const [endMonth, endDay] = endDate.split('-').map(Number);

  // Convert dates to comparable numbers (MMDD format)
  const current = currentMonth * 100 + currentDay;
  const start = startMonth * 100 + startDay;
  const end = endMonth * 100 + endDay;

  // Handle year-crossing ranges (e.g., 12-15 to 01-05)
  if (start > end) {
    // Active if current >= start OR current <= end
    return current >= start || current <= end;
  }

  // Normal range: start <= current <= end
  return current >= start && current <= end;
}

/**
 * Get all currently active seasonal categories
 */
export function getActiveSeasonalCategories(): Category[] {
  return categories.filter(cat => {
    if (cat.type !== 'seasonal') return false;
    if (!cat.startDate || !cat.endDate) return false;
    return isDateInRange(cat.startDate, cat.endDate);
  });
}

/**
 * Get the hero seasonal category (if any active)
 * Returns only the FIRST hero priority category if multiple are active
 */
export function getHeroSeasonalCategory(): Category | null {
  const activeSeasonals = getActiveSeasonalCategories();
  const heroCategories = activeSeasonals.filter(cat => cat.priority === 'hero');
  return heroCategories.length > 0 ? heroCategories[0] : null;
}

/**
 * Get all secondary seasonal categories currently active
 */
export function getSecondarySeasonalCategories(): Category[] {
  const activeSeasonals = getActiveSeasonalCategories();
  return activeSeasonals.filter(cat => cat.priority === 'secondary');
}

/**
 * Get all evergreen categories, sorted by display order
 */
export function getEvergreenCategories(): Category[] {
  return categories
    .filter(cat => cat.type === 'evergreen')
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Check if a specific category (by slug) is currently active
 */
export function isCategoryActive(slug: string): boolean {
  const category = categories.find(cat => cat.slug === slug);
  if (!category) return false;

  // Evergreen categories are always active
  if (category.type === 'evergreen') return true;

  // Seasonal categories depend on date range
  if (category.startDate && category.endDate) {
    return isDateInRange(category.startDate, category.endDate);
  }

  return false;
}

/**
 * Get a category by its slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}

/**
 * Get all currently active categories (evergreen + active seasonal)
 * Useful for navigation menus and category selection
 */
export function getAllActiveCategories(): Category[] {
  const evergreen = getEvergreenCategories();
  const seasonal = getActiveSeasonalCategories();

  // Seasonal categories first (sorted by priority: hero then secondary)
  const sortedSeasonal = seasonal.sort((a, b) => {
    if (a.priority === 'hero' && b.priority === 'secondary') return -1;
    if (a.priority === 'secondary' && b.priority === 'hero') return 1;
    return a.displayOrder - b.displayOrder;
  });

  return [...sortedSeasonal, ...evergreen];
}
