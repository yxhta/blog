export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export const authors: Record<string, Author> = {
  'john-doe': {
    id: 'john-doe',
    name: 'John Doe',
    bio: 'Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about React, TypeScript, and clean architecture.',
    avatar: '/avatars/john-doe.jpg',
    website: 'https://johndoe.dev',
    twitter: 'johndoe_dev',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
  'jane-smith': {
    id: 'jane-smith',
    name: 'Jane Smith',
    bio: 'Frontend specialist and UI/UX enthusiast. Loves creating beautiful, accessible web experiences with modern frameworks.',
    avatar: '/avatars/jane-smith.jpg',
    twitter: 'janesmith_ui',
    github: 'janesmith',
  },
};

export function getAuthor(authorName: string): Author | null {
  // Try to find by name first
  const authorByName = Object.values(authors).find(
    author => author.name.toLowerCase() === authorName.toLowerCase()
  );
  
  if (authorByName) {
    return authorByName;
  }
  
  // Try to find by ID
  const authorById = authors[authorName.toLowerCase().replace(/\s+/g, '-')];
  
  return authorById || null;
}