export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface Image {
  id: number;
  name: string;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  url: string;
}

export interface ReseauxSociaux {
  id: number;
  instagram: string | null;
  youtube: string | null;
  spotify: string | null;
}

export interface Passage {
  scene: string;
  jour: string;
  horaire: string;
  duree: number;
  edition: {
    id: number;
    nom: string;
    annee: number;
  };
}

export interface Artiste {
  id: number;
  nom: string;
  description: string;
  videoYoutube: string | null;
  dateDePublication: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  passage: Passage | null;
  reseauxSociaux: ReseauxSociaux | null;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FetchConfig extends RequestInit {
  url: string;
} 