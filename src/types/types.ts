export interface Artist {
  name: string;
  genres: string[];
  image: string;
  description: string;
  day?: string;
  time?: string;
  stage?: string;
  year?: number;
  youtubeVideo?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
} 