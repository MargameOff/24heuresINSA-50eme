import type { 
  FetchConfig, 
  StrapiResponse, 
  Artiste, 
  Edition, 
  Scene 
} from '@/types/strapi';

export async function fetchAPI<T>({ url, ...config }: FetchConfig): Promise<T> {
  const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  if (!apiURL) throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
  if (!token) throw new Error('NEXT_PUBLIC_STRAPI_TOKEN is not defined');

  const mergedConfig = {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...config.headers,
    },
  };

  const response = await fetch(`${apiURL}/api${url}`, mergedConfig);

  if (!response.ok) {
    throw new Error(`An error occurred while fetching the data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Récupérer tous les artistes
export async function getArtistes() {
  return fetchAPI<StrapiResponse<Artiste>>({
    url: '/artistes?populate[0]=image&populate[1]=passage&populate[2]=passage.edition&populate[3]=passage.scene&populate[4]=reseauxSociaux&sort[0]=rank:asc',
    method: 'GET',
  });
}

// Récupérer uniquement les artistes publiés avec une date de publication
export async function getArtistesPublies() {
  const response = await fetchAPI<StrapiResponse<Artiste>>({
    url: '/artistes?populate[0]=image&populate[1]=passage&populate[2]=passage.edition&populate[3]=passage.scene&populate[4]=reseauxSociaux&sort[0]=rank:asc&filters[publishedAt][$notNull]=true',
    method: 'GET',
  });
  const now = new Date();

  return {
    data: response.data.filter(artiste => {
      if (!artiste.dateDePublication) return false;
      const datePublication = new Date(artiste.dateDePublication);
      return datePublication <= now;
    })
  };
}

// Récupérer un artiste par son ID
export async function getArtisteById(id: string) {
  return fetchAPI<{ data: Artiste }>({
    url: `/artistes/${id}?populate[0]=image&populate[1]=passage&populate[2]=passage.edition&populate[3]=passage.scene&populate[4]=reseauxSociaux`,
    method: 'GET',
  });
}

// Récupérer les genres musicaux
export async function getGenresMusicaux() {
  return fetchAPI<any>({
    url: '/genres-musicaux',
    method: 'GET',
  });
}

// Récupérer les éditions
export async function getEditions() {
  return fetchAPI<StrapiResponse<Edition>>({
    url: '/editions?sort[0]=annee:desc',
    method: 'GET',
  });
}

// Récupérer les scènes
export async function getScenes() {
  return fetchAPI<StrapiResponse<Scene>>({
    url: '/scenes?sort[0]=nom:asc',
    method: 'GET',
  });
} 