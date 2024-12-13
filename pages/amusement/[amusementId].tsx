import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { isSafari, isDesktop } from 'react-device-detect';
import styled from '@emotion/styled';
import { AmusementData, AmusementPermalinkData, Category, MoeviewData, MoeviewMetaData } from '@/types';
import { formatDateDetail } from '@/lib/apis';
import Seo, { originTitle } from '@/components/Seo';
import { CategoryName } from '@/components/CategoryName';
import { TagCategoryName } from '@/components/TagCategory';
import { TagName } from '@/components/TagName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { OriginalName } from '@/components/OriginalName';
import { SupportLang } from '@/components/SupportLang';
import { formatDate } from '@/components/FormatDate';
import { formatDuration } from '@/components/FormatDuration';
import Anchor from '@/components/Anchor';
import Related from '@/components/Related';
import YouTubeController from '@/components/YouTubeController';
import AmusementDetail from '@/components/AmusementDetail';
import { formatTime } from '@/components/FormatTime';
import header from '@/styles/Header.module.sass';
import footer from '@/styles/Footer.module.sass';
import styles from '@/styles/Amusement.module.sass';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  ADiconWhite,
  AbcWhite,
  AmazonOriginalWhite,
  AmazonWhite,
  AniboxWhite,
  AnimaxWhite,
  AniplusWhite,
  AppleOriginalWhite,
  AppleWhite,
  AtxWhite,
  BackButtonLight,
  BbcWhite,
  CCiconWhite,
  ClipboardIconLight,
  DaewonWhite,
  DisneyOriginalWhite,
  DisneyWhite,
  DownIcon,
  EnaWhite,
  FujitvWhite,
  HbomaxWhite,
  HuluWhite,
  JtbcWhite,
  Kbs2tvWhite,
  MbcWhite,
  MbsWhite,
  NetflixOriginalWhite,
  NetflixWhite,
  NippontvWhite,
  OcnWhite,
  ParamountWhite,
  PeacockWhite,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  SbsWhite,
  SeriesWhite,
  SkyWhite,
  StarOriginalWhite,
  SyfyWhite,
  TbsWhite,
  TokyomxWhite,
  TooniverseWhite,
  TvingOnlyWhite,
  TvingOriginalWhite,
  TvingWhite,
  TvnWhite,
  TvtokyoWhite,
  WatchaOnlyWhite,
  WatchaOriginalWhite,
  WatchaWhite,
  WavveFirstrunWhite,
  WavveOnlyWhite,
  WavveOriginalWhite,
  WavveWhite,
  WowowWhite,
} from '@/components/Icons';
import { VectorsExternal, VectorsMore } from '@/components/vectors';

const rem = (px: number): string => `${px / 16}rem`;

const MoreIcon = styled.i({
  background: `url(${VectorsMore.src}) no-repeat 50% 50%/contain`,
});

const ExternalIcon = styled.i({
  background: `url(${VectorsExternal.src}) no-repeat 50% 50%/contain`,
});

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: `(max-width: ${rem(767)})` });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

export function useExtraSmall() {
  const [isExtraSmall, setIsExtraSmall] = useState(false);
  const extraSmall = useMediaQuery({ query: `(max-width: ${rem(575)})` });
  useEffect(() => {
    setIsExtraSmall(extraSmall);
  }, [extraSmall]);
  return isExtraSmall;
}

export function useMedium() {
  const [isMedium, setIsMedium] = useState(false);
  const medium = useMediaQuery({ query: `(min-width: ${rem(576)}) and (max-width: ${rem(991)})` });
  useEffect(() => {
    setIsMedium(medium);
  }, [medium]);
  return isMedium;
}

export function useLarge() {
  const [isLarge, setIsLarge] = useState(false);
  const large = useMediaQuery({ query: `(min-width: ${rem(992)}) and (max-width: ${rem(1199)})` });
  useEffect(() => {
    setIsLarge(large);
  }, [large]);
  return isLarge;
}

export function useMaxLarge() {
  const [isMaxLarge, setIsMaxLarge] = useState(false);
  const maxLarge = useMediaQuery({ query: `(min-width: ${rem(1200)})` });
  useEffect(() => {
    setIsMaxLarge(maxLarge);
  }, [maxLarge]);
  return isMaxLarge;
}

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export function MoeviewMeta({ moeview }: { moeview: any }) {
  const [moeviewMetaData, setMoeviewMetaData] = useState<MoeviewMetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isExtraSmall = useExtraSmall();
  const maxRetries = 2;

  const fetchMetadata = async (currentRetryCount = 0) => {
    try {
      const moeviewMeta = await fetch(`/api/metadata?url=${moeview.video}`);
      const moeviewMetaDataResponse = await moeviewMeta.json();
      if (
        Array.isArray(moeviewMetaDataResponse) === false &&
        Object.keys(moeviewMetaDataResponse).length === 0 &&
        moeviewMetaDataResponse.duration === undefined &&
        currentRetryCount < maxRetries
      ) {
        setTimeout(() => fetchMetadata(currentRetryCount + 1), 5000);
      } else {
        setMoeviewMetaData(moeviewMetaDataResponse);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRetry = () => {
    setMoeviewMetaData(null);
    setIsLoading(true);
    fetchMetadata().finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMetadata().finally(() => setIsLoading(false));
  }, []);

  const handleReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const moeviewVideo = event.currentTarget.getAttribute('data-video');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moeviewVideo: moeviewVideo }),
      });

      if (response.ok) {
        alert('제보 성공! 감사합니다 ☺️');
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
        alert('서버 오류입니다. 잠시 뒤 다시 시도해 주세요 😭');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류입니다. 잠시 뒤 다시 시도해 주세요 😭');
    }
  };

  return (
    <>
      {!isLoading && moeviewMetaData ? (
        <>
          {Object.keys(moeviewMetaData).length > 0 ? (
            <>
              {moeviewMetaData.error === 'Video not found or is deleted/private' ? (
                <div className={`${styles.preview} ${styles['preview-dummy']}`}>
                  <div className={styles.notice}>
                    <p>유튜버가 삭제했거나 비공개 처리한 영상입니다.</p>
                    <p>
                      <button type="button" data-video={moeview.video} onClick={handleReport}>
                        모애뷰 운영자에게 제보
                      </button>
                      해 주세요. {process.env.NODE_ENV === 'development' && moeview.idx}
                    </p>
                  </div>
                  <div className={styles['preview-container']}>
                    <div className={styles.thumbnail}>
                      <div className={`${styles.dummy} ${styles.skeleton}`} />
                    </div>
                    <div className={styles['preview-info']}>
                      <div className={styles.detail}>
                        <div className={`${styles['user-info']}`}>
                          <strong className={styles.skeleton} />
                          <div className={styles.user}>
                            <cite>
                              <i className={styles.skeleton} />
                            </cite>
                            <time className={styles.skeleton} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {isExtraSmall ? (
                    <div className={`${styles.preview} ${styles.mini} preview`}>
                      <Link key={moeview.idx} href={`/moeview/${moeview.idx}`} scroll={false} shallow={true}>
                        <div className={styles['preview-mini']}>
                          <div className={styles['preview-info']}>
                            <div className={styles.thumbnail}>
                              <Image
                                src={moeviewMetaData.thumbnailUrl}
                                width="1920"
                                height="1080"
                                alt=""
                                unoptimized
                                priority
                              />
                              <span>{moeview.isZip ? '요약' : '리뷰'}</span>
                            </div>
                            <div className={`${styles['user-info']}`}>
                              <cite aria-label="유튜브 채널이름">{moeviewMetaData.channelTitle}</cite>
                              <time dateTime={moeviewMetaData.publishedAt}>
                                {formatDate(`${moeviewMetaData.publishedAt}`)}
                              </time>
                              <em aria-label="재생시간">{formatDuration(moeviewMetaData.duration, 'amusement')}</em>
                              {(moeview.worst || moeview.embeddingOff) && (
                                <div className={styles.option}>
                                  {moeview.worst && (
                                    <div className={styles.worst} aria-label="Worst 영상">
                                      <strong className="number">Worst</strong>
                                    </div>
                                  )}
                                  {moeview.embeddingOff && (
                                    <div className={styles.embed} aria-label="퍼가기 금지 영상">
                                      <strong className="preview">퍼가기 금지 콘텐츠</strong>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={styles['preview-subject']}>
                            <strong aria-label="영상제목">{moeviewMetaData.title}</strong>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <Link key={moeview.idx} href={`/moeview/${moeview.idx}`} scroll={false} shallow={true}>
                      <div className={`${styles.preview} preview`}>
                        <div className={styles['preview-container']}>
                          <div className={styles.thumbnail}>
                            <Image
                              src={moeviewMetaData.thumbnailUrl}
                              width="1920"
                              height="1080"
                              alt=""
                              unoptimized
                              priority
                            />
                            <em aria-label="재생시간">{formatDuration(moeviewMetaData.duration)}</em>
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong aria-label="영상제목">{moeviewMetaData.title}</strong>
                                <div className={styles.user}>
                                  <cite aria-label="유튜브 채널이름">{moeviewMetaData.channelTitle}</cite>
                                  <time dateTime={moeviewMetaData.publishedAt}>
                                    {formatDate(`${moeviewMetaData.publishedAt}`)}
                                  </time>
                                </div>
                                {(moeview.worst || moeview.embeddingOff) && (
                                  <div className={styles.option}>
                                    {moeview.worst && (
                                      <div className={styles.worst} aria-label="Worst 영상">
                                        <strong className="number">Worst</strong>
                                      </div>
                                    )}
                                    {moeview.embeddingOff && (
                                      <div className={styles.embed} aria-label="퍼가기 금지 영상">
                                        <strong className="preview">퍼가기 금지 콘텐츠</strong>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              )}
            </>
          ) : (
            <div className={`${styles.preview} ${styles['preview-dummy']}`}>
              <div className={styles.notice}>
                <p>알 수 없는 사유로 불러오지 못했습니다.</p>
                <p>
                  <button type="button" data-video={moeview.video} onClick={handleRetry}>
                    새로고침
                  </button>
                  해 주세요.
                </p>
              </div>
              <div className={styles['preview-container']} aria-hidden="true">
                <div className={styles.thumbnail}>
                  <div className={`${styles.dummy} ${styles.skeleton}`} />
                </div>
                <div className={styles['preview-info']}>
                  <div className={styles.detail}>
                    <div className={`${styles['user-info']}`}>
                      <strong className={styles.skeleton} />
                      <div className={styles.user}>
                        <cite>
                          <i className={styles.skeleton} />
                        </cite>
                        <time className={styles.skeleton} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={`${styles.preview} ${styles['preview-dummy']}`}>
          <div className={styles.notice} hidden>
            <p>불러오는 중</p>
          </div>
          <div className={styles['preview-container']} aria-hidden="true">
            <div className={styles.thumbnail}>
              <div className={`${styles.dummy} ${styles.skeleton}`} />
            </div>
            <div className={styles['preview-info']}>
              <div className={styles.detail}>
                <div className={`${styles['user-info']}`}>
                  <strong className={styles.skeleton} />
                  <div className={styles.user}>
                    <cite>
                      <i className={styles.skeleton} />
                    </cite>
                    <time className={styles.skeleton} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function TagsItem({ items, type }: { items: any; type: string }) {
  const excludeTags = ['game', 'anime', 'film', 'drama'];
  const filteredTags = items.tags && items.tags.filter((items: any) => !excludeTags.includes(items));

  if (!filteredTags) {
    return null;
  }

  if (type === 'tag') {
    return (
      <div className={styles.tags}>
        <dt>태그</dt>
        <dd className="April16thPromise">
          {filteredTags.map((tag: string, index: number) => (
            <span key={index}>{`#${TagName(tag, 'tag')}`} </span>
          ))}
          {items.category && <span>#{TagCategoryName(items.category)}</span>}
        </dd>
      </div>
    );
  } else if (type === 'genre') {
    return (
      <div>
        <dt>장르</dt>
        <dd className="seed">
          {items.genre},{' '}
          {filteredTags.map((tag: string, index: number) => (
            <React.Fragment key={index}>
              {TagName(tag, 'genre')}
              {index < filteredTags.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </dd>
      </div>
    );
  }
}

export function ADCC({ items }: { items: any }) {
  const adcc = items && items.filter((items: any) => items);

  if (!adcc) {
    return null;
  }

  const subtitleDubbing = items.filter((item: string) => ['subtitle', 'dubbing', 'unofficial'].includes(item));
  const adCC = items.filter((item: string) => ['cc', 'description'].includes(item));

  return (
    <>
      {subtitleDubbing.length > 0 && (
        <div className={styles['sub-dub']}>
          <dt>자막/더빙</dt>
          {subtitleDubbing.map((item: string, index: number) => (
            <dd key={index}>{SupportLang(item)}</dd>
          ))}
        </div>
      )}
      {adCC.length > 0 && (
        <div className={styles['ad-cc']}>
          <dt>배리어프리</dt>
          {adCC.map((item: string, index: number) => (
            <dd key={index}>
              {item === 'cc' && <CCiconWhite />}
              {item === 'description' && <ADiconWhite />}
              <span>{SupportLang(item)}</span>
            </dd>
          ))}
        </div>
      )}
    </>
  );
}

export default function Amusement({
  amusementData,
  amusementId,
  logoData,
}: {
  amusementData: AmusementPermalinkData | null;
  amusementId: number;
  logoData: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();
  const currentPage = Number(router.query.page) || 1;
  const [data, setData] = useState<MoeviewData | null>(null);
  const [isMoeviewsLoading, setIsMoeviewsLoading] = useState(false);
  const [isMoeviewsError, setIsMoeviewsError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(true);
  const [season, setSeason] = useState<AmusementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [currentSeason, setCurrentSeason] = useState<string>('');
  const [selectedAmusementId, setSelectedAmusementId] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5200,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  };

  const isMobile = useMobile();
  const isExtraSmall = useExtraSmall();
  const isMedium = useMedium();
  const isLarge = useLarge();
  const isMaxLarge = useMaxLarge();

  const handleButtonClick = (id: string) => {
    setSelectedAmusementId(id);
  };

  const handleCloseAmusementDetail = () => {
    setSelectedAmusementId(null);
  };

  const selectedAmusement = amusementData && String(amusementId).substring(14) === selectedAmusementId;

  useEffect(() => {
    const preventScroll = (e: Event): void => {
      e.preventDefault();
    };
    const preventScrollKeys = (e: KeyboardEvent): void => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };
    if (selectedAmusement === false) {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    } else {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    }
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [selectedAmusement]);

  useEffect(() => {
    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    (amusementData?.attributes.relations || amusementData?.attributes.franchise) &&
      sessionStorage.setItem('literature', router.asPath);
  }, [router.asPath]);

  const loadSeason = async () => {
    if (amusementData) {
      if (amusementData.attributes.relations) {
        setIsLoading(true);
        setIsMoeviewsLoading(true);
        setIsMoeviewsError(null);
        try {
          const response = await fetch(`/api/season?season=${amusementData.attributes.season}`);
          const seasonResponse = await response.json();
          setSeason(seasonResponse);
          const renewResponse =
            amusementData && (await fetch(`/api/renewAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
          const renewData = renewResponse && (await renewResponse.json());
          const renewValue = renewData.renew;
          const cachedData = amusementData && localStorage.getItem(`amusementData${currentPage}${amusementData.id}`);
          let dataToUse;

          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (parsedData.moeviews.length > 0 && parsedData.moeviews[0].createdAt) {
              if (parsedData.moeviews[0].createdAt === renewValue) {
                dataToUse = parsedData;
              }
            }
          }

          if (!dataToUse && amusementData) {
            const response = await fetch(`/api/moeviewAmusement?page=${currentPage}&amusementId=${amusementData.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newData = await response.json();
            localStorage.setItem(`amusementData${currentPage}${amusementData.id}`, JSON.stringify(newData));
            dataToUse = newData;
          }
          setData(dataToUse);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
          setIsMoeviewsLoading(false);
        }
      }
      if (amusementData.attributes.season) {
        setIsLoading(true);
        setIsMoeviewsLoading(true);
        setIsMoeviewsError(null);
        try {
          const response = await fetch(`/api/season?season=${amusementData.attributes.season}&type=amusement`);
          const seasonResponse = await response.json();
          setSeason(seasonResponse);
          const renewResponse =
            amusementData && (await fetch(`/api/renewAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
          const renewData = renewResponse && (await renewResponse.json());
          const renewValue = renewData.renew;
          const cachedData = amusementData && localStorage.getItem(`amusementData${currentPage}${amusementData.id}`);
          let dataToUse;

          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (parsedData.moeviews.length > 0 && parsedData.moeviews[0].createdAt) {
              if (parsedData.moeviews[0].createdAt === renewValue) {
                dataToUse = parsedData;
              }
            }
          }

          if (!dataToUse && amusementData) {
            const response = await fetch(`/api/moeviewAmusement?page=${currentPage}&amusementId=${amusementData.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const newData = await response.json();
            localStorage.setItem(`amusementData${currentPage}${amusementData.id}`, JSON.stringify(newData));
            dataToUse = newData;
          }
          setData(dataToUse);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
          setIsMoeviewsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    loadSeason();
  }, [amusementData]);

  const previousPageHandler = () => {
    const previousPage =
      sessionStorage.getItem('ai') ||
      sessionStorage.getItem('works') ||
      sessionStorage.getItem('amusementCategory') ||
      sessionStorage.getItem('amusementTag') ||
      sessionStorage.getItem('amusementPlatform') ||
      sessionStorage.getItem('amusementHanguk') ||
      sessionStorage.getItem('amusementSubdub') ||
      sessionStorage.getItem('amusementBfree') ||
      sessionStorage.getItem('amusementLiterature');
    let refer = document.referrer !== '' || document.referrer.includes(window.location.origin);
    if (!refer) {
      if (amusementData) {
        if (
          amusementData.attributes.category === 'ott_drama' ||
          amusementData.attributes.category === 'ott_drama_enter' ||
          amusementData.attributes.category === 'ott_anime' ||
          amusementData.attributes.category === 'ott_anime_film' ||
          amusementData.attributes.category === 'ott_film'
        )
          router.push('/amusement?category=ott');
        else if (amusementData.attributes.category === 'anime' || amusementData.attributes.category === 'anime_film')
          router.push('/amusement?category=anime');
        else router.push(`/amusement?category=${amusementData.attributes.category}`);
      }
    } else if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      if (amusementData) {
        if (
          amusementData.attributes.category === 'ott_drama' ||
          amusementData.attributes.category === 'ott_drama_enter' ||
          amusementData.attributes.category === 'ott_anime' ||
          amusementData.attributes.category === 'ott_anime_film' ||
          amusementData.attributes.category === 'ott_film'
        )
          router.push('/amusement?category=ott');
        else if (amusementData.attributes.category === 'anime' || amusementData.attributes.category === 'anime_film')
          router.push('/amusement?category=anime');
        else router.push(`/amusement?category=${amusementData.attributes.category}`);
      }
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('URL이 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('URL 복사에 실패했습니다:', err);
      });
  };

  const amazonRatingHandler = () => {
    alert('아마존 자체 심의등급으로 설정된 작품입니다.\n아마존 프라임 비디오에 가입이 되어 있다면 시청 가능합니다.');
  };

  const regionRatingHandler = () => {
    alert('한국에서 시청이 불가능한 아마존 오리지널 작품입니다.\n시청 등급은 아마존 자체 심의등급입니다.');
  };

  const customRatingHandler = () => {
    alert(
      '한국에서 시청/심의등급이 없거나 한국에 정식 발매된 작품이 아닙니다.\n해당 시청/심의등급은 모애뷰 자체설정 시청/심의등급입니다.\n따라서 모애뷰 심의등급은 법적구속력이 없습니다.\n\n자세한 내용은 공지사항을 참고하세요.',
    );
  };

  const fetchData = async () => {
    setIsMoeviewsLoading(true);
    setIsMoeviewsError(null);
    try {
      const renewResponse =
        amusementData && (await fetch(`/api/renewAmusement?page=${currentPage}&amusementId=${amusementData.id}`));
      const renewData = renewResponse && (await renewResponse.json());
      const renewValue = renewData.renew;
      const cachedData = amusementData && localStorage.getItem(`amusementData${currentPage}${amusementData.id}`);
      let dataToUse;

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.moeviews.length > 0 && parsedData.moeviews[0].createdAt) {
          if (parsedData.moeviews[0].createdAt === renewValue) {
            dataToUse = parsedData;
          }
        }
      }

      if (!dataToUse && amusementData) {
        const response = await fetch(`/api/moeviewAmusement?page=${currentPage}&amusementId=${amusementData.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newData = await response.json();
        localStorage.setItem(`amusementData${currentPage}${amusementData.id}`, JSON.stringify(newData));
        dataToUse = newData;
      }
      setData(dataToUse);
    } catch (err) {
      if (err instanceof Error) {
        setIsMoeviewsError(err.message);
      } else {
        setIsMoeviewsError('An unknown error occurred');
      }
    } finally {
      setIsMoeviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (Array.isArray(season) && season.length > 0) {
      const defaultSeason = season.find((season) => season.idx !== amusementId);
      if (defaultSeason) {
        setSelectedSeason(`/amusement/${amusementId}`);
      }
    }
  }, [season, amusementId]);

  if (!amusementData) {
    if (timeoutReached) {
      return (
        <main className={`${header.amusement} ${footer.amusement} ${styles.amusement} ${styles.error}`}>
          <div className="top-link">
            <Anchor href="/amusement">
              <BackButtonLight />
              <span>뒤로가기</span>
            </Anchor>
          </div>
          <div className={styles.cover}>
            <div className={styles.background}>
              <div className={styles.images}>
                <Image
                  src="https://i.ytimg.com/vi/Ezo69U5bar4/hq720.jpg"
                  alt=""
                  width="1920"
                  height="1080"
                  unoptimized
                  priority
                  className={`${isActive ? styles.active : ''}`}
                />
              </div>
              <div className={styles.dummy} />
            </div>
            <div className={styles.info}>
              <h1 className={styles.long}>404 NOT FOUND</h1>
              <dl className={styles.title}>
                <div>
                  <dt>원제</dt>
                  <dd>
                    <span lang="ko">체념 by 이영현</span>
                  </dd>
                </div>
                <div>
                  <dt>추가설명</dt>
                  <dd className="lang">없는 페이지이므로 체념하고 되돌아가세요</dd>
                </div>
              </dl>
              <dl className={styles.summary}>
                <div className={styles.item}>
                  <div className={styles.category}>
                    <dt>카테고리</dt>
                    <dd>
                      <em>404 페이지 없음 안내 페이지</em>
                    </dd>
                  </div>
                  <div className={styles.country}>
                    <dt>영상 제작국가</dt>
                    <dd>한국에서 영상 제작</dd>
                  </div>
                  <div className={styles.release}>
                    <dt>영상 제작년도</dt>
                    <dd>2021년 영상 제작</dd>
                  </div>
                  <div className={styles.rating}>
                    <dt>등급</dt>
                    <dd>
                      <i className={`${styles.drama} ${styles.all} number`}>{RatingsDrama('all')}</i>
                      <span>전체 이용가</span>
                    </dd>
                  </div>
                </div>
              </dl>
              <dl className={styles.staff}>
                <div>
                  <dt>영상 제작사</dt>
                  <dd>It`s Live</dd>
                </div>
              </dl>
            </div>
            <div className={`${styles.poster} ${styles.mv}`}>
              <div className={`${styles.images}`}>
                <YouTubeController
                  videoId={'Ezo69U5bar4'}
                  videoImage={'https://i.ytimg.com/vi/Ezo69U5bar4/hq720.jpg'}
                />
              </div>
            </div>
          </div>
        </main>
      );
    } else {
      return (
        <main className={`${footer.amusement} ${styles.amusement}`}>
          <Seo
            pageTitles={`404 NOT FOUND - ${originTitle}`}
            pageTitle={`404 NOT FOUND`}
            pageDescription={`존재하지 않는 작품일걸요?`}
            pageImg={`https://semo.dev1stud.io/missing.webp`}
          />
          <p className={styles.loading}>작품 불러오는 중...</p>
        </main>
      );
    }
  }

  const togglePoster = () => {
    setIsActive(!isActive);
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const displayText = selectedOption.text;
    setSelectedSeason(event.target.value);
    setCurrentSeason(displayText);
  };

  const handleSeasonSubmit = () => {
    if (!currentSeason || currentSeason === '') {
      alert('작품을 선택해 주세요');
    } else {
      router.push({ pathname: selectedSeason });
      setCurrentSeason('');
    }
  };

  function SeasonSelect() {
    if (
      Array.isArray(season) &&
      season.length > 1 &&
      amusementData &&
      amusementData.attributes.season !== null &&
      !isLoading
    ) {
      const longCheck = season.reduce((longest, current) => {
        const currentTitle = current.relName || current.titleKorean || current.title;
        return currentTitle.length > longest.length ? currentTitle : longest;
      }, '');
      return (
        <div className={styles.relation}>
          <dt>
            {amusementData.attributes.category === 'anime' || amusementData.attributes.category === 'ott_anime'
              ? '시즌'
              : '시리즈'}{' '}
            선택
          </dt>
          <dd>
            <div>
              <select defaultValue={selectedSeason} onChange={handleSeasonChange}>
                {[...season]
                  .sort((a, b) => a.order - b.order)
                  .map((relation) => (
                    <option key={relation.idx} value={`/amusement/${relation.idx}`}>
                      {relation.relName
                        ? relation.relName
                        : relation.titleKorean
                          ? relation.titleKorean
                          : relation.title}
                    </option>
                  ))}
              </select>
              <span aria-hidden="true">
                {currentSeason === '' ? (
                  <>
                    {amusementData.attributes.relName ? (
                      <span>{amusementData.attributes.relName}</span>
                    ) : amusementData.attributes.titleKorean ? (
                      <span>{amusementData.attributes.titleKorean}</span>
                    ) : (
                      <span>{amusementData.attributes.title}</span>
                    )}
                  </>
                ) : (
                  <span>{currentSeason}</span>
                )}
                <em>{longCheck}</em>
                <DownIcon />
              </span>
            </div>
            <button type="button" onClick={handleSeasonSubmit}>
              이동
            </button>
          </dd>
        </div>
      );
    }
  }

  const handleRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const moeviewAmusement = event.currentTarget.getAttribute('data-video');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moeviewAmusement: moeviewAmusement }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      alert('요청 성공! 감사합니다 ☺️');
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류입니다. 잠시 뒤 다시 시도해 주세요 😭');
    }
  };

  function checkKorean(word: string) {
    const lastChar = word.charCodeAt(word.length - 1);
    const isThereLastChar = (lastChar - 0xac00) % 28;
    if (isThereLastChar) {
      return `${word}이 해보는 ${word}의 팬게임`;
    }
    return `${word}가 해보는 ${word}의 팬게임`;
  }

  function bfreeService(services: any) {
    return (
      <>
        {Array.isArray(services) && (
          <div className={styles['barrier-free']}>
            <dl>
              {services.map((service: any, index: number) => (
                <div key={index}>
                  <dt>
                    {service.service === 'Amazon' && (
                      <>
                        <AmazonWhite />
                        <span>프라임 비디오</span>
                      </>
                    )}
                    {service.service === 'Apple' && (
                      <>
                        <AppleWhite />
                        <span lang="en">Apple TV+</span>
                      </>
                    )}
                    {service.service === 'Disney' && (
                      <>
                        <DisneyWhite />
                        <span lang="en">Disney+</span>
                      </>
                    )}
                    {service.service === 'NETFLIX' && (
                      <>
                        <NetflixWhite />
                        <span>넷플릭스</span>
                      </>
                    )}
                    {service.service === 'TVING' && (
                      <>
                        <TvingWhite />
                        <span>티빙</span>
                      </>
                    )}
                    {service.service === 'WATCHA' && (
                      <>
                        <WatchaWhite />
                        <span>왓챠</span>
                      </>
                    )}
                    {service.service === 'Wavve' && (
                      <>
                        <WavveWhite />
                        <span>웨이브</span>
                      </>
                    )}
                    {service.service === 'Series' && (
                      <>
                        <SeriesWhite />
                        <span>시리즈온</span>
                      </>
                    )}
                  </dt>
                  {Array.isArray(service.options) &&
                    service.options.map((option: any, index: number) => (
                      <dd key={index}>
                        <Anchor href={option.url}>
                          {option.bfree === 'cc' && (
                            <>
                              <CCiconWhite />
                              <span>청각 장애인용 자막(CC) 콘텐츠 시청하기</span>
                            </>
                          )}
                          {option.bfree === 'ad' && (
                            <>
                              <ADiconWhite />
                              <span>화면 해설(AD) 콘텐츠 시청하기</span>
                            </>
                          )}
                          {option.bfree === 'both' && (
                            <>
                              <CCiconWhite />
                              <ADiconWhite />
                              <span>베리어프리 콘텐츠 시청하기</span>
                            </>
                          )}
                        </Anchor>
                        {service.service === 'Apple' && (
                          <>
                            <p>Apple TV+의 CC/SDH는 SDH 설정 후 이용 가능합니다.</p>
                            <ul>
                              <li>
                                <Anchor href="https://support.apple.com/ko-kr/guide/iphone/iph3e2e23d1/ios">
                                  아이폰
                                </Anchor>
                              </li>
                              <li>
                                <Anchor href="https://support.apple.com/ko-kr/guide/mac-help/mchlc1cb8d54/mac">
                                  맥OS
                                </Anchor>
                              </li>
                              <li>
                                <Anchor href="https://support.apple.com/ko-kr/guide/tvapp/atvb5ca42eb9/web">
                                  애플TV
                                </Anchor>
                              </li>
                            </ul>
                          </>
                        )}
                        {service.service === 'Wavve' && (option.bfree === 'ad' || option.bfree === 'both') && (
                          <p>
                            웨이브에서 AD를 이용하기 위해서는 &apos;화면해설&apos; 또는 &apos;베리어프리&apos;를
                            선택해야 시청이 가능할 수 있습니다.
                          </p>
                        )}
                      </dd>
                    ))}
                </div>
              ))}
            </dl>
          </div>
        )}
      </>
    );
  }

  return (
    <main className={`${footer.amusement} ${styles.amusement}`}>
      <Seo
        pageTitles={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title} - ${originTitle}`}
        pageTitle={`${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}`}
        pageDescription={`'${amusementData.attributes.titleKorean !== null ? amusementData.attributes.titleKorean : amusementData.attributes.title}' 리뷰 영상을 모아서 한방에 즐기자!`}
        pageImg={`https://cdn.dev1stud.io/semoview/_/${amusementData.id}-og.webp?ts=${timestamp}`}
        pageTwt={`https://cdn.dev1stud.io/semoview/_/${amusementData.id}-twt.webp?ts=${timestamp}`}
      />
      <div className={`top-link ${styles['top-link']}`}>
        <button onClick={previousPageHandler} type="button">
          <BackButtonLight />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.cover}>
        <div className={styles.background}>
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={
                amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                  ? 460
                  : 390
              }
              height={
                amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                  ? 215
                  : 560
              }
              unoptimized
              priority
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={
                  amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                    ? 460
                    : 390
                }
                height={
                  amusementData.attributes.category === 'game_fan' || amusementData.attributes.category === 'game_fan'
                    ? 215
                    : 560
                }
                unoptimized
                priority
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          <div className={styles.dummy} />
        </div>
        <div className={styles.info}>
          {logoData !== null && !isMobile && (
            <div
              className={`${styles.logoID} ${
                amusementData.attributes.logoSize === 'half'
                  ? styles.half
                  : amusementData.attributes.logoSize === 'double'
                    ? styles.double
                    : styles.default
              } ${amusementData.attributes.category === 'game' ? styles['game-title'] : ''}`}
            >
              <Image src={logoData} width="100" height="100" unoptimized priority alt="" />
            </div>
          )}
          {amusementData.attributes.titleKorean !== null ? (
            amusementData.attributes.titleKorean.length >= 18 ? (
              <h1 className={`${styles.long} ${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
                {amusementData.attributes.titleKorean}
              </h1>
            ) : (
              <h1 className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
                {amusementData.attributes.titleKorean}
              </h1>
            )
          ) : amusementData.attributes.title.length >= 18 ? (
            <h1 className={`${styles.long} ${isSafari ? 'April16thPromise' : 'April16thLife'}`}>
              {amusementData.attributes.title}
            </h1>
          ) : (
            <h1 className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>{amusementData.attributes.title}</h1>
          )}
          <dl className={styles.title}>
            {(logoData === null || isMobile) && (
              <>
                {amusementData.attributes.titleKorean !== null && (
                  <div>
                    <dt>원제</dt>
                    <dd>
                      {amusementData.attributes.lang === 'chineseBeonche' && (
                        <span className="seed" lang="zh-Hant">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === 'chineseGanche' && (
                        <span className="seed" lang="zh-Hans">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === 'europe' && (
                        <span className="seed" lang="en">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === 'english' && (
                        <span className="seed" lang="en-US">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === 'japanese' && (
                        <span className="seed" lang="ja">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === 'thai' && (
                        <span className="seed" lang="th">
                          {amusementData.attributes.title}
                        </span>
                      )}
                      {amusementData.attributes.lang === null && (
                        <span className="seed" lang="ko">
                          {amusementData.attributes.title}
                        </span>
                      )}
                    </dd>
                  </div>
                )}
              </>
            )}
            {amusementData.attributes.etc && (
              <div className={styles.accent}>
                <dt>작품 추가설명</dt>
                <dd className="lang">{amusementData.attributes.etc}</dd>
              </div>
            )}
            {amusementData.attributes.originalAuthor &&
              amusementData.attributes.original &&
              amusementData.attributes.originTitle && (
                <div className={styles.accent}>
                  <dt>원작</dt>
                  <dd>
                    &apos;{amusementData.attributes.originalAuthor}&apos;의{' '}
                    {OriginalName(amusementData.attributes.original)} &apos;
                    {amusementData.attributes.originTitle}&apos; 원작
                  </dd>
                </div>
              )}
            {amusementData.attributes.original !== null &&
              amusementData.attributes.originTitle === null &&
              amusementData.attributes.originalAuthor !== null && (
                <div className={styles.accent}>
                  <dt>원작</dt>
                  <dd>동명의 {OriginalName(amusementData.attributes.original)} 원작</dd>
                </div>
              )}
          </dl>
          {amusementData.attributes.ott !== null && (
            <div className={styles.platform}>
              <dt>OTT 플랫폼</dt>
              <dd>
                {amusementData.attributes.ott === 'amazonOriginal' && (
                  <>
                    <AmazonOriginalWhite /> AMAZON ORIGINAL
                  </>
                )}
                {amusementData.attributes.ott === 'appleOriginal' && (
                  <>
                    <AppleOriginalWhite /> An Apple Original
                  </>
                )}
                {amusementData.attributes.ott === 'appleFilm' && (
                  <cite>
                    <AppleOriginalWhite /> Apple Original Films
                  </cite>
                )}
                {amusementData.attributes.ott === 'disneyOriginal' && (
                  <cite>
                    <DisneyOriginalWhite /> Disney Original
                  </cite>
                )}
                {amusementData.attributes.ott === 'disneyStar' && (
                  <cite>
                    <StarOriginalWhite /> Star Original
                  </cite>
                )}
                {(amusementData.attributes.ott === 'netflixSeries' ||
                  amusementData.attributes.ott === 'netflixOriginal' ||
                  amusementData.attributes.ott === 'netflixAnime' ||
                  amusementData.attributes.ott === 'netflixPresents' ||
                  amusementData.attributes.ott === 'netflixFilm' ||
                  amusementData.attributes.ott === 'netflixAnimeFilm' ||
                  amusementData.attributes.ott === 'netflixDocumentary') && (
                  <cite>
                    <NetflixOriginalWhite />
                    {(amusementData.attributes.ott === 'netflixSeries' ||
                      amusementData.attributes.ott === 'netflixOriginal' ||
                      amusementData.attributes.ott === 'netflixAnime') &&
                      'A NETFLIX Series'}
                    {(amusementData.attributes.ott === 'netflixPresents' ||
                      amusementData.attributes.ott === 'netflixFilm' ||
                      amusementData.attributes.ott === 'netflixAnimeFilm') &&
                      'NETFLIX Presents'}
                    {amusementData.attributes.ott === 'netflixDocumentary' && 'A NETFLIX Documentary'}
                  </cite>
                )}
                {amusementData.attributes.ott === 'tvingOriginal' && (
                  <>
                    <TvingOriginalWhite /> 티빙 오리지널
                  </>
                )}
                {amusementData.attributes.ott === 'tvingOnly' && (
                  <>
                    <TvingOnlyWhite /> 오직 티빙에서
                  </>
                )}
                {amusementData.attributes.ott === 'watchaOriginal' && (
                  <>
                    <WatchaOriginalWhite /> 왓챠 오리지널
                  </>
                )}
                {amusementData.attributes.ott === 'watchaExclusive' && (
                  <>
                    <WatchaOnlyWhite /> 오직 왓챠에서
                  </>
                )}
                {amusementData.attributes.ott === 'wavveOriginal' && (
                  <>
                    <WavveOriginalWhite /> 웨이브 오리지널
                  </>
                )}
                {amusementData.attributes.ott === 'wavveOnly' && (
                  <>
                    <WavveOnlyWhite /> 오직 웨이브에서
                  </>
                )}
                {amusementData.attributes.ott === 'waveOnly' && (
                  <>
                    <WavveOnlyWhite /> 웨이브 해외시리즈
                  </>
                )}
                {amusementData.attributes.ott === 'waveFirstrun' && (
                  <>
                    <WavveFirstrunWhite /> 웨이브 해외시리즈
                  </>
                )}
                {amusementData.attributes.ott === 'paramount' && (
                  <>
                    <ParamountWhite /> Paramount+
                  </>
                )}
              </dd>
            </div>
          )}
          <div className={styles.function}>
            <dl className={styles.summary}>
              {amusementData.attributes.ott !== null && (
                <div
                  className={`${styles.link} ${amusementData.attributes.season || amusementData.attributes.relations || amusementData.attributes.franchise ? styles.grow : ''}`}
                >
                  <dt>OTT에서 보기</dt>
                  <dd>
                    {amusementData.attributes.ott === 'paramount' ? (
                      <strong className={styles.out}>티빙 판권 만료</strong>
                    ) : (
                      <>
                        {amusementData.attributes.ottAddr !== null ? (
                          <Anchor href={amusementData.attributes.ottAddr}>
                            {amusementData.attributes.ott === 'amazonOriginal' && '프라임 비디오'}
                            {(amusementData.attributes.ott === 'appleOriginal' ||
                              amusementData.attributes.ott === 'appleFilm') &&
                              'Apple TV+'}
                            {(amusementData.attributes.ott === 'disneyOriginal' ||
                              amusementData.attributes.ott === 'disneyStar') &&
                              'Disney+'}
                            {(amusementData.attributes.ott === 'netflixSeries' ||
                              amusementData.attributes.ott === 'netflixPresents' ||
                              amusementData.attributes.ott === 'netflixOriginal' ||
                              amusementData.attributes.ott === 'netflixFilm' ||
                              amusementData.attributes.ott === 'netflixAnime' ||
                              amusementData.attributes.ott === 'netflixAnimeFilm' ||
                              amusementData.attributes.ott === 'netflixDocumentary') &&
                              '넷플릭스'}
                            {(amusementData.attributes.ott === 'tvingOriginal' ||
                              amusementData.attributes.ott === 'tvingOnly') &&
                              '티빙'}
                            {(amusementData.attributes.ott === 'watchaOriginal' ||
                              amusementData.attributes.ott === 'watchaExclusive') &&
                              '왓챠'}
                            {(amusementData.attributes.ott === 'wavveOriginal' ||
                              amusementData.attributes.ott === 'wavveOnly' ||
                              amusementData.attributes.ott === 'waveOnly' ||
                              amusementData.attributes.ott === 'waveFirstrun') &&
                              '웨이브'}
                            에서 시청하기
                            <ExternalIcon />
                          </Anchor>
                        ) : (
                          <strong className={styles.out}>
                            {amusementData.attributes.ott === 'amazonOriginal' && '프라임 비디오 한국리전'}
                            {(amusementData.attributes.ott === 'appleOriginal' ||
                              amusementData.attributes.ott === 'appleFilm') &&
                              'Apple TV+ 한국리전'}
                            {(amusementData.attributes.ott === 'disneyOriginal' ||
                              amusementData.attributes.ott === 'disneyStar') &&
                              'Disney+ 한국리전'}
                            {(amusementData.attributes.ott === 'netflixSeries' ||
                              amusementData.attributes.ott === 'netflixPresents' ||
                              amusementData.attributes.ott === 'netflixOriginal' ||
                              amusementData.attributes.ott === 'netflixFilm' ||
                              amusementData.attributes.ott === 'netflixAnime' ||
                              amusementData.attributes.ott === 'netflixAnimeFilm' ||
                              amusementData.attributes.ott === 'netflixDocumentary') &&
                              '넷플릭스 한국리전'}
                            {(amusementData.attributes.ott === 'tvingOriginal' ||
                              amusementData.attributes.ott === 'tvingOnly') &&
                              '티빙'}
                            {(amusementData.attributes.ott === 'watchaOriginal' ||
                              amusementData.attributes.ott === 'watchaExclusive') &&
                              '왓챠'}
                            {(amusementData.attributes.ott === 'wavveOriginal' ||
                              amusementData.attributes.ott === 'wavveOnly' ||
                              amusementData.attributes.ott === 'waveOnly' ||
                              amusementData.attributes.ott === 'waveFirstrun') &&
                              '웨이브'}{' '}
                            판권 만료
                          </strong>
                        )}
                      </>
                    )}
                  </dd>
                </div>
              )}
              {amusementData.attributes.category === 'game_fan' && (
                <div className={`${styles.link} ${styles['channel-link']}`}>
                  <dt>{amusementData.attributes.title} 채널 이동</dt>
                  <dd>
                    <Anchor href={amusementData.attributes.ottAddr}>
                      {amusementData.attributes.title} 채널 놀러가기
                      <ExternalIcon />
                    </Anchor>
                  </dd>
                </div>
              )}
              {amusementData.attributes.relations && (
                <div
                  className={`${styles.link} ${styles.internal} ${amusementData.attributes.season ? styles.grow : ''}`}
                >
                  <dt>관련 작품 보기</dt>
                  <dd>
                    <Anchor href={`/amusement?literature=${amusementData.attributes.relations}&page=1`}>
                      관련 작품 목록으로 이동
                      <MoreIcon />
                    </Anchor>
                  </dd>
                </div>
              )}
              {amusementData.attributes.franchise && (
                <div
                  className={`${styles.link} ${styles.internal} ${amusementData.attributes.season ? styles.grow : ''}`}
                >
                  <dt>프랜차이즈 보기</dt>
                  <dd>
                    <Anchor href={`/amusement?literature=${amusementData.attributes.franchise}&page=1`}>
                      프랜차이즈 목록으로 이동
                      <MoreIcon />
                    </Anchor>
                  </dd>
                </div>
              )}
              {isLoading ? (
                <div className={styles.relation}>
                  <dt>
                    {amusementData.attributes.category === 'anime' || amusementData.attributes.category === 'ott_anime'
                      ? '시즌'
                      : '시리즈'}{' '}
                    선택
                  </dt>
                  <dd>
                    <div>
                      <span>
                        <em>목록 불러오는 중...</em>
                      </span>
                    </div>
                  </dd>
                </div>
              ) : (
                <SeasonSelect />
              )}
            </dl>
            <button onClick={copyToClipboard}>
              <ClipboardIconLight /> <span>공유</span>
            </button>
          </div>
          <dl className={styles.summary}>
            <div className={styles.item}>
              <div className={styles.category}>
                <dt>카테고리</dt>
                <dd>
                  {amusementData.attributes.category !== 'anime_film' ? (
                    <>
                      {(amusementData.attributes.category === 'anime' ||
                        amusementData.attributes.category === 'ott_anime') && (
                        <em>
                          {amusementData.attributes.broadcast === 'ENA' && (
                            <>
                              <EnaWhite /> <span>ENA</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'JTBC' && (
                            <>
                              <JtbcWhite /> <span>JTBC</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'KBS2' && (
                            <>
                              <Kbs2tvWhite /> <span>KBS 2TV</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'MBC' && (
                            <>
                              <MbcWhite /> <span>MBC</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'OCN' && (
                            <>
                              <OcnWhite /> <span>OCN</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'SBS' && (
                            <>
                              <SbsWhite /> <span>SBS</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'tvN' && (
                            <>
                              <TvnWhite /> <span>tvN</span>
                            </>
                          )}
                          {amusementData.attributes.broadcast === 'ABC' && (
                            <>
                              <AbcWhite /> <span>ABC</span>
                            </>
                          )}
                          {amusementData.attributes.wavveSeries &&
                            amusementData.attributes.wavveSeries.map((item: string, index: number) => (
                              <React.Fragment key={index}>
                                {item === 'bbc' && (
                                  <>
                                    <BbcWhite />
                                    <span>BBC</span>
                                  </>
                                )}
                                {item === 'hbomax' && (
                                  <>
                                    <HbomaxWhite />
                                    <span>HBO맥스</span>
                                  </>
                                )}
                                {item === 'hulu' && (
                                  <>
                                    <HuluWhite />
                                    <span>Hulu</span>
                                  </>
                                )}
                                {item === 'peacock' && (
                                  <>
                                    <PeacockWhite />
                                    <span>Peacock</span>
                                  </>
                                )}
                                {item === 'sky' && (
                                  <>
                                    <SkyWhite />
                                    <span>SKY</span>
                                  </>
                                )}
                                {item === 'syfy' && (
                                  <>
                                    <SyfyWhite />
                                    <span>SYFY</span>
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                          {(amusementData.attributes.animeBroadcast1 !== null ||
                            amusementData.attributes.animeBroadcast2 !== null) && (
                            <>
                              {amusementData.attributes.animeBroadcast1 === 'tokyomx' && (
                                <>
                                  <TokyomxWhite /> <span>도쿄MX</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'tvtokyo' && (
                                <>
                                  <TvtokyoWhite /> <span>테레토</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'fujitv' && (
                                <>
                                  <FujitvWhite /> <span>후지테레비</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'mbs' && (
                                <>
                                  <MbsWhite /> <span>MBS</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'tbs' && (
                                <>
                                  <TbsWhite /> <span>TBS</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'atx' && (
                                <>
                                  <AtxWhite /> <span>AT-X</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'nippontv' && (
                                <>
                                  <NippontvWhite /> <span>닛테레</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast1 === 'wowow' && (
                                <>
                                  <WowowWhite /> <span>WOWOW</span>
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast2 === 'aniplus' && (
                                <>
                                  {amusementData.attributes.animeBroadcast1 !== null && '|'}
                                  <AniplusWhite /> <span>애니플러스</span> 방영{' '}
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast2 === 'daewon' && (
                                <>
                                  {amusementData.attributes.animeBroadcast1 !== null && '|'}
                                  <DaewonWhite /> <span>애니원</span> 방영{' '}
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast2 === 'anibox' && (
                                <>
                                  {amusementData.attributes.animeBroadcast1 !== null && '|'}
                                  <AniboxWhite /> <span>애니박스</span> 방영{' '}
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast2 === 'tooniverse' && (
                                <>
                                  {amusementData.attributes.animeBroadcast1 !== null && '|'}
                                  <TooniverseWhite /> <span>투니버스</span> 방영{' '}
                                </>
                              )}
                              {amusementData.attributes.animeBroadcast2 === 'animax' && (
                                <>
                                  {amusementData.attributes.animeBroadcast1 !== null && '|'}
                                  <AnimaxWhite /> <span>애니맥스 코리아</span> 방영{' '}
                                </>
                              )}
                            </>
                          )}
                          {CategoryName(amusementData.attributes.category)}
                        </em>
                      )}
                      {amusementData.attributes.category === 'ott_anime_film' && <em>영화</em>}
                    </>
                  ) : (
                    <>
                      {(amusementData.attributes.category as Category) === 'anime_film' && <em>영화</em>}
                      {(amusementData.attributes.category as Category) !== 'anime_film' &&
                        (amusementData.attributes.category as Category) !== 'documentary_film' && (
                          <em>{CategoryName(amusementData.attributes.category)}</em>
                        )}
                    </>
                  )}
                  {amusementData.attributes.ott === null &&
                    amusementData.attributes.category !== 'game_fan' &&
                    amusementData.attributes.ottAddr !== null && <em>단편영화</em>}
                  {amusementData.attributes.anime !== null && <em>{AnimeName(amusementData.attributes.anime)}</em>}
                </dd>
              </div>
              {amusementData.attributes.runningTime && (
                <div className={styles.country}>
                  <dt>재생시간</dt>
                  <dd>
                    {amusementData.attributes.runningTime}분{formatTime(amusementData.attributes.runningTime)}
                  </dd>
                </div>
              )}
              {amusementData.attributes.series && (
                <div className={styles.country}>
                  <dt>에피소드</dt>
                  <dd>{amusementData.attributes.series > 1 ? `${amusementData.attributes.series}부작` : '단막극'}</dd>
                </div>
              )}
              {amusementData.attributes.country !== '?' && (
                <div className={styles.country}>
                  <dt>제작국가</dt>
                  <dd>{amusementData.attributes.country}</dd>
                </div>
              )}
              {amusementData.attributes.release !== '?' && (
                <div className={styles.release}>
                  <dt>
                    {(amusementData.attributes.category === 'ott_anime' || amusementData.attributes.anime === 'tva') &&
                      '방영'}
                    {(amusementData.attributes.category === 'film' ||
                      amusementData.attributes.category === 'anime_film' ||
                      amusementData.attributes.category === 'ott_anime_film' ||
                      amusementData.attributes.category === 'ott_film' ||
                      amusementData.attributes.anime === 'film') &&
                      '상영'}
                    {amusementData.attributes.anime === 'ova' && '출시'}
                    년도
                  </dt>
                  <dd>{amusementData.attributes.release}년</dd>
                </div>
              )}
              {amusementData.attributes.supportLang !== null && <ADCC items={amusementData.attributes.supportLang} />}
              {amusementData.attributes.category !== 'game_fan' && (
                <div className={styles.rating}>
                  <dt>시청등급</dt>
                  <dd>
                    {amusementData.attributes.ott === 'amazonOriginal' ? (
                      <i className={`${styles['rating-amazon']} number`}>
                        <span>시청 가능 연령 </span>
                        {amusementData.attributes.rating === 'all' && 'All'}
                        {amusementData.attributes.rating === 'a7' && '7+'}
                        {amusementData.attributes.rating === 'b12' && '13+'}
                        {amusementData.attributes.rating === 'c15' && '16+'}
                        {amusementData.attributes.rating === 'd19' && '18+'}
                        <span>세 이상</span>
                      </i>
                    ) : (
                      <>
                        {(amusementData.attributes.category === 'ott_anime' ||
                          amusementData.attributes.anime === 'tva' ||
                          amusementData.attributes.anime === 'ova') && (
                          <>
                            {amusementData.attributes.rating === 'all' ? (
                              <>
                                <i className={`${styles.drama} ${styles.all} number`}>
                                  {RatingsDrama(amusementData.attributes.rating)}
                                </i>
                                <span>전체 이용가</span>
                              </>
                            ) : (
                              <>
                                {amusementData.attributes.rating === 'd19' ? (
                                  <>
                                    <i className={`${styles.drama} ${styles.d19} number`}>
                                      {RatingsDrama(amusementData.attributes.rating)}
                                    </i>
                                    <span>세 미만 이용불가</span>
                                  </>
                                ) : (
                                  <>
                                    <i className={`${styles.drama} number`}>
                                      {RatingsDrama(amusementData.attributes.rating)}
                                    </i>
                                    <span>세 이상 이용가</span>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                        {(amusementData.attributes.category === 'film' ||
                          amusementData.attributes.category === 'anime_film' ||
                          amusementData.attributes.category === 'ott_anime_film' ||
                          amusementData.attributes.category === 'ott_film' ||
                          amusementData.attributes.anime === 'film') && (
                          <>
                            {amusementData.attributes.rating === 'all' && (
                              <>
                                <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                              </>
                            )}
                            {amusementData.attributes.rating === 'b12' && (
                              <>
                                <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                              </>
                            )}
                            {amusementData.attributes.rating === 'c15' && (
                              <>
                                <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                              </>
                            )}
                            {amusementData.attributes.rating === 'd19' && (
                              <>
                                <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {amusementData.attributes.category === 'game' && (
                      <>
                        {amusementData.attributes.rating === 'all' && (
                          <>
                            <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'b12' && (
                          <>
                            <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'c15' && (
                          <>
                            <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                          </>
                        )}
                        {amusementData.attributes.rating === 'd19' && (
                          <>
                            <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                          </>
                        )}
                      </>
                    )}
                    {(amusementData.attributes.ott === 'amazonOriginal' || amusementData.attributes.ratingCustom) && (
                      <div className={styles.custom}>
                        {amusementData.attributes.ott === 'amazonOriginal' &&
                          !amusementData.attributes.ratingCustom && (
                            <button type="button" onClick={amazonRatingHandler}>
                              <i />
                              <span>아마존 자체 심의등급 작품</span>
                            </button>
                          )}
                        {amusementData.attributes.ott === 'amazonOriginal' && amusementData.attributes.ratingCustom && (
                          <button type="button" onClick={regionRatingHandler}>
                            <i />
                            <span>한국 리전 아마존 시청 불가 작품</span>
                          </button>
                        )}
                        {amusementData.attributes.ott !== 'amazonOriginal' && amusementData.attributes.ratingCustom && (
                          <button type="button" onClick={customRatingHandler}>
                            <i />
                            <span>모애뷰 자체설정 심의등급 안내</span>
                          </button>
                        )}
                      </div>
                    )}
                  </dd>
                </div>
              )}
            </div>
            {amusementData.attributes.tags !== null && <TagsItem items={amusementData.attributes} type="tag" />}
          </dl>
          <dl className={styles.staff}>
            {amusementData.attributes.studio && (
              <div>
                <dt>스튜디오</dt>
                <dd className="seed">{truncateString(amusementData.attributes.studio, 72)}</dd>
              </div>
            )}
            {amusementData.attributes.distributor && (
              <div>
                <dt>제작</dt>
                <dd className="seed">{truncateString(amusementData.attributes.distributor, 72)}</dd>
              </div>
            )}
            {amusementData.attributes.publisher !== '?' && (
              <div>
                <dt>배급</dt>
                <dd className="seed">{truncateString(amusementData.attributes.publisher, 72)}</dd>
              </div>
            )}
            {amusementData.attributes.director && (
              <div>
                <dt>감독</dt>
                <dd className="seed">{truncateString(amusementData.attributes.director, 72)}</dd>
              </div>
            )}
            {amusementData.attributes.creator !== '?' && (
              <div>
                <dt>주요 제작자</dt>
                <dd className="seed">{truncateString(amusementData.attributes.creator, 72)}</dd>
              </div>
            )}
            {amusementData.attributes.cast !== '?' && (
              <>
                {amusementData.attributes.cast !== null && (
                  <div>
                    <dt>주요 성우</dt>
                    <dd className="seed">{truncateString(amusementData.attributes.cast, 72)}</dd>
                  </div>
                )}
              </>
            )}
            {amusementData.attributes.comment && (
              <div className={styles.comment}>
                <dt>작품 추가 정보</dt>
                <dd
                  dangerouslySetInnerHTML={{
                    __html: amusementData.attributes.comment.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            )}
            {amusementData.attributes.synopsys && (
              <div className={styles.synopsys}>
                <dt>시놉시스</dt>
                <dd
                  className="lang"
                  dangerouslySetInnerHTML={{
                    __html: amusementData.attributes.synopsys.replace(/\n/g, '<br />'),
                  }}
                />
              </div>
            )}
          </dl>
          {amusementData.attributes.category !== 'game_fan' && (
            <div className={styles.more}>
              ...{' '}
              <button type="button" onClick={() => handleButtonClick(String(amusementId).substring(14))}>
                <span>더보기</span>
              </button>
            </div>
          )}
        </div>
        <div
          className={`${styles.poster} ${amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan' ? styles['poster-game'] : ''}`}
        >
          <div className={styles.images}>
            <Image
              src={amusementData.attributes.posterDefault}
              alt=""
              width={
                amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                  ? 460
                  : 390
              }
              height={
                amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                  ? 215
                  : 560
              }
              unoptimized
              priority
              className={`${isActive ? styles.active : ''}`}
            />
            {amusementData.attributes.posterOther && (
              <Image
                src={amusementData.attributes.posterOther}
                alt=""
                width={
                  amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? 460
                    : 390
                }
                height={
                  amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan'
                    ? 215
                    : 560
                }
                unoptimized
                priority
                className={`${!isActive ? styles.active : ''}`}
              />
            )}
          </div>
          {amusementData.attributes.posterOther && (
            <button type="button" onClick={togglePoster}>
              <span>다른 포스터/비주얼 보기</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1">
                  <path
                    d="M4.58333 2.25006L2.25 4.58339L4.58333 6.91673V5.16673H8.66667C10.2846 5.16673 11.5833 6.46542 11.5833 8.0834C11.5833 9.70137 10.2846 11.0001 8.66667 11.0001H2.83333V12.1667H8.66667C10.915 12.1667 12.75 10.3318 12.75 8.0834C12.75 5.83503 10.915 4.00006 8.66667 4.00006H4.58333V2.25006Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
      {amusementData.attributes.bfree !== null && (
        <section>
          <h2 className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>베리어프리 작품 보기</h2>
          {bfreeService(amusementData.attributes.bfree)}
        </section>
      )}
      {(isMoeviewsError || isMoeviewsLoading) && (
        <section className={styles.not}>
          {isMoeviewsError && (
            <p className={styles['amusement-error']}>
              영상을 불러오지 못했습니다. 삭제된 영상이거나 인터넷 속도가 느립니다.{' '}
              <Anchor href="/amusement">뒤로가기</Anchor>
            </p>
          )}
          {isMoeviewsLoading && <p className={styles['amusement-loading']}>리뷰 불러오는 중...</p>}
        </section>
      )}
      {data && !isMoeviewsLoading && !isMoeviewsError && (
        <section>
          {amusementData.attributes.category === 'game' || amusementData.attributes.category === 'game_fan' ? (
            <h2 className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>
              {amusementData.attributes.category === 'game'
                ? '유튜브 리뷰 & 실황모음'
                : checkKorean(amusementData.attributes.title)}
            </h2>
          ) : (
            <h2 className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>유튜브 리뷰 & 요약모음</h2>
          )}
          <div className={styles.list}>
            {Object.keys(data.moeviews).length > 0 && Array.isArray(data.moeviews) ? (
              data.moeviews.map((moeview: MoeviewData) => (
                <div className={styles.item} key={moeview.id}>
                  <MoeviewMeta key={moeview.idx} moeview={moeview} />
                </div>
              ))
            ) : (
              <div className={styles.warning}>
                <p>리뷰 영상 등록 전이거나 등록된 리뷰가 삭제되어 등록된 리뷰가 아직 업습니다..</p>
                <p>
                  운영자에게 영상 등록을{' '}
                  <button type="button" data-video={amusementData.id} onClick={handleRequest}>
                    요청
                  </button>{' '}
                  해 주세요!
                </p>
              </div>
            )}
          </div>
        </section>
      )}
      {amusementData.attributes.related !== null && Array.isArray(amusementData.attributes.related) && (
        <section>
          <h2 className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>관련 영상</h2>
          {(isMaxLarge && amusementData.attributes.related.length < 5) ||
          (isLarge && amusementData.attributes.related.length < 4) ||
          (isMedium && amusementData.attributes.related.length < 3) ||
          (isExtraSmall && amusementData.attributes.related.length < 2) ? (
            <div className={`${styles.list} ${styles['related-list']}`}>
              {amusementData.attributes.related.flatMap((item) =>
                Object.entries(item).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <Related
                      videoId={String(value)}
                      videoDescription={key}
                      title={
                        amusementData.attributes.titleKorean !== null
                          ? amusementData.attributes.titleKorean
                          : amusementData.attributes.title
                      }
                      sorting={'amusement'}
                    />
                  </React.Fragment>
                )),
              )}
            </div>
          ) : (
            <div className={`${styles['related-list']} ${!isMobile || isDesktop ? '' : styles['short-view']}`}>
              <Slider ref={sliderRef} {...settings}>
                {amusementData.attributes.related.flatMap((item) =>
                  Object.entries(item).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Related
                        videoId={String(value)}
                        videoDescription={key}
                        title={
                          amusementData.attributes.titleKorean !== null
                            ? amusementData.attributes.titleKorean
                            : amusementData.attributes.title
                        }
                        sorting={'amusement'}
                      />
                    </React.Fragment>
                  )),
                )}
              </Slider>
              {!isMobile || isDesktop ? (
                <>
                  {((isMaxLarge && amusementData.attributes.related.length > 4) ||
                    (isLarge && amusementData.attributes.related.length > 3) ||
                    (isMedium && amusementData.attributes.related.length > 2) ||
                    (isExtraSmall && amusementData.attributes.related.length > 1)) && (
                    <>
                      <button
                        type="button"
                        className={`${styles.prev} ${styles.move}`}
                        onClick={() => sliderRef.current?.slickPrev()}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9.92902 12.0006L13.75 8.17964C14.164 7.76564 14.164 7.09364 13.75 6.67964C13.336 6.26564 12.664 6.26564 12.25 6.67964L7.63602 11.2936C7.24502 11.6846 7.24502 12.3176 7.63602 12.7076L12.25 17.3216C12.664 17.7356 13.336 17.7356 13.75 17.3216C14.164 16.9076 14.164 16.2356 13.75 15.8216L9.92902 12.0006Z"
                            fill="white"
                          />
                        </svg>
                        <span>이전으로 이동</span>
                      </button>
                      <button
                        type="button"
                        className={`${styles.next} ${styles.move}`}
                        onClick={() => sliderRef.current?.slickNext()}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.071 12.0006L9.24995 8.17964C8.83595 7.76564 8.83595 7.09364 9.24995 6.67964C9.66395 6.26564 10.336 6.26564 10.75 6.67964L15.364 11.2936C15.755 11.6846 15.755 12.3176 15.364 12.7076L10.75 17.3216C10.336 17.7356 9.66395 17.7356 9.24995 17.3216C8.83595 16.9076 8.83595 16.2356 9.24995 15.8216L13.071 12.0006Z"
                            fill="white"
                          />
                        </svg>
                        <span>다음으로 이동</span>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {amusementData.attributes.related.length > 1 && (
                    <>
                      <div className={`${styles.dummy} ${styles.left}`} />
                      <div className={`${styles.dummy} ${styles.right}`} />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      )}
      {selectedAmusementId && selectedAmusement && (
        <AmusementDetail
          amusement={amusementData.attributes}
          sorting="amusement"
          onClose={handleCloseAmusementDetail}
        />
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const amusementId = context.params?.amusementId;
  let amusementData = null;
  let logoData = null;

  if (amusementId && typeof amusementId === 'string') {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/amusement?amusementId=${amusementId.substring(14)}`,
    );
    const amusementResponse = (await response.json()) as {
      logoImage: AmusementPermalinkData;
      data: AmusementPermalinkData;
    };

    amusementData =
      formatDateDetail(amusementResponse.data.attributes.createdAt) === amusementId.substring(0, 14) &&
      amusementResponse.data;
    logoData = amusementResponse.logoImage;
  }

  if (!amusementData) {
    return {
      props: {
        amusementData: null,
        logoData: null,
      },
    };
  }

  if (amusementData && !logoData) {
    return {
      props: {
        amusementData,
        amusementId,
        logoData: null,
      },
    };
  }

  return {
    props: {
      amusementData,
      amusementId,
      logoData,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
