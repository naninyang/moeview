import { AmusementData, BannerData, JejeupData, NoticeData, RecommendData } from '@/types';
const isProduction = process.env.NODE_ENV === 'production';

export const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export const formatDateDetail = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export async function getRenew(page?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/moeview-videos?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=24`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupResponse = await response.json();
  const jejeupsData = jejeupResponse.data;
  const jejeupsRenew = jejeupsData[0].attributes.createdAt;
  return { renew: jejeupsRenew };
}

export async function getJejeupData(page?: number, pageSize?: number, type?: string, isType?: string) {
  let filterQuery = `${process.env.STRAPI_URL}/api/moeview-videos?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  if (isProduction) {
    if (isType === 'isBoth') {
      if (type === 'false') {
        filterQuery += '&filters[$and][0][$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$and][0][$or][1][isPublish]=true';
        filterQuery += `&filters[$and][1][$or][0][isZip]=false`;
        filterQuery += `&filters[$and][1][$or][1][isZip][$null]=true`;
        filterQuery += `&filters[$and][2][$or][0][isLive]=false`;
        filterQuery += `&filters[$and][2][$or][1][isLive][$null]=true`;
      }
    } else {
      if (type === 'false') {
        filterQuery += '&filters[$and][0][$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$and][0][$or][1][isPublish]=true';
        filterQuery += `&filters[$and][1][$or][0][${isType}]=false`;
        filterQuery += `&filters[$and][1][$or][1][${isType}][$null]=true`;
      } else if (type === 'true') {
        filterQuery += '&filters[$and][0][$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$and][0][$or][1][isPublish]=true';
        filterQuery += `&filters[$and][1][${isType}]=true`;
      }
    }
  } else {
    if (isType === 'isBoth') {
      if (type === 'false') {
        filterQuery += `&filters[$and][0][$or][0][isZip]=false`;
        filterQuery += `&filters[$and][0][$or][1][isZip][$null]=true`;
        filterQuery += `&filters[$and][1][$or][0][isLive]=false`;
        filterQuery += `&filters[$and][1][$or][1][isLive][$null]=true`;
      }
    } else {
      if (type === 'false') {
        filterQuery += `&filters[$or][0][${isType}]=false`;
        filterQuery += `&filters[$or][1][${isType}][$null]=true`;
      } else if (type === 'true') {
        filterQuery += `&filters[${isType}]=true`;
      }
    }
  }
  const response = await fetch(filterQuery, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const jejeupResponse = await response.json();
  const jejeupsData = jejeupResponse.data;
  const rowsData: JejeupData[] = jejeupsData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    createdAt: data.attributes.createdAt,
    subject: data.attributes.subject,
    video: data.attributes.video,
    channelProfileImageUrl: data.attributes.channelProfileImageUrl,
    comment: data.attributes.comment,
    title: data.attributes.title,
    worst: data.attributes.worst,
    isAmusements: data.attributes.isAmusements,
    amusements: data.attributes.amusements,
    embeddingOff: data.attributes.embeddingOff,
    isPublish: data.attributes.isPublish,
    isZip: data.attributes.isZip,
    isLive: data.attributes.isLive,
  }));
  const pageCount = jejeupResponse.meta.pagination.pageCount;
  const jejeups = await Promise.all(
    rowsData.map(async (preview) => {
      const amusementData = await getAmusementData(preview.title);
      const reviewData = await fetchMetadata(preview.video);
      return {
        ...preview,
        amusementData,
        reviewData,
      };
    }),
  );
  return { jejeups, pageCount: pageCount };
}

export async function getCategoryData(page?: number, pageSize?: number, categoryName?: string) {
  if (
    categoryName === 'ott_drama' ||
    categoryName === 'ott_film' ||
    categoryName === 'ott_anime' ||
    categoryName === 'ott_anime_film' ||
    categoryName === 'ott_documentary' ||
    categoryName === 'ott_documentary_film'
  ) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[ott][$null]=false`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const categoryResponse = await response.json();
    const categoryResponseData = categoryResponse.data;
    const data: AmusementData = categoryResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = categoryResponse.meta.pagination.pageCount;
    const total = categoryResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[category][$contains]=${categoryName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const categoryResponse = await response.json();
    const categoryResponseData = categoryResponse.data;
    const data: AmusementData = categoryResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      relations: data.attributes.relations,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = categoryResponse.meta.pagination.pageCount;
    const total = categoryResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getTagData(page?: number, pageSize?: number, tagName?: string, categoryName?: string) {
  if (categoryName) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][tags][$contains]=${tagName}&filters[$and][1][tags][$contains]=${categoryName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][tags][$contains]=${tagName}&filters[$and][1][tags][$not][$contains]=game`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const tagResponse = await response.json();
    const tagResponseData = tagResponse.data;
    const data: AmusementData = tagResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = tagResponse.meta.pagination.pageCount;
    const total = tagResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getPlatformData(page?: number, pageSize?: number, platformName?: string) {
  if (
    platformName === 'KBS2' ||
    platformName === 'MBC' ||
    platformName === 'SBS' ||
    platformName === 'tvN' ||
    platformName === 'OCN' ||
    platformName === 'JTBC' ||
    platformName === 'ENA' ||
    platformName === 'ABC'
  ) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[broadcast][$eq]=${platformName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const platformResponse = await response.json();
    const platformResponseData = platformResponse.data;
    const data: AmusementData = platformResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = platformResponse.meta.pagination.pageCount;
    const total = platformResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (
    platformName === 'tokyomx' ||
    platformName === 'tvtokyo' ||
    platformName === 'fujitv' ||
    platformName === 'mbs' ||
    platformName === 'tbs' ||
    platformName === 'atx' ||
    platformName === 'nippontv' ||
    platformName === 'wowow'
  ) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[animeBroadcast1][$eq]=${platformName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const platformResponse = await response.json();
    const platformResponseData = platformResponse.data;
    const data: AmusementData = platformResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = platformResponse.meta.pagination.pageCount;
    const total = platformResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (
    platformName === 'aniplus' ||
    platformName === 'daewon' ||
    platformName === 'anibox' ||
    platformName === 'tooniverse' ||
    platformName === 'animax'
  ) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[animeBroadcast2][$eq]=${platformName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const platformResponse = await response.json();
    const platformResponseData = platformResponse.data;
    const data: AmusementData = platformResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = platformResponse.meta.pagination.pageCount;
    const total = platformResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (
    platformName === 'amazon' ||
    platformName === 'apple' ||
    platformName === 'disney' ||
    platformName === 'netflix' ||
    platformName === 'tving' ||
    platformName === 'watcha' ||
    platformName === 'wavve' ||
    platformName === 'paramount'
  ) {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[ott][$contains]=${platformName}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const platformResponse = await response.json();
    const platformResponseData = platformResponse.data;
    const data: AmusementData = platformResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = platformResponse.meta.pagination.pageCount;
    const total = platformResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else if (platformName === 'wave') {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][ott][$contains]=${platformName}&filters[$and][1][category][$contains]=drama`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const platformResponse = await response.json();
    const platformResponseData = platformResponse.data;
    const data: AmusementData = platformResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = platformResponse.meta.pagination.pageCount;
    const total = platformResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getHangukData(page?: number, pageSize?: number, hangukName?: string, categoryName?: string) {
  if (hangukName !== 'anything') {
    if (categoryName) {
      let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=${hangukName}&filters[$and][1][category][$contains]=game`;
      if (isProduction) {
        filterQuery += '&filters[$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$or][1][isPublish]=true';
      }
      const response = await fetch(filterQuery, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      const hangukResponse = await response.json();
      const hangukResponseData = hangukResponse.data;
      const data: AmusementData = hangukResponseData.map((data: any) => ({
        id: `${data.id}`,
        idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
        title: data.attributes.title,
        lang: data.attributes.lang,
        titleKorean: data.attributes.titleKorean,
        titleOther: data.attributes.titleOther,
        etc: data.attributes.etc,
        release: data.attributes.release,
        original: data.attributes.original,
        originalAuthor: data.attributes.originalAuthor,
        originTitle: data.attributes.originTitle,
        rating: data.attributes.rating,
        country: data.attributes.country,
        category: data.attributes.category,
        isMobile: data.attributes.isMobile,
        genre: data.attributes.genre,
        anime: data.attributes.anime,
        animeBroadcast1: data.attributes.animeBroadcast1,
        animeBroadcast2: data.attributes.animeBroadcast2,
        ott: data.attributes.ott,
        broadcast: data.attributes.broadcast,
        publisher: data.attributes.publisher,
        creator: data.attributes.creator,
        cast: data.attributes.cast,
        posterDefault: data.attributes.posterDefault,
        posterOther: data.attributes.posterOther,
        supportLang: data.attributes.supportLang,
        wavveSeries: data.attributes.wavveSeries,
        isPublish: data.attributes.isPublish,
      }));
      const pageCount = hangukResponse.meta.pagination.pageCount;
      const total = hangukResponse.meta.pagination.total;
      return { data, pageCount: pageCount, total: total };
    } else {
      let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=${hangukName}&filters[$and][1][category][$notContains]=game`;
      if (isProduction) {
        filterQuery += '&filters[$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$or][1][isPublish]=true';
      }
      const response = await fetch(filterQuery, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      const hangukResponse = await response.json();
      const hangukResponseData = hangukResponse.data;
      const data: AmusementData = hangukResponseData.map((data: any) => ({
        id: `${data.id}`,
        idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
        title: data.attributes.title,
        lang: data.attributes.lang,
        titleKorean: data.attributes.titleKorean,
        titleOther: data.attributes.titleOther,
        etc: data.attributes.etc,
        release: data.attributes.release,
        original: data.attributes.original,
        originalAuthor: data.attributes.originalAuthor,
        originTitle: data.attributes.originTitle,
        rating: data.attributes.rating,
        country: data.attributes.country,
        category: data.attributes.category,
        isMobile: data.attributes.isMobile,
        genre: data.attributes.genre,
        anime: data.attributes.anime,
        animeBroadcast1: data.attributes.animeBroadcast1,
        animeBroadcast2: data.attributes.animeBroadcast2,
        ott: data.attributes.ott,
        broadcast: data.attributes.broadcast,
        publisher: data.attributes.publisher,
        creator: data.attributes.creator,
        cast: data.attributes.cast,
        posterDefault: data.attributes.posterDefault,
        posterOther: data.attributes.posterOther,
        supportLang: data.attributes.supportLang,
        wavveSeries: data.attributes.wavveSeries,
        isPublish: data.attributes.isPublish,
      }));
      const pageCount = hangukResponse.meta.pagination.pageCount;
      const total = hangukResponse.meta.pagination.total;
      return { data, pageCount: pageCount, total: total };
    }
  } else {
    if (categoryName) {
      let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$null]=false&filters[$and][1][category][$contains]=game`;
      if (isProduction) {
        filterQuery += '&filters[$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$or][1][isPublish]=true';
      }
      const response = await fetch(filterQuery, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      const hangukResponse = await response.json();
      const hangukResponseData = hangukResponse.data;
      const data: AmusementData = hangukResponseData.map((data: any) => ({
        id: `${data.id}`,
        idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
        title: data.attributes.title,
        lang: data.attributes.lang,
        titleKorean: data.attributes.titleKorean,
        titleOther: data.attributes.titleOther,
        etc: data.attributes.etc,
        release: data.attributes.release,
        original: data.attributes.original,
        originalAuthor: data.attributes.originalAuthor,
        originTitle: data.attributes.originTitle,
        rating: data.attributes.rating,
        country: data.attributes.country,
        category: data.attributes.category,
        isMobile: data.attributes.isMobile,
        genre: data.attributes.genre,
        anime: data.attributes.anime,
        animeBroadcast1: data.attributes.animeBroadcast1,
        animeBroadcast2: data.attributes.animeBroadcast2,
        ott: data.attributes.ott,
        broadcast: data.attributes.broadcast,
        publisher: data.attributes.publisher,
        creator: data.attributes.creator,
        cast: data.attributes.cast,
        posterDefault: data.attributes.posterDefault,
        posterOther: data.attributes.posterOther,
        supportLang: data.attributes.supportLang,
        wavveSeries: data.attributes.wavveSeries,
        isPublish: data.attributes.isPublish,
      }));
      const pageCount = hangukResponse.meta.pagination.pageCount;
      const total = hangukResponse.meta.pagination.total;
      return { data, pageCount: pageCount, total: total };
    } else {
      let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[supportLang][$null]=false&filters[$and][1][category][$notContains]=game`;
      if (isProduction) {
        filterQuery += '&filters[$or][0][isPublish][$null]=true';
        filterQuery += '&filters[$or][1][isPublish]=true';
      }
      const response = await fetch(filterQuery, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      const hangukResponse = await response.json();
      const hangukResponseData = hangukResponse.data;
      const data: AmusementData = hangukResponseData.map((data: any) => ({
        id: `${data.id}`,
        idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
        title: data.attributes.title,
        lang: data.attributes.lang,
        titleKorean: data.attributes.titleKorean,
        titleOther: data.attributes.titleOther,
        etc: data.attributes.etc,
        release: data.attributes.release,
        original: data.attributes.original,
        originalAuthor: data.attributes.originalAuthor,
        originTitle: data.attributes.originTitle,
        rating: data.attributes.rating,
        country: data.attributes.country,
        category: data.attributes.category,
        isMobile: data.attributes.isMobile,
        genre: data.attributes.genre,
        anime: data.attributes.anime,
        animeBroadcast1: data.attributes.animeBroadcast1,
        animeBroadcast2: data.attributes.animeBroadcast2,
        ott: data.attributes.ott,
        broadcast: data.attributes.broadcast,
        publisher: data.attributes.publisher,
        creator: data.attributes.creator,
        cast: data.attributes.cast,
        posterDefault: data.attributes.posterDefault,
        posterOther: data.attributes.posterOther,
        supportLang: data.attributes.supportLang,
        wavveSeries: data.attributes.wavveSeries,
        isPublish: data.attributes.isPublish,
      }));
      const pageCount = hangukResponse.meta.pagination.pageCount;
      const total = hangukResponse.meta.pagination.total;
      return { data, pageCount: pageCount, total: total };
    }
  }
}

export async function getSubdubData(page?: number, pageSize?: number, subdubName?: string) {
  if (subdubName !== 'both') {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=${subdubName}&filters[$and][1][category][$notContains]=game`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const hangukResponse = await response.json();
    const hangukResponseData = hangukResponse.data;
    const data: AmusementData = hangukResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = hangukResponse.meta.pagination.pageCount;
    const total = hangukResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=subtitle&filters[$and][1][supportLang][$contains]=dubbing&filters[$and][2][category][$notContains]=game`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const hangukResponse = await response.json();
    const hangukResponseData = hangukResponse.data;
    const data: AmusementData = hangukResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = hangukResponse.meta.pagination.pageCount;
    const total = hangukResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getBarrierFreeData(page?: number, pageSize?: number, bfreeName?: string) {
  if (bfreeName !== 'bfree') {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=${bfreeName}&filters[$and][1][category][$notContains]=game`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const hangukResponse = await response.json();
    const hangukResponseData = hangukResponse.data;
    const data: AmusementData = hangukResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = hangukResponse.meta.pagination.pageCount;
    const total = hangukResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  } else {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$and][0][supportLang][$contains]=cc&filters[$and][1][supportLang][$contains]=description&filters[$and][2][category][$notContains]=game`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const hangukResponse = await response.json();
    const hangukResponseData = hangukResponse.data;
    const data: AmusementData = hangukResponseData.map((data: any) => ({
      id: `${data.id}`,
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      supportLang: data.attributes.supportLang,
      wavveSeries: data.attributes.wavveSeries,
      isPublish: data.attributes.isPublish,
    }));
    const pageCount = hangukResponse.meta.pagination.pageCount;
    const total = hangukResponse.meta.pagination.total;
    return { data, pageCount: pageCount, total: total };
  }
}

export async function getLiteratureData(page?: number, pageSize?: number, amuseId?: number, type?: string) {
  let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[${type}][$eq]=${amuseId}`;
  if (isProduction) {
    filterQuery += '&filters[$or][0][isPublish][$null]=true';
    filterQuery += '&filters[$or][1][isPublish]=true';
  }
  const response = await fetch(filterQuery, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const platformResponse = await response.json();
  const platformResponseData = platformResponse.data;
  const data: AmusementData = platformResponseData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    lang: data.attributes.lang,
    titleKorean: data.attributes.titleKorean,
    titleOther: data.attributes.titleOther,
    etc: data.attributes.etc,
    release: data.attributes.release,
    original: data.attributes.original,
    originalAuthor: data.attributes.originalAuthor,
    originTitle: data.attributes.originTitle,
    rating: data.attributes.rating,
    country: data.attributes.country,
    category: data.attributes.category,
    isMobile: data.attributes.isMobile,
    genre: data.attributes.genre,
    anime: data.attributes.anime,
    animeBroadcast1: data.attributes.animeBroadcast1,
    animeBroadcast2: data.attributes.animeBroadcast2,
    ott: data.attributes.ott,
    broadcast: data.attributes.broadcast,
    publisher: data.attributes.publisher,
    creator: data.attributes.creator,
    cast: data.attributes.cast,
    posterDefault: data.attributes.posterDefault,
    posterOther: data.attributes.posterOther,
    order: data.attributes.order,
    wavveSeries: data.attributes.wavveSeries,
    isPublish: data.attributes.isPublish,
  }));
  const pageCount = platformResponse.meta.pagination.pageCount;
  const total = platformResponse.meta.pagination.total;
  return { data, pageCount: pageCount, total: total };
}

export async function getRenewAmusement(page?: number, pageSize?: number, amusementId?: string) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/moeview-videos?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[title][$eq]=${amusementId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const jejeupAmusementResponse = await response.json();
  const jejeupAmusementData = jejeupAmusementResponse.data;
  const jejeupAmusementRenew = jejeupAmusementData;
  return { renew: jejeupAmusementRenew };
}

export async function getJejeupAmusementData(page?: number, pageSize?: number, amusementId?: string) {
  const amusementNumber = `'${amusementId}'`;
  let filterQuery = `${process.env.STRAPI_URL}/api/moeview-videos?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[amusements][$contains]=${amusementNumber}`;
  if (isProduction) {
    filterQuery += '&filters[$or][0][isPublish][$null]=true';
    filterQuery += '&filters[$or][1][isPublish]=true';
  }
  const response = await fetch(filterQuery, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const jejeupAmusementResponse = await response.json();
  const jejeupAmusementData = jejeupAmusementResponse.data;
  const rowsData: JejeupData[] = jejeupAmusementData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    createdAt: data.attributes.createdAt,
    subject: data.attributes.subject,
    video: data.attributes.video,
    channelProfileImageUrl: data.attributes.channelProfileImageUrl,
    comment: data.attributes.comment,
    title: data.attributes.title,
    worst: data.attributes.worst,
    embeddingOff: data.attributes.embeddingOff,
    isPublish: data.attributes.isPublish,
    isZip: data.attributes.isZip,
  }));
  const pageCount = jejeupAmusementResponse.meta.pagination.pageCount;
  const jejeups = await Promise.all(
    rowsData.map(async (preview) => {
      const amusementData = await getAmusementData(preview.title);
      return {
        ...preview,
        amusementData,
      };
    }),
  );
  return { jejeups, pageCount: pageCount };
}

export async function getBannerData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/banner-semoviews?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const bannerResponse = await response.json();
  const bannerData = bannerResponse.data;
  const banners: BannerData[] = bannerData.map((data: any) => ({
    id: data.id,
    link: data.attributes.link,
    description: data.attributes.description,
    author: data.attributes.author,
    title: data.attributes.title,
    color: data.attributes.color,
    order: data.attributes.order,
    isLight: data.attributes.isLight,
    type: data.attributes.type,
  }));

  return banners;
}

export async function getNoticeData(page?: number, pageSize?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/notice-nol2trs?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[platform][$eq]=jejeup`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const noticeResponse = await response.json();
  const noticesData = noticeResponse.data;
  const notices: NoticeData[] = noticesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    platform: data.attributes.platform,
    subject: data.attributes.subject,
    description: data.attributes.description,
    created: data.attributes.created,
  }));
  const pageCount = noticeResponse.meta.pagination.pageCount;
  return { notices, pageCount: pageCount };
}

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_NEW_API_URL}?videoId=${encodeURIComponent(url)}`);
    const previewResponse = await response.json();
    return previewResponse;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

export async function fetchMetaItemdata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_OLD_API_URL}?videoId=${encodeURIComponent(url)}`);
    const previewResponse = await response.json();
    return previewResponse;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

export async function getAmusementData(amusement: string) {
  const response = await fetch(`${process.env.STRAPI_URL}/api/amusement-jejeups/${amusement}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const amusementResponse = await response.json();
  const amusementData = amusementResponse.data;
  const rowsData: AmusementData = {
    id: `${amusementData.id}`,
    idx: `${formatDate(amusementData.attributes.createdAt)}${amusementData.id}`,
    title: amusementData.attributes.title,
    lang: amusementData.attributes.lang,
    titleKorean: amusementData.attributes.titleKorean,
    titleOther: amusementData.attributes.titleOther,
    etc: amusementData.attributes.etc,
    release: amusementData.attributes.release,
    original: amusementData.attributes.original,
    originalAuthor: amusementData.attributes.originalAuthor,
    originTitle: amusementData.attributes.originTitle,
    rating: amusementData.attributes.rating,
    ratingCustom: amusementData.attributes.ratingCustom,
    country: amusementData.attributes.country,
    category: amusementData.attributes.category,
    isMobile: amusementData.attributes.isMobile,
    genre: amusementData.attributes.genre,
    anime: amusementData.attributes.anime,
    dubbingLang: amusementData.attributes.dubbingLang,
    animeBroadcast1: amusementData.attributes.animeBroadcast1,
    animeBroadcast2: amusementData.attributes.animeBroadcast2,
    ott: amusementData.attributes.ott,
    ottAddr: amusementData.attributes.ottAddr,
    broadcast: amusementData.attributes.broadcast,
    studio: amusementData.attributes.studio,
    distributor: amusementData.attributes.distributor,
    publisher: amusementData.attributes.publisher,
    creator: amusementData.attributes.creator,
    director: amusementData.attributes.director,
    cast: amusementData.attributes.cast,
    dubbing: amusementData.attributes.dubbing,
    characters: amusementData.attributes.characters,
    posterDefault: amusementData.attributes.posterDefault,
    posterOther: amusementData.attributes.posterOther,
    relations: amusementData.attributes.relations,
    order: amusementData.attributes.order,
    related: amusementData.attributes.related,
    tags: amusementData.attributes.tags,
    supportLang: amusementData.attributes.supportLang,
    runningTime: amusementData.attributes.runningTime,
    comment: amusementData.attributes.comment,
    synopsys: amusementData.attributes.synopsys,
    bfree: amusementData.attributes.bfree,
    series: amusementData.attributes.series,
    season: amusementData.attributes.season,
    franchise: amusementData.attributes.franchise,
    relName: amusementData.attributes.relName,
    wavveSeries: amusementData.attributes.wavveSeries,
    isPublish: amusementData.attributes.isPublish,
    amusementsCount: 0,
  };

  return rowsData;
}

export async function getRelationsData(relations: string, type: string) {
  if (type === 'jejeup') {
    const response = await fetch(
      `${process.env.STRAPI_URL}/api/moeview-videos/?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[relations][$contains]=${relations}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    const relationsResponse = await response.json();
    const relationsData = relationsResponse.data;
    const rowsData: JejeupData[] = relationsData.map((data: any) => ({
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      createdAt: data.attributes.createdAt,
      subject: data.attributes.subject,
      video: data.attributes.video,
      channelProfileImageUrl: data.attributes.channelProfileImageUrl,
      comment: data.attributes.comment,
      title: data.attributes.title,
      relations: data.attributes.relations,
    }));

    return rowsData;
  } else {
    let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups/?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[relations][$contains]=${relations}`;
    if (isProduction) {
      filterQuery += '&filters[$or][0][isPublish][$null]=true';
      filterQuery += '&filters[$or][1][isPublish]=true';
    }
    const response = await fetch(filterQuery, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const relationsResponse = await response.json();
    const relationsData = relationsResponse.data;
    const rowsData: AmusementData[] = relationsData.map((data: any) => ({
      idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
      title: data.attributes.title,
      lang: data.attributes.lang,
      titleKorean: data.attributes.titleKorean,
      titleOther: data.attributes.titleOther,
      etc: data.attributes.etc,
      release: data.attributes.release,
      original: data.attributes.original,
      originalAuthor: data.attributes.originalAuthor,
      originTitle: data.attributes.originTitle,
      rating: data.attributes.rating,
      ratingCustom: data.attributes.ratingCustom,
      country: data.attributes.country,
      category: data.attributes.category,
      isMobile: data.attributes.isMobile,
      genre: data.attributes.genre,
      anime: data.attributes.anime,
      animeBroadcast1: data.attributes.animeBroadcast1,
      animeBroadcast2: data.attributes.animeBroadcast2,
      ott: data.attributes.ott,
      ottAddr: data.attributes.ottAddr,
      broadcast: data.attributes.broadcast,
      publisher: data.attributes.publisher,
      creator: data.attributes.creator,
      cast: data.attributes.cast,
      posterDefault: data.attributes.posterDefault,
      posterOther: data.attributes.posterOther,
      relations: data.attributes.relations,
      order: data.attributes.order,
      isPublish: data.attributes.isPublish,
    }));

    return rowsData;
  }
}

export async function getSeasonData(season: string) {
  let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups/?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[season][$contains]=${season}`;
  if (isProduction) {
    filterQuery += '&filters[$or][0][isPublish][$null]=true';
    filterQuery += '&filters[$or][1][isPublish]=true';
  }
  const response = await fetch(filterQuery, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const seasonResponse = await response.json();
  const seasonData = seasonResponse.data;
  const rowsData: AmusementData[] = seasonData.map((data: any) => ({
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    lang: data.attributes.lang,
    titleKorean: data.attributes.titleKorean,
    titleOther: data.attributes.titleOther,
    etc: data.attributes.etc,
    release: data.attributes.release,
    original: data.attributes.original,
    originalAuthor: data.attributes.originalAuthor,
    originTitle: data.attributes.originTitle,
    rating: data.attributes.rating,
    ratingCustom: data.attributes.ratingCustom,
    country: data.attributes.country,
    category: data.attributes.category,
    isMobile: data.attributes.isMobile,
    genre: data.attributes.genre,
    anime: data.attributes.anime,
    animeBroadcast1: data.attributes.animeBroadcast1,
    animeBroadcast2: data.attributes.animeBroadcast2,
    ott: data.attributes.ott,
    ottAddr: data.attributes.ottAddr,
    broadcast: data.attributes.broadcast,
    publisher: data.attributes.publisher,
    creator: data.attributes.creator,
    cast: data.attributes.cast,
    posterDefault: data.attributes.posterDefault,
    posterOther: data.attributes.posterOther,
    season: data.attributes.season,
    order: data.attributes.order,
    relName: data.attributes.relName,
    isPublish: data.attributes.isPublish,
  }));

  return rowsData;
}

export async function getRecommendData(page?: number, pageSize?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/ai-semoviews?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const recommendResponse = await response.json();
  const recommendResponseData = recommendResponse.data;
  const data: RecommendData = recommendResponseData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    subject: data.attributes.subject,
    description: data.attributes.description,
    isPublish: data.attributes.isPublish,
  }));
  const pageCount = recommendResponse.meta.pagination.pageCount;
  const total = recommendResponse.meta.pagination.total;
  return { data, pageCount: pageCount, total: total };
}

export async function getWorksData(page?: number, pageSize?: number) {
  let filterQuery = `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  if (isProduction) {
    filterQuery += '&filters[$or][0][isPublish][$null]=true';
    filterQuery += '&filters[$or][1][isPublish]=true';
  }
  const response = await fetch(filterQuery, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const workResponse = await response.json();
  const workResponseData = workResponse.data;
  const data: any = workResponseData.map((data: any) => ({
    id: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    lang: data.attributes.lang,
    titleKorean: data.attributes.titleKorean,
    titleOther: data.attributes.titleOther,
    etc: data.attributes.etc,
    release: data.attributes.release,
    original: data.attributes.original,
    originalAuthor: data.attributes.originalAuthor,
    originTitle: data.attributes.originTitle,
    rating: data.attributes.rating,
    country: data.attributes.country,
    category: data.attributes.category,
    isMobile: data.attributes.isMobile,
    genre: data.attributes.genre,
    anime: data.attributes.anime,
    animeBroadcast1: data.attributes.animeBroadcast1,
    animeBroadcast2: data.attributes.animeBroadcast2,
    ott: data.attributes.ott,
    broadcast: data.attributes.broadcast,
    publisher: data.attributes.publisher,
    creator: data.attributes.creator,
    cast: data.attributes.cast,
    posterDefault: data.attributes.posterDefault,
    posterOther: data.attributes.posterOther,
    supportLang: data.attributes.supportLang,
    wavveSeries: data.attributes.wavveSeries,
    related: data.attributes.related,
    isPublish: data.attributes.isPublish,
  }));
  const pageCount = workResponse.meta.pagination.pageCount;
  const total = workResponse.meta.pagination.total;
  return { data, pageCount: pageCount, total: total };
}
