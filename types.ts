
export interface VideoIdea {
  title: string;
  description: string;
  hook: string;
  tags: string[];
  potential: 'Viral' | 'Niche' | 'Search-Focused';
}

export interface ScriptSection {
  time: string;
  part: string;
  content: string;
}

export interface AnalyticsData {
  name: string;
  views: number;
  subscribers: number;
  revenue: number;
}

export type CreatorTool = 'ideas' | 'scripts' | 'seo' | 'analytics';
