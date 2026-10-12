export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  createdAt: number;
  excerpt: string;
  takeaway: string;
  content: string;
  author: string;
  tags?: string[];
}

export const SEED_BLOGS: BlogPost[] = [
  {
    id: 'seed-1',
    slug: 'people-build-systems-systems-build-nations',
    title: 'People Build Systems. Systems Build Nations.',
    category: 'Systems & Africa',
    readTime: '4 min',
    date: 'Oct 2026',
    createdAt: 1728800000000,
    excerpt: 'Enduring institutions are never accidental. Nations rise when disciplined people erect transparent, repeatable systems that outlive political personalities.',
    takeaway: 'Institutions outlast charisma. Build the tracks before running the train.',
    author: 'Dolapo Olutoye',
    tags: ['Governance', 'Systems Engineering', 'Institution Building'],
    content: `When we study the arc of prosperous societies, we rarely find that their resilience was anchored in the singular brilliance of an emperor, a visionary president, or a charismatic founder. Charisma ignites movements, but only systems preserve progress.

Too often across emerging economies, we bet the entirety of our future on exceptional individuals. We celebrate the heroic administrator who works 18 hours a day to clear a bottleneck, while ignoring the broken workflow that created the bottleneck in the first place.

When that individual steps down or burns out, the institution collapses back into mediocrity. Why? Because heroics are unscalable. Systems, on the other hand, are compounding engines.

### 1. The Anatomy of an Enduring Institution
A true system consists of three non-negotiable rails:
- **Codified Operational Protocols:** Knowledge must never live solely inside one person's head. If a process cannot be documented, trained, and audited, it is not a system—it is an art form.
- **Incentive Alignment:** People do what systems reward, not what leadership preaches. If corner-cutting yields promotions while adherence to rigor yields delays, corner-cutting becomes the de facto culture.
- **Feedback Telemetry:** Systems without metrics become corrupt or ossified. Real-time observability allows self-correction long before failure becomes catastrophic.

### 2. Shifting from Personality to Process
Africa’s great opportunity in this decade is not merely cultivating more leaders; it is engineering stronger rails. When our energy transitions from lamenting bad governance to constructing robust corporate, communal, and technological systems, we build nations that cannot be derailed by the change of a single season.

Build the tracks. Then, and only then, release the train.`,
  },
  {
    id: 'seed-2',
    slug: 'africa-doesnt-have-a-talent-problem-it-has-a-systems-problem',
    title: 'Africa Doesn’t Have a Talent Problem. It Has a Systems Problem.',
    category: 'Systems & Africa',
    readTime: '5 min',
    date: 'Sep 2026',
    createdAt: 1727500000000,
    excerpt: 'Raw talent is abundant across the continent. What is missing are predictable rails, distribution pipelines, and governance mechanisms that scale talent.',
    takeaway: 'Talent without systemic rails produces frustration, not prosperity.',
    author: 'Dolapo Olutoye',
    tags: ['Human Capital', 'Economic Infrastructure', 'African Tech'],
    content: `Walk into any tech hub in Yaba, Nairobi, or Kigali, and you will meet brilliant minds solving mathematically complex distributed systems problems on erratic power grids. The raw cognitive horsepower of African youth is staggering.

Yet, despite an ocean of talent, our macroeconomic needle moves at a fraction of its potential. Why?

Because raw talent is potential energy; systems are the transmission lines that turn potential energy into kinetic societal impact. Without transmission lines, high voltage simply burns out the transformer.

### The Missing Pipeline
The bottlenecks holding back our human capital are predictable and solvable:
1. **Capital Allocation Rails:** Capital in Africa is often trapped in high-friction legacy networks or risk-averse real estate, starving inventive builders of early validation runway.
2. **Standardized Quality Certification:** Thousands of self-taught developers and strategists lack the institutional seals of trust that permit enterprise contracts across London, New York, or Frankfurt.
3. **Distribution & Cross-Border Fluidity:** It remains easier to ship digital services from London to Lagos than from Lagos to Kinshasa or Accra. Intra-continental friction drains entrepreneurial stamina.

### The Way Forward
Our mandate is clear: Stop looking for miracles and start engineering infrastructure. When New Horizons equips 3,000 students with data intelligence, that skill must plug into industrial registries, credit ratings, and verified venture pipelines. 

When talent meets rail, acceleration is inevitable.`,
  },
  {
    id: 'seed-3',
    slug: 'your-potential-is-not-your-achievement',
    title: 'Your Potential Is Not Your Achievement.',
    category: 'Leadership & Character',
    readTime: '3 min',
    date: 'Aug 2026',
    createdAt: 1726000000000,
    excerpt: 'Potential is merely stored capacity. Unapplied, it turns into regret. The bridge between raw gifts and lasting impact is non-negotiable daily execution.',
    takeaway: 'Stop romanticizing what you could do. Measure what you ship.',
    author: 'Dolapo Olutoye',
    tags: ['Character', 'Execution', 'Mindset'],
    content: `We live in an era that worships raw talent and showers praise on early promise. "She has so much potential," we say. "He is destined for greatness."

Be careful. Praise awarded to unexpressed potential is dangerous currency. It gives the mind the dopamine of achievement without the labor of crucifixion to a craft.

### Potential is a Burden, Not a Trophy
Unapplied potential does not stay neutral; it ferments into cynicism. The most bitter people in the world are often those who were told how gifted they were at age twenty, but refused to submit to the brutal boredom of daily rigor at thirty.

- **Talent is given freely.**
- **Character is forged through friction.**
- **Legacy is bought with consistency.**

### The Bridge of Daily Execution
If you want to know what you truly value, don't look at your vision board—look at your calendar and your bank statements. The bridge between potential and achievement is constructed of mundane, unglamorous habits repeated when nobody is clapping.

Stop romanticizing what you could do. Measure what you ship today.`,
  },
  {
    id: 'seed-4',
    slug: 'stop-being-busy-start-being-productive',
    title: 'Stop Being Busy. Start Being Productive.',
    category: 'Strategy & Execution',
    readTime: '4 min',
    date: 'Jul 2026',
    createdAt: 1724500000000,
    excerpt: 'Activity is often an emotional coping mechanism for lack of strategic focus. High-leverage leaders ruthlessly eliminate vanity tasks.',
    takeaway: 'Efficiency is doing things right; effectiveness is doing the right things.',
    author: 'Dolapo Olutoye',
    tags: ['Productivity', 'Strategy', 'Cognitive Bandwidth'],
    content: `Busyness is the most socially acceptable form of laziness.

It allows you to finish an eleven-hour day feeling exhausted, yet without having moved the strategic needle by a single millimeter. You answered eighty emails, attended seven status meetings, reformatted a pitch deck, and engaged in Slack banter. You felt indispensable.

In reality, you hid from the hard cognitive work that actually determines survival.

### The Trap of High-Friction Vanity Work
Peter Drucker once wrote: *"There is nothing so useless as doing efficiently that which should not be done at all."*

High-leverage leadership requires asking three ruthless questions every Monday morning:
1. **What single outcome will make all other tasks easier or unnecessary?**
2. **Am I mistaking motion for progress?** (A rocking horse moves constantly, but goes nowhere.)
3. **What am I currently doing out of habit or fear of confrontation that can be delegated or terminated?**

### The Cognitive Bandwidth Audit
Your energy is finite. Protect your peak hours like an institutional vault. Say no to the good so you can deliver the decisive.`,
  },
];

const STORAGE_KEY = 'tdo_custom_blogs_v1';

export const getStoredBlogs = (): BlogPost[] => {
  if (typeof window === 'undefined') return SEED_BLOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_BLOGS;
    const custom: BlogPost[] = JSON.parse(raw);
    // Combine custom with seed (avoiding duplicate IDs)
    const seedIds = new Set(SEED_BLOGS.map(b => b.id));
    const uniqueCustom = custom.filter(b => !seedIds.has(b.id));
    const all = [...uniqueCustom, ...SEED_BLOGS];
    // Sort latest first (by createdAt or fallback date)
    return all.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (err) {
    console.error('Failed to parse stored blogs', err);
    return SEED_BLOGS;
  }
};

export const saveStoredBlog = (blog: Omit<BlogPost, 'id' | 'createdAt' | 'slug'> & { id?: string }): BlogPost => {
  const allCurrent = getStoredBlogs();
  const now = Date.now();
  const slug = blog.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newPost: BlogPost = {
    ...blog,
    id: blog.id || `custom-${now}`,
    slug: slug || `post-${now}`,
    createdAt: now,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const custom: BlogPost[] = raw ? JSON.parse(raw) : [];
    const updated = [newPost, ...custom.filter(b => b.id !== newPost.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time reactivity across components
    window.dispatchEvent(new CustomEvent('tdo_blogs_updated'));
  } catch (err) {
    console.error('Failed to save blog to localStorage', err);
  }

  return newPost;
};

export const deleteStoredBlog = (id: string): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const custom: BlogPost[] = JSON.parse(raw);
    const updated = custom.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('tdo_blogs_updated'));
  } catch (err) {
    console.error('Failed to delete blog from localStorage', err);
  }
};

export const exportBlogsJson = (): string => {
  const blogs = getStoredBlogs();
  return JSON.stringify(blogs, null, 2);
};
