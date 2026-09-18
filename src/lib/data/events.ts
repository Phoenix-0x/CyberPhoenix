import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const eventsDirectory = path.join(process.cwd(), 'src', 'content', 'events');

export interface EventResource {
  title: string;
  url: string;
  icon: string;
}

export interface EventMeta {
  slug: string;
  id?: string;
  title: string;
  tagline?: string;
  date: string;
  keywords: string[];
  status: 'concluded' | 'upcoming';
  tentative?: boolean;
  resources?: EventResource[];
}

export function getSortedEvents(): EventMeta[] {
  const fileNames = fs.readdirSync(eventsDirectory);
  const now = new Date();
  
  const allEventsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('_'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data } = matter(fileContents);
      
      const eventDate = new Date(data.date);
      eventDate.setHours(23, 59, 59, 999);
      
      const status: 'concluded' | 'upcoming' = eventDate < now ? 'concluded' : 'upcoming';

      return {
        slug,
        id: data.id || '',
        title: data.title || slug,
        tagline: data.tagline || '',
        date: data.date,
        keywords: data.keywords || [],
        status,
        tentative: data.tentative === true,
        resources: data.resources || []
      };
    });

  return allEventsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
