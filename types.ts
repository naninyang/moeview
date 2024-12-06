export interface JejeupData {
  pageCount: number;
  id: string;
  idx: number;
  subject: string;
  video: string;
  channelProfileImageUrl: string;
  comment: string;
  title: string;
  worst: boolean;
  isAmusements: boolean;
  amusements: string;
  createdAt: string;
  error: string;
  originalTitle: string;
  isPublish: boolean;
  isZip: boolean;
  jejeups: {
    id: string;
    idx: string;
    subject: string;
    video: string;
    channelProfileImageUrl: string;
    comment: string;
    title: string;
    worst: boolean;
    createdAt: string;
  };
  jejeupMetaData: {
    error: string;
    title: string;
    originalTitle: string;
    customUrl: string;
    thumbnailUrl: string;
    description: string;
    publishedAt?: string;
    channelProfileImageUrl?: string;
    channelTitle?: string;
    duration: string;
  };
  amusementData: {
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
    wavveSeries: any;
  };
}

export interface JejeupMetaData {
  error: string;
  title: string;
  originalTitle: string;
  customUrl: string;
  thumbnailUrl: string;
  description: string;
  ogSiteName?: string;
  twitterSite?: string;
  twitterCreator?: string;
  publishedAt?: string;
  ownerUrl?: string;
  channelProfileImageUrl?: string;
  channelTitle?: string;
  pressPublished?: string;
  pressAvatar?: string;
  duration: string;
}

export interface JejeupPermalinkData {
  amusementData: AmusementData[];
  attributes: {
    idx: string;
    subject: string;
    video: string;
    channelProfileImageUrl: string;
    comment: string;
    review: any;
    title: string;
    worst: boolean;
    amusements: string;
    relations: string;
    embeddingOff: boolean;
    createdAt: string;
    publishedAt: string;
  };
  jejeupMetaData: {
    error: string;
    title: string;
    originalTitle: string;
    customUrl: string;
    thumbnailUrl: string;
    description: string;
    ogSiteName?: string;
    twitterSite?: string;
    twitterCreator?: string;
    publishedAt?: string;
    channelProfileImageUrl?: string;
    channelTitle?: string;
    pressPublished?: string;
    pressAvatar?: string;
    duration: string;
    ownerUrl: string;
  };
}

export interface JejeupResponse {
  data: JejeupPermalinkData;
}

export interface ReviewData {
  id: string;
  idx: string;
  subject: string;
  video: string;
  channelProfileImageUrl: string;
  comment: string;
  review: any;
  title: string;
  worst: boolean;
  amusements: string;
  relations: string;
  embeddingOff: boolean;
  createdAt: string;
  publishedAt: string;
}

export interface AmusementData {
  id: string;
  idx: string;
  title: string;
  lang: string;
  titleKorean: string;
  titleOther: string;
  etc: string;
  release: string;
  original: string;
  originalAuthor: string;
  originTitle: string;
  rating: string;
  ratingCustom: string;
  country: string;
  category: string;
  isMobile: boolean;
  genre: string;
  anime: string;
  animeBroadcast1: string;
  animeBroadcast2: string;
  ott: string;
  ottAddr: string;
  broadcast: string;
  publisher: string;
  studio: string;
  distributor: string;
  director: string;
  creator: string;
  cast: string;
  dubbing: string;
  dubbingLang: string;
  characters: string;
  posterDefault: string;
  posterOther: string;
  relations: string;
  order: string;
  related: string;
  tags: any;
  supportLang: any;
  runningTime: number;
  comment: string;
  synopsys: string;
  bfree: any;
  series: number;
  season: string;
  franchise: string;
  relName: string;
  wavveSeries: any;
  amusementsCount: number;
  isPublish: boolean;
}

export interface AmusementPermalinkData {
  id: string;
  logoImage: string;
  attributes: {
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    ratingCustom: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    animeBroadcast1: string;
    animeBroadcast2: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    studio: string;
    distributor: string;
    director: string;
    creator: string;
    cast: string;
    characters: string;
    dubbing: string;
    dubbingLang: string;
    synopsys: string;
    posterDefault: string;
    posterOther: string;
    relations: string;
    related: string;
    tags: any;
    createdAt: string;
    supportLang: any;
    comment: string;
    runningTime: number;
    id: string;
    idx: string;
    order: string;
    bfree: any;
    series: number;
    season: string;
    franchise: string;
    relName: string;
    logoSize: string;
    wavveSeries: any;
    isPublish: boolean;
    amusementsCount: number;
  };
}

export interface JejeupAmusementData {
  data: {
    id: string;
    idx: string;
    title: string;
    lang: string;
    titleKorean: string;
    titleOther: string;
    etc: string;
    release: string;
    original: string;
    originalAuthor: string;
    originTitle: string;
    rating: string;
    country: string;
    category: string;
    isMobile: boolean;
    genre: string;
    anime: string;
    ott: string;
    ottAddr: string;
    broadcast: string;
    publisher: string;
    creator: string;
    cast: string;
    posterDefault: string;
    posterOther: string;
  };
  total: number;
}

export type Category =
  | 'ott_film'
  | 'ott_anime'
  | 'ott_drama'
  | 'ott_anime_film'
  | 'ott_documentary_film'
  | 'documentary_film'
  | 'anime_film'
  | 'game'
  | 'game_fan';

export type Platform =
  | 'amazonOriginal'
  | 'appleOriginal'
  | 'appleFilm'
  | 'disneyOriginal'
  | 'disneyStar'
  | 'netflixSeries'
  | 'netflixPresents'
  | 'netflixOriginal'
  | 'netflixFilm'
  | 'netflixAnime'
  | 'netflixAnimeFilm'
  | 'netflixDocumentary'
  | 'tvingOriginal'
  | 'tvingOnly'
  | 'watchaOriginal'
  | 'watchaExclusive'
  | 'wavveOriginal'
  | 'wavveOnly'
  | 'waveOnly'
  | 'waveFirstrun'
  | 'paramount';

export interface NoticeData {
  id: string;
  idx: string;
  platform: string;
  subject: string;
  description: string;
  created: string;
  pageCount: number;
}

export interface NoticePermalinkData {
  attributes: {
    idx: string;
    platform: string;
    subject: string;
    description: string;
    content: string;
    created: string;
    createdAt: string;
  };
}

export interface BannerData {
  id: number;
  link: string;
  description: string;
  author: string;
  title: string;
  color: string;
  order: number;
  isLight: boolean;
  type: string;
}

export interface RecommendData {
  id: number;
  idx: number;
  subject: string;
  description: string;
  isPublish: boolean;
}

export interface RecommendParmalinkData {
  id: number;
  attributes: {
    subject: string;
    description: string;
    chloe: any;
    gpt: any;
    fieldName: string;
    fieldValue: string;
    question: string;
    createdAt: string;
  };
}

export interface Counts {
  total: number;
  count: number;
  amusement: number;
}

export interface License {
  filename: string;
  content: string;
}
