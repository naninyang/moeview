import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { isDesktop } from 'react-device-detect';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AmusementData, MoeviewData, MoeviewPermalinkData } from '@/types';
import { formatDateDetail } from '@/lib/apis';
import Seo, { originTitle } from '@/components/Seo';
import YouTubeController from '@/components/YouTubeController';
import Anchor from '@/components/Anchor';
import { CategoryName } from '@/components/CategoryName';
import { TagCategoryName } from '@/components/TagCategory';
import { TagName } from '@/components/TagName';
import { AnimeName } from '@/components/AnimeName';
import { RatingsDrama } from '@/components/RatingsDrama';
import { formatDuration } from '@/components/FormatDuration';
import { formatDate } from '@/components/FormatDate';
import { formatTime } from '@/components/FormatTime';
import { SupportLang } from '@/components/SupportLang';
import AmusementDetail from '@/components/AmusementDetail';
import Related from '@/components/Related';
import styles from '@/styles/Moeview.module.sass';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ADiconBlack,
  Abc,
  AmazonOrigin,
  AmazonOriginal,
  Anibox,
  Animax,
  Aniplus,
  AppleOrigin,
  AppleOriginal,
  Atx,
  BackButton,
  Bbc,
  CCiconBlack,
  ClipboardIcon,
  Daewon,
  DisneyOrigin,
  DisneyOriginal,
  Ena,
  Fujitv,
  Hbomax,
  Hulu,
  Jtbc,
  Kbs2tv,
  Mbc,
  Mbs,
  NetflixOrigin,
  NetflixOriginal,
  Nippontv,
  Ocn,
  Paramount,
  Peacock,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  Sbs,
  SeriesOrigin,
  Sky,
  StarOriginal,
  Syfy,
  Tbs,
  Tokyomx,
  Tooniverse,
  TvingOnly,
  TvingOrigin,
  TvingOriginal,
  Tvn,
  Tvtokyo,
  WatchaOnly,
  WatchaOrigin,
  WatchaOriginal,
  WavveFirstrun,
  WavveOnly,
  WavveOrigin,
  WavveOriginal,
  Wowow,
} from '@/components/Icons';

const rem = (px: number): string => `${px / 16}rem`;

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
  const large = useMediaQuery({ query: `(min-width: ${rem(992)})` });
  useEffect(() => {
    setIsLarge(large);
  }, [large]);
  return isLarge;
}

const RelatedList = ({ related }: { related: any }) => {
  const isMobile = useMobile();
  const isExtraSmall = useExtraSmall();
  const isMedium = useMedium();
  const isLarge = useLarge();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5200,
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  };

  const validData = related.filter((data: any) => data.related !== null && Array.isArray(data.related));
  if (validData.length > 0) {
    return (
      <PerfectScrollbar className={styles['scrollbar-container']}>
        <aside className={validData.length > 1 ? styles['items-aside'] : ''}>
          <h2>관련 영상</h2>
          {isLarge ? (
            <div className={styles.list}>
              {validData.map((data: any, index: number) => (
                <React.Fragment key={index}>
                  {data.related.flatMap((item: any) =>
                    Object.entries(item).map(([key, value]) => (
                      <Related
                        videoId={String(value)}
                        videoDescription={key}
                        key={key}
                        title={data.titleKorean ? data.titleKorean : data.title}
                      />
                    )),
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className={styles.list}>
              {validData.map((data: any, index: number) => (
                <React.Fragment key={index}>
                  <h3>{data.titleKorean ? data.titleKorean : data.title}</h3>
                  {(isMedium && data.related.length < 3) || (isExtraSmall && data.related.length < 2) ? (
                    <div className={styles.items}>
                      {data.related.flatMap((item: any) =>
                        Object.entries(item).map(([key, value]) => (
                          <Related
                            videoId={String(value)}
                            videoDescription={key}
                            key={key}
                            title={data.titleKorean ? data.titleKorean : data.title}
                          />
                        )),
                      )}
                    </div>
                  ) : (
                    <div className={styles.slider}>
                      <Slider ref={sliderRef} {...settings}>
                        {data.related.flatMap((item: any) =>
                          Object.entries(item).map(([key, value]) => (
                            <Related
                              videoId={String(value)}
                              videoDescription={key}
                              key={key}
                              title={data.titleKorean ? data.titleKorean : data.title}
                            />
                          )),
                        )}
                      </Slider>
                      {!isMobile || isDesktop ? (
                        <>
                          {((isLarge && data.related.length > 3) ||
                            (isMedium && data.related.length > 2) ||
                            (isExtraSmall && data.related.length > 1)) && (
                            <>
                              <button
                                type="button"
                                className={`${styles.prev} ${styles.move}`}
                                onClick={() => sliderRef.current?.slickPrev()}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.92902 12.0006L13.75 8.17964C14.164 7.76564 14.164 7.09364 13.75 6.67964C13.336 6.26564 12.664 6.26564 12.25 6.67964L7.63602 11.2936C7.24502 11.6846 7.24502 12.3176 7.63602 12.7076L12.25 17.3216C12.664 17.7356 13.336 17.7356 13.75 17.3216C14.164 16.9076 14.164 16.2356 13.75 15.8216L9.92902 12.0006Z"
                                    fill="black"
                                  />
                                </svg>
                                <span>이전으로 이동</span>
                              </button>
                              <button
                                type="button"
                                className={`${styles.next} ${styles.move}`}
                                onClick={() => sliderRef.current?.slickNext()}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.071 12.0006L9.24995 8.17964C8.83595 7.76564 8.83595 7.09364 9.24995 6.67964C9.66395 6.26564 10.336 6.26564 10.75 6.67964L15.364 11.2936C15.755 11.6846 15.755 12.3176 15.364 12.7076L10.75 17.3216C10.336 17.7356 9.66395 17.7356 9.24995 17.3216C8.83595 16.9076 8.83595 16.2356 9.24995 15.8216L13.071 12.0006Z"
                                    fill="black"
                                  />
                                </svg>
                                <span>다음으로 이동</span>
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {data.related.length > 1 && (
                            <>
                              <div className={`${styles.dummy} ${styles.left}`} />
                              <div className={`${styles.dummy} ${styles.right}`} />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </aside>
      </PerfectScrollbar>
    );
  } else {
    return null;
  }
};

const ReviewList = ({ review, current }: { review: string; current: number }) => {
  const [amusementData, setAmusementData] = useState<MoeviewData[] | null>(null);
  const isExtraSmall = useExtraSmall();

  useEffect(() => {
    async function fetchAmusementData() {
      const amusementIds = review.match(/\d+/g);

      if (amusementIds) {
        Promise.all(
          amusementIds.map((id: string) =>
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moeviewAmusement?page=1&amusementId=${id}`).then((response) =>
              response.json(),
            ),
          ),
        )
          .then((data: MoeviewData[]) => {
            setAmusementData(data);
          })
          .catch((error) => {
            console.error('Failed to fetch amusement data:', error);
          });
      }
    }

    fetchAmusementData();
  }, []);

  const validItems: MoeviewData[] = [];

  amusementData?.forEach((data: any) => {
    data.moeviews?.forEach((item: any) => {
      if (item.idx !== current && !validItems.some((v) => v.idx === item.idx)) {
        validItems.push(item);
      }
    });
  });

  if (validItems.length > 0) {
    return (
      <aside className={styles['items-related']}>
        <h2>작품의 다른 리뷰 & 요약모음</h2>
        <div className={styles.list}>
          {validItems.map((item, index) => (
            <div className={styles.item} key={index}>
              <Anchor href={`/moeview/${item.idx}`}>
                {isExtraSmall ? (
                  <>
                    <div className={styles.amusement}>
                      <Image
                        src={`https://i.ytimg.com/vi/${item.video}/hqdefault.jpg`}
                        width={640}
                        height={480}
                        unoptimized
                        priority
                        alt={item.subject}
                      />
                      <strong>
                        <em>
                          {item.amusementData.titleKorean ? item.amusementData.titleKorean : item.amusementData.title}
                        </em>
                        리뷰
                      </strong>
                    </div>
                    <span>{item.subject}</span>
                  </>
                ) : (
                  <>
                    <Image
                      src={`https://i.ytimg.com/vi/${item.video}/hqdefault.jpg`}
                      width={640}
                      height={480}
                      unoptimized
                      priority
                      alt={item.subject}
                    />
                    <span>
                      [{item.amusementData.titleKorean ? item.amusementData.titleKorean : item.amusementData.title} |{' '}
                      리뷰] {item.subject}
                    </span>
                  </>
                )}
              </Anchor>
            </div>
          ))}
        </div>
      </aside>
    );
  } else {
    return null;
  }
};

const ReviewContent = ({ data }: { data: any }) => {
  const renderChildren = (children: any) => {
    return children.map((child: any, index: number) => {
      if (child.type === 'text') {
        if (child.bold) {
          return <strong key={index}>{child.text}</strong>;
        }
        if (child.strikethrough) {
          return <s key={index}>{child.text}</s>;
        }
        if (child.bold === undefined && child.strikethrough === undefined) {
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{
                __html: child.text.replace(/\n/g, '<br />'),
              }}
            />
          );
        }
      } else if (child.type === 'link') {
        return (
          <Anchor key={index} href={child.url}>
            {renderChildren(child.children)}
          </Anchor>
        );
      }
    });
  };

  const renderContent = (content: any) => {
    return content.map((item: any, index: number) => {
      if (item.type === 'paragraph') {
        return <p key={index}>{renderChildren(item.children)}</p>;
      } else if (item.type === 'list') {
        const ListComponent = item.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListComponent key={index}>
            {item.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex}>{renderChildren(listItem.children)}</li>
            ))}
          </ListComponent>
        );
      }
    });
  };

  return <div className={styles['review-comment']}>{renderContent(data)}</div>;
};

export function TagsItem({ items, type }: { items: any; type: string }) {
  const excludeTags = ['anime', 'film', 'drama'];
  const filteredTags = items.tags && items.tags.filter((items: any) => !excludeTags.includes(items));

  if (!filteredTags) {
    return null;
  }

  if (type === 'tag') {
    return (
      <div className={styles.tags}>
        <dt>장르</dt>
        <dd className="seed">
          {filteredTags.map((tag: string, index: number) => (
            <span key={index}>{`#${TagName(tag, 'tag')}`} </span>
          ))}
          {items.category && <span> #{TagCategoryName(items.category)}</span>}
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

function ADCC({ items }: { items: any }) {
  const adcc = items && items.filter((items: any) => items);

  if (!adcc) {
    return null;
  }

  return (
    <div className={styles['ad-cc']}>
      <dt>자막/더빙</dt>
      <dd className="seed">
        {adcc.map((item: string, index: number) => (
          <span key={index}>{SupportLang(item)}</span>
        ))}
      </dd>
    </div>
  );
}

export function MoeviewMeta({ moeviewData, moeviewId }: { moeviewData: any; moeviewId: number }) {
  const [relations, setRelations] = useState<MoeviewData | null>(null);
  const [error, setError] = useState(null);
  const [isRelationsLoading, setIsRelationsLoading] = useState(false);

  const moeviewMetaData = moeviewData.reviewData;

  const loadRelations = async () => {
    if (moeviewData) {
      if (moeviewData.attributes && moeviewData.attributes.relations) {
        setIsRelationsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/relations?relations=${moeviewData.attributes.relations}&type=moeview`);
          const relationsResponse = await response.json();
          setRelations(relationsResponse);
        } catch (err) {
          console.error(err);
        } finally {
          setIsRelationsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    loadRelations();
  }, [moeviewData]);

  const [isMore, setIsMore] = useState(false);
  const moreToggle = () => {
    setIsMore(!isMore);
  };

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
      {moeviewData && moeviewMetaData ? (
        <>
          {Object.keys(moeviewMetaData).length > 0 && (
            <>
              {moeviewMetaData.error === 'Video not found or is deleted/private' ? (
                <div className={`${styles.preview} ${styles.more} ${styles['preview-dummy']}`}>
                  <div className={`${styles.dummy} ${styles.skeleton}`} />
                  <div className={`${styles.youtube} ${styles.more}`}>
                    <h1>
                      유튜버가 영상을 삭제했거나 비공개 처리한 영상입니다. 관리자에게{' '}
                      <button type="button" data-video={moeviewData.attributes.video} onClick={handleReport}>
                        모애뷰 운영자에게 제보
                      </button>
                      해 주세요.
                    </h1>
                    <div className={styles.detail}>
                      <div className={`${styles.avatar} ${styles.skeleton}`} />
                      <div className={styles.user}>
                        <cite className={styles.skeleton} />
                        <time className={styles.skeleton} />
                      </div>
                    </div>
                    <div className={`${styles.learnmore} ${styles.skeleton}`} />
                  </div>
                </div>
              ) : (
                <div className={`${styles.preview} preview`}>
                  <div className={styles.video}>
                    {moeviewData.attributes.embeddingOff ? (
                      <div className={styles.embeddingOff}>
                        <Image
                          src={moeviewMetaData.thumbnailUrl}
                          width={1920}
                          height={1080}
                          alt=""
                          unoptimized
                          priority
                        />
                        <div>
                          <p>유튜버 또는 원 저작권자가 유튜브에서만 재생할 수 있도록 설정한 콘텐츠 입니다.</p>
                          <p>
                            <Anchor href={`https://youtu.be/${moeviewData.attributes.video}`}>여기</Anchor>를 누르시면
                            유튜브 해당 영상으로 이동합니다.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <YouTubeController
                        videoId={moeviewData.attributes.video}
                        videoImage={moeviewMetaData.thumbnailUrl}
                      />
                    )}
                  </div>
                  <div className={`${styles.youtube} ${isMore ? styles.more : ''}`}>
                    <h1>{moeviewMetaData.title}</h1>
                    <div className={styles.detail}>
                      <Image
                        src={`${moeviewMetaData.channelProfileImageUrl === undefined ? 'https://cdn.dev1stud.io/semoview/-/' + moeviewMetaData.ownerUrl?.split('@')[1] + '.webp' : moeviewMetaData.channelProfileImageUrl}`}
                        width="36"
                        height="36"
                        alt=""
                        unoptimized
                        priority
                      />
                      <div className={styles.user}>
                        <cite>{moeviewMetaData.channelTitle}</cite>
                        <time dateTime={moeviewMetaData.publishedAt}>
                          {formatDate(`${moeviewMetaData.publishedAt}`)}
                        </time>
                      </div>
                      <button type="button" onClick={moreToggle}>
                        {isMore ? '닫기' : '더 보기'}
                      </button>
                    </div>
                    {moeviewMetaData.description ? (
                      <div className={styles.learnmore}>
                        <em>{formatDuration(moeviewMetaData.duration, 'moeview')}</em>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: moeviewMetaData.description.replace(/\n/g, '<br />'),
                          }}
                        />
                        {moeviewData.attributes.relations && relations && !isRelationsLoading && (
                          <dl>
                            <dt>관련 영상</dt>
                            {isRelationsLoading ? (
                              <dd>관련 영상 불러오는 중</dd>
                            ) : (
                              Array.isArray(relations) &&
                              relations
                                .filter((relation) => relation.idx !== moeviewId)
                                .map((relation) => (
                                  <dd key={relation.idx}>
                                    <Anchor href={`/moeview/${relation.idx}`}>{relation.subject}</Anchor>
                                  </dd>
                                ))
                            )}
                          </dl>
                        )}
                      </div>
                    ) : (
                      <div className={styles.learnmore}>
                        <strong>유튜버가 더보기 정보를 등록하지 않았습니다.</strong>
                      </div>
                    )}
                    {moeviewData.attributes.worst && (
                      <div className={styles.worst} aria-label="Worst 영상">
                        <strong className="number">Worst</strong>
                      </div>
                    )}
                    {(moeviewData.attributes.embeddingOff === null ||
                      moeviewData.attributes.embeddingOff === false) && (
                      <div className={styles.embed}>
                        <p>
                          🚫 이 영상이 유튜브에서만 볼 수 있게 설정된 영상이라면 관리자에게{' '}
                          <button type="button" data-video={moeviewData.attributes.video} onClick={handleReport}>
                            모애뷰 운영자에게 제보해
                          </button>
                          주세요.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className={`${styles.preview} ${styles.more} ${styles['preview-dummy']}`}>
          <div className={styles.notice} hidden>
            <p>불러오는 중</p>
          </div>
          <div className={styles.video}>
            <div className={`${styles.dummy} ${styles.skeleton}`} />
          </div>
          <div className={`${styles.youtube} ${styles.more}`} aria-hidden="true">
            <h1 className={styles.skeleton} />
            <div className={styles.detail}>
              <div className={`${styles.avatar} ${styles.skeleton}`} />
              <div className={styles.user}>
                <cite className={styles.skeleton} />
                <time className={styles.skeleton} />
              </div>
            </div>
            <div className={`${styles.learnmore} ${styles.skeleton}`} />
          </div>
        </div>
      )}
    </>
  );
}

export default function MoeviewDetail({
  moeviewData,
  moeviewId,
}: {
  moeviewData: MoeviewPermalinkData | null;
  moeviewId: number;
}) {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('backhistory', router.asPath);
  }, [router.asPath]);

  const previousPageHandler = () => {
    const homePage = sessionStorage.getItem('home');
    const previousPage = sessionStorage.getItem('semoview');
    let refer = document.referrer !== '' || document.referrer.includes(window.location.origin);
    if (!refer) {
      router.push('/reviews');
    } else if (homePage) {
      router.push('/reviews');
    } else if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push('/');
    }
  };

  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  const [selectedAmusementId, setSelectedAmusementId] = useState<string | null>(null);

  const handleButtonClick = (id: string) => {
    setSelectedAmusementId(id);
  };

  const handleCloseAmusementDetail = () => {
    setSelectedAmusementId(null);
  };

  const selectedAmusement = moeviewData?.amusementData.find((amusement) => amusement.id === selectedAmusementId);
  useEffect(() => {
    const preventScroll = (e: Event): void => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent): void => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    if (selectedAmusement !== undefined) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    }
    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
    };
  }, [selectedAmusement]);

  if (!moeviewData) {
    if (timeoutReached) {
      return (
        <main className={styles.moeview}>
          <div className="top-link">
            <Anchor href="/">
              <BackButton />
              <span>뒤로가기</span>
            </Anchor>
          </div>
          <article className={styles['article-moeview']}>
            <div className={`${styles.preview} preview`}>
              <div className={styles.video}>
                <YouTubeController
                  videoId={'ARJ5bXkof30'}
                  videoImage={'https://i.ytimg.com/vi/ARJ5bXkof30/hqdefault.jpg'}
                />
              </div>
              <div className={styles.youtube}>
                <h1>없는 페이지이므로 체념하고 돌아가세요! 404 NOT FOUND PAGE!</h1>
              </div>
            </div>
          </article>
        </main>
      );
    } else {
      return (
        <main className={`${styles.moeview} ${styles['moeview-loading']}`}>
          <Seo
            pageTitles={`404 NOT FOUND - ${originTitle}`}
            pageTitle={`404 NOT FOUND`}
            pageDescription={`서버 에러 또는 삭제/비공개된 영상`}
            pageImg={`https://moe.dev1stud.io/missing.webp`}
            pageOgType={'video.other'}
            pageImgWidth={1920}
            pageImgHeight={1080}
          />
          <p className={styles.loading}>영상 불러오는 중...</p>
        </main>
      );
    }
  }

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

  function AmusementInfo({ amusementData }: { amusementData: any }) {
    return (
      <>
        <dl className={styles.summary}>
          <dt>
            {amusementData.category !== 'anime_film' ? (
              <>
                {(amusementData.category === 'anime' ||
                  amusementData.category === 'ott_film' ||
                  amusementData.category === 'ott_anime') && (
                  <em className={styles[amusementData.broadcast]}>
                    {amusementData.broadcast === 'ENA' && (
                      <>
                        <Ena /> <span>ENA</span>
                      </>
                    )}
                    {amusementData.broadcast === 'JTBC' && (
                      <>
                        <Jtbc /> <span>JTBC</span>
                      </>
                    )}
                    {amusementData.broadcast === 'KBS2' && (
                      <>
                        <Kbs2tv /> <span>KBS 2TV</span>
                      </>
                    )}
                    {amusementData.broadcast === 'MBC' && (
                      <>
                        <Mbc /> <span>MBC</span>
                      </>
                    )}
                    {amusementData.broadcast === 'OCN' && (
                      <>
                        <Ocn /> <span>OCN</span>
                      </>
                    )}
                    {amusementData.broadcast === 'SBS' && (
                      <>
                        <Sbs /> <span>SBS</span>
                      </>
                    )}
                    {amusementData.broadcast === 'tvN' && (
                      <>
                        <Tvn /> <span>tvN</span>
                      </>
                    )}
                    {amusementData.broadcast === 'ABC' && (
                      <>
                        <Abc /> <span>ABC</span>
                      </>
                    )}
                    {amusementData.wavveSeries &&
                      amusementData.wavveSeries.map((item: string, index: number) => (
                        <React.Fragment key={index}>
                          {item === 'bbc' && (
                            <>
                              <Bbc />
                              <span>BBC</span>
                            </>
                          )}
                          {item === 'hbomax' && (
                            <>
                              <Hbomax />
                              <span>HBO맥스</span>
                            </>
                          )}
                          {item === 'hulu' && (
                            <>
                              <Hulu />
                              <span>Hulu</span>
                            </>
                          )}
                          {item === 'peacock' && (
                            <>
                              <Peacock />
                              <span>Peacock</span>
                            </>
                          )}
                          {item === 'sky' && (
                            <>
                              <Sky />
                              <span>SKY</span>
                            </>
                          )}
                          {item === 'syfy' && (
                            <>
                              <Syfy />
                              <span>SYFY</span>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    {(amusementData.animeBroadcast1 !== null || amusementData.animeBroadcast2 !== null) && (
                      <>
                        {amusementData.animeBroadcast1 === 'tokyomx' && (
                          <>
                            <Tokyomx /> <span>도쿄MX</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'tvtokyo' && (
                          <>
                            <Tvtokyo /> <span>테레토</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'fujitv' && (
                          <>
                            <Fujitv /> <span>후지테레비</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'mbs' && (
                          <>
                            <Mbs /> <span>MBS</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'tbs' && (
                          <>
                            <Tbs /> <span>TBS</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'atx' && (
                          <>
                            <Atx /> <span>AT-X</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'nippontv' && (
                          <>
                            <Nippontv /> <span>닛테레</span>
                          </>
                        )}
                        {amusementData.animeBroadcast1 === 'wowow' && (
                          <>
                            <Wowow /> <span>WOWOW</span>
                          </>
                        )}
                        {amusementData.animeBroadcast2 === 'aniplus' && (
                          <>
                            {amusementData.animeBroadcast1 !== null && '|'}
                            <Aniplus />
                            <span>애니플러스</span> 방영{' '}
                          </>
                        )}
                        {amusementData.animeBroadcast2 === 'daewon' && (
                          <>
                            {amusementData.animeBroadcast1 !== null && '|'}
                            <Daewon /> <span>애니원</span> 방영{' '}
                          </>
                        )}
                        {amusementData.animeBroadcast2 === 'anibox' && (
                          <>
                            {amusementData.animeBroadcast1 !== null && '|'}
                            <Anibox /> <span>애니박스</span> 방영{' '}
                          </>
                        )}
                        {amusementData.animeBroadcast2 === 'tooniverse' && (
                          <>
                            {amusementData.animeBroadcast1 !== null && '|'}
                            <Tooniverse /> <span>투니버스</span> 방영{' '}
                          </>
                        )}
                        {amusementData.animeBroadcast2 === 'animax' && (
                          <>
                            {amusementData.animeBroadcast1 !== null && '|'}
                            <Animax /> <span>애니맥스</span> 방영{' '}
                          </>
                        )}
                      </>
                    )}
                    {CategoryName(amusementData.category)}
                    {amusementData.ott === null && amusementData.ottAddr !== null && ' | 단편영화'}
                  </em>
                )}
                {amusementData.category === 'ott_anime_film' && <em>영화</em>}
              </>
            ) : (
              <>{amusementData.category === 'anime_film' && <em>영화</em>}</>
            )}
            {amusementData.category === 'anime' && <em>{AnimeName(amusementData.anime)}</em>}
            {amusementData.ott === 'amazonOriginal' && (
              <cite>
                <AmazonOriginal /> AMAZON ORIGINAL
              </cite>
            )}
            {amusementData.ott === 'appleOriginal' && (
              <cite>
                <AppleOriginal /> An Apple Original
              </cite>
            )}
            {amusementData.ott === 'appleFilm' && (
              <cite>
                <AppleOriginal /> Apple Original Films
              </cite>
            )}
            {amusementData.ott === 'disneyOriginal' && (
              <cite>
                <DisneyOriginal /> Disney Original
              </cite>
            )}
            {amusementData.ott === 'disneyStar' && (
              <cite>
                <StarOriginal /> Star Original
              </cite>
            )}
            {(amusementData.ott === 'netflixSeries' ||
              amusementData.ott === 'netflixOriginal' ||
              amusementData.ott === 'netflixAnime') && (
              <cite>
                <NetflixOriginal /> A NETFLIX Series
              </cite>
            )}
            {(amusementData.ott === 'netflixPresents' ||
              amusementData.ott === 'netflixFilm' ||
              amusementData.ott === 'netflixAnimeFilm') && (
              <cite>
                <NetflixOriginal /> NETFLIX Presents
              </cite>
            )}
            {amusementData.ott === 'netflixDocumentary' && (
              <cite>
                <NetflixOriginal /> A NETFLIX Documentary
              </cite>
            )}
            {amusementData.ott === 'tvingOriginal' && (
              <cite>
                <TvingOriginal /> 티빙 오리지널
              </cite>
            )}
            {amusementData.ott === 'tvingOnly' && (
              <cite>
                <TvingOnly /> 오직 티빙에서
              </cite>
            )}
            {amusementData.ott === 'watchaOriginal' && (
              <cite>
                <WatchaOriginal /> 왓챠 오리지널
              </cite>
            )}
            {amusementData.ott === 'watchaExclusive' && (
              <cite>
                <WatchaOnly /> 오직 왓챠에서
              </cite>
            )}
            {amusementData.ott === 'wavveOriginal' && (
              <cite>
                <WavveOriginal /> 웨이브 오리지널
              </cite>
            )}
            {amusementData.ott === 'wavveOnly' && (
              <cite>
                <WavveOnly /> 오직 웨이브에서
              </cite>
            )}
            {amusementData.ott === 'waveOnly' && (
              <cite>
                <WavveOnly /> 웨이브 해외시리즈
              </cite>
            )}
            {amusementData.ott === 'waveFirstrun' && (
              <cite>
                <WavveFirstrun /> 웨이브 해외시리즈
              </cite>
            )}
            {amusementData.ott === 'paramount' && (
              <cite>
                <Paramount /> Paramaount+
              </cite>
            )}
            {amusementData.ott === 'amazonOriginal' ? (
              <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                {amusementData.rating === 'all' && 'All'}
                {amusementData.rating === 'a7' && '7+'}
                {amusementData.rating === 'b12' && '13+'}
                {amusementData.rating === 'c15' && '16+'}
                {amusementData.rating === 'd19' && '18+'}
              </i>
            ) : (
              <>
                {(amusementData.category === 'drama' ||
                  amusementData.category === 'ott_drama_enter' ||
                  amusementData.category === 'ott_drama' ||
                  amusementData.category === 'ott_anime' ||
                  amusementData.anime === 'tva' ||
                  amusementData.anime === 'ova') && (
                  <>
                    {amusementData.rating === 'all' ? (
                      <>
                        <i className={`${styles.drama} ${styles.all} number`}>{RatingsDrama(amusementData.rating)}</i>
                        <span>전체 이용가</span>
                      </>
                    ) : (
                      <>
                        {amusementData.rating === 'd19' ? (
                          <>
                            <i className={`${styles.drama} ${styles.d19} number`}>
                              {RatingsDrama(amusementData.rating)}
                            </i>
                            <span>세 미만 이용불가</span>
                          </>
                        ) : (
                          <>
                            <i className={`${styles.drama} number`}>{RatingsDrama(amusementData.rating)}</i>
                            <span>세 이상 이용가</span>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {(amusementData.category === 'film' ||
                  amusementData.category === 'anime_film' ||
                  amusementData.category === 'ott_anime_film' ||
                  amusementData.category === 'ott_film' ||
                  amusementData.category === 'ott_documentary_film' ||
                  amusementData.anime === 'film') && (
                  <>
                    {amusementData.rating === 'all' && (
                      <>
                        <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                      </>
                    )}
                    {amusementData.rating === 'b12' && (
                      <>
                        <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                      </>
                    )}
                    {amusementData.rating === 'c15' && (
                      <>
                        <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                      </>
                    )}
                    {amusementData.rating === 'd19' && (
                      <>
                        <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {amusementData.ratingCustom && (
              <div className={styles.custom}>
                {amusementData.ott === 'amazonOriginal' && !amusementData.ratingCustom && (
                  <button type="button" onClick={amazonRatingHandler}>
                    <i />
                    <span>아마존 자체 심의등급 작품</span>
                  </button>
                )}
                {amusementData.ott === 'amazonOriginal' && amusementData.ratingCustom && (
                  <button type="button" onClick={regionRatingHandler}>
                    <i />
                    <span>한국 리전 아마존 시청 불가 작품</span>
                  </button>
                )}
                {amusementData.ott !== 'amazonOriginal' && amusementData.ratingCustom && (
                  <button type="button" onClick={customRatingHandler}>
                    <i />
                    <span>모애뷰 자체설정 심의등급 안내</span>
                  </button>
                )}
              </div>
            )}
            {amusementData.ott !== null && amusementData.ottAddr !== null && (
              <>
                {amusementData.ott !== 'paramount' && (
                  <Anchor href={amusementData.ottAddr}>
                    {amusementData.ott === 'amazonOriginal' && '프라임 비디오'}
                    {(amusementData.ott === 'appleOriginal' || amusementData.ott === 'appleFilm') && 'Apple TV+'}
                    {(amusementData.ott === 'disneyOriginal' || amusementData.ott === 'disneyStar') && 'Disney+'}
                    {(amusementData.ott === 'netflixOriginal' ||
                      amusementData.ott === 'netflixFilm' ||
                      amusementData.ott === 'netflixAnime' ||
                      amusementData.ott === 'netflixAnimeFilm' ||
                      amusementData.ott === 'netflixDocumentary' ||
                      amusementData.ott === 'netflixSeries' ||
                      amusementData.ott === 'netflixPresents') &&
                      '넷플릭스'}
                    {(amusementData.ott === 'tvingOriginal' || amusementData.ott === 'tvingOnly') && '티빙'}
                    {(amusementData.ott === 'watchaOriginal' || amusementData.ott === 'watchaExclusive') && '왓챠'}
                    {(amusementData.ott === 'wavveOriginal' ||
                      amusementData.ott === 'wavveOnly' ||
                      amusementData.ott === 'waveOnly' ||
                      amusementData.ott === 'waveFirstrun') &&
                      '웨이브'}
                    에서 시청하기
                  </Anchor>
                )}
              </>
            )}
            {amusementData.ott === null && amusementData.ottAddr !== null && (
              <Anchor href={amusementData.ottAddr}>
                단편영화 &apos;{amusementData.titleKorean ? amusementData.titleKorean : amusementData.title}
                &apos; 보러가기
              </Anchor>
            )}
          </dt>
          <dd>
            <strong>
              <span className={`${styles.title} seed`} aria-label="작품명">
                {amusementData.titleKorean ? amusementData.titleKorean : amusementData.title}
              </span>
              {amusementData.lang === 'chineseBeonche' && <span lang="zh-Hant">{amusementData.title} </span>}
              {amusementData.lang === 'chineseGanche' && <span lang="zh-Hans">{amusementData.title} </span>}
              {amusementData.lang === 'europe' && <span lang="en">{amusementData.title}</span>}
              {amusementData.lang === 'english' && <span lang="en-US">{amusementData.title}</span>}
              {amusementData.lang === 'japanese' && <span lang="ja">{amusementData.title}</span>}
              {amusementData.lang === 'thai' && <span lang="th">{amusementData.title}</span>}
            </strong>
          </dd>
        </dl>
        <dl className={styles.info}>
          {amusementData.country !== '?' && (
            <div>
              <dt>제작국가</dt>
              <dd className="seed">{amusementData.country}</dd>
            </div>
          )}
          {amusementData.release !== '?' && (
            <div>
              <dt>
                {(amusementData.category === 'ott_anime' ||
                  amusementData.anime === 'tva' ||
                  amusementData.anime === 'ova') &&
                  '방영년도'}
                {(amusementData.category === 'film' ||
                  amusementData.category === 'anime_film' ||
                  amusementData.category === 'ott_anime_film' ||
                  amusementData.category === 'ott_film' ||
                  amusementData.anime === 'film') &&
                  '상영년도'}
              </dt>
              <dd className="seed">{amusementData.release}년</dd>
            </div>
          )}
          {amusementData.runningTime && (
            <div>
              <dt>재생시간</dt>
              <dd className="seed">
                {amusementData.runningTime}분{formatTime(amusementData.runningTime)}
              </dd>
            </div>
          )}
          {amusementData.series && (
            <div>
              <dt>에피소드</dt>
              <dd className="seed">{amusementData.series > 1 ? `${amusementData.series}부작` : '단막극'}</dd>
            </div>
          )}
          {amusementData.supportLang !== null && <ADCC items={amusementData.supportLang} />}
          {amusementData.genre !== '?' && amusementData.tags === null && (
            <div>
              <dt>장르</dt>
              <dd className="seed">{amusementData.genre}</dd>
            </div>
          )}
          {amusementData.genre !== '?' && amusementData.tags !== null && (
            <TagsItem items={amusementData} type="genre" />
          )}
          {amusementData.studio && (
            <div>
              <dt>스튜디오</dt>
              <dd className="seed">{amusementData.studio}</dd>
            </div>
          )}
          {amusementData.distributor && (
            <div>
              <dt>제작</dt>
              <dd className="seed">{amusementData.distributor}</dd>
            </div>
          )}
          {amusementData.publisher !== '?' && (
            <div>
              <dt>제작/배급</dt>
              <dd className="seed">{amusementData.publisher}</dd>
            </div>
          )}
          {amusementData.director && (
            <div>
              <dt>감독/연출</dt>
              <dd className="seed">{amusementData.director}</dd>
            </div>
          )}
          {amusementData.creator !== '?' && (
            <div>
              <dt>주요 제작자</dt>
              <dd className="seed">{amusementData.creator}</dd>
            </div>
          )}
          {amusementData.cast !== null && (
            <div>
              {amusementData.category !== 'anime' &&
              amusementData.category !== 'anime_film' &&
              amusementData.category !== 'ott_anime' &&
              amusementData.category !== 'ott_anime_film' &&
              amusementData.category !== 'game' ? (
                <dt>주요 출연자</dt>
              ) : (
                <dt>주요 성우</dt>
              )}
              <dd className="seed">{amusementData.cast}</dd>
            </div>
          )}
        </dl>
        <div className={styles.more}>
          ...{' '}
          <button type="button" onClick={() => handleButtonClick(String(amusementData.id))}>
            <span>더보기</span>
          </button>
        </div>
      </>
    );
  }

  function bfreeServiceItems(services: any) {
    return (
      <>
        {Array.isArray(services) && (
          <dl className={styles['barrier-free-items']}>
            <dt>베리어프리 작품 지원 스트리밍 서비스</dt>
            {services.map((service: any, index: number) => (
              <React.Fragment key={index}>
                {Array.isArray(service.options) && (
                  <div>
                    <dt>
                      {service.service === 'Amazon' && <span>프라임비디오</span>}
                      {service.service === 'Apple' && <span lang="en">Apple TV+</span>}
                      {service.service === 'Disney' && <span lang="en">Disney+</span>}
                      {service.service === 'NETFLIX' && <span>넷플릭스</span>}
                      {service.service === 'TVING' && <span>티빙</span>}
                      {service.service === 'WATCHA' && <span>왓챠</span>}
                      {service.service === 'Wavve' && <span>웨이브</span>}
                      {service.service === 'Series' && <span>시리즈온</span>}
                    </dt>
                    {service.options.map((option: any, index: number) => (
                      <dd key={index}>
                        <Anchor href={option.url}>
                          <i aria-hidden="true">
                            {option.bfree === 'cc' && 'CC'}
                            {option.bfree === 'ad' && 'AD'}
                            {option.bfree === 'both' && 'BF'}
                          </i>
                          <span>
                            {option.bfree === 'cc' && '청각 장애인용 자막(CC/SDH)'}
                            {option.bfree === 'ad' && '화면 해설(AD)'}
                            {option.bfree === 'both' && '베리어프리'}
                          </span>
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
                )}
              </React.Fragment>
            ))}
          </dl>
        )}
      </>
    );
  }

  function bfreeServiceItem(services: any) {
    return (
      <>
        {Array.isArray(services) && (
          <dl className={styles['barrier-free-item']}>
            {services.map((service: any, index: number) => (
              <div key={index}>
                <dt>
                  {service.service === 'Amazon' && (
                    <>
                      <AmazonOrigin />
                      <span>프라임비디오</span>
                    </>
                  )}
                  {service.service === 'Apple' && (
                    <>
                      <AppleOrigin />
                      <span lang="en">Apple TV+</span>
                    </>
                  )}
                  {service.service === 'Disney' && (
                    <>
                      <DisneyOrigin />
                      <span lang="en">Disney+</span>
                    </>
                  )}
                  {service.service === 'NETFLIX' && (
                    <>
                      <NetflixOrigin />
                      <span>넷플릭스</span>
                    </>
                  )}
                  {service.service === 'TVING' && (
                    <>
                      <TvingOrigin />
                      <span>티빙</span>
                    </>
                  )}
                  {service.service === 'WATCHA' && (
                    <>
                      <WatchaOrigin />
                      <span>왓챠</span>
                    </>
                  )}
                  {service.service === 'Wavve' && (
                    <>
                      <WavveOrigin />
                      <span>웨이브</span>
                    </>
                  )}
                  {service.service === 'Series' && (
                    <>
                      <SeriesOrigin />
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
                            <CCiconBlack />
                            <span>청각 장애인용 자막(CC/SDH) 콘텐츠 시청하기</span>
                          </>
                        )}
                        {option.bfree === 'ad' && (
                          <>
                            <ADiconBlack />
                            <span>화면 해설(AD) 콘텐츠 시청하기</span>
                          </>
                        )}
                        {option.bfree === 'both' && (
                          <>
                            <CCiconBlack />
                            <ADiconBlack />
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
                          웨이브에서 AD를 이용하기 위해서는 &apos;화면해설&apos; 또는 &apos;베리어프리&apos;를 선택해야
                          시청이 가능할 수 있습니다.
                        </p>
                      )}
                    </dd>
                  ))}
              </div>
            ))}
          </dl>
        )}
      </>
    );
  }

  const validData = Array.isArray(moeviewData.amusementData)
    ? moeviewData.amusementData.filter((data: any) => data.related !== null && Array.isArray(data.related))
    : [];

  return (
    <main className={styles.moeview}>
      <Seo
        pageTitles={`${moeviewData.attributes ? moeviewData.attributes.subject : '없는 페이지'} - ${originTitle}`}
        pageTitle={`${moeviewData.attributes ? moeviewData.attributes.subject : '없는 페이지'}`}
        pageDescription={
          Array.isArray(moeviewData.amusementData) && moeviewData.amusementData.length > 0
            ? `${moeviewData.amusementData[0].titleKorean ? moeviewData.amusementData[0].titleKorean : moeviewData.amusementData[0].title} (${moeviewData.amusementData[0].release})`
            : '서버 에러 또는 삭제/비공개된 영상'
        }
        pageImg={
          moeviewData.attributes
            ? `https://i.ytimg.com/vi/${moeviewData.attributes.video}/hqdefault.jpg`
            : 'https://moe.dev1stud.io/missing.webp'
        }
        pageOgType={'video.other'}
        pageImgWidth={1920}
        pageImgHeight={1080}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <article className={validData.length > 0 ? styles['article-moeview'] : ''}>
        <div className={styles.article}>
          {moeviewData.attributes ? (
            <>
              {moeviewData.attributes.publishedAt !== null ? (
                <>
                  <MoeviewMeta moeviewData={moeviewData} moeviewId={moeviewId} />
                  <div className={styles.figcaption}>
                    {moeviewData.attributes.worst && (
                      <dl className={styles.worst}>
                        <dt>Worst 경고!</dt>
                        <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
                      </dl>
                    )}
                    {moeviewData.attributes.review && (
                      <div className={styles.comment}>
                        <h2 className="April16thPromise">큐레이터의 영상/작품 리뷰</h2>
                        <ReviewContent data={moeviewData.attributes.review} />
                      </div>
                    )}
                    {Array.isArray(moeviewData.amusementData) &&
                    moeviewData.amusementData[0].category !== 'game_fan' ? (
                      <>
                        <div className={styles.title}>
                          <h2 className="April16thPromise">작품 정보</h2>
                          <div className={styles.function}>
                            <button onClick={copyToClipboard}>
                              <ClipboardIcon /> <span>URL 복사</span>
                            </button>
                          </div>
                          {Array.isArray(moeviewData.amusementData) &&
                            (moeviewData.amusementData.length > 1 ? (
                              <div className={styles['title-container']}>
                                <PerfectScrollbar className={styles['scrollbar-container']}>
                                  <div className={styles['title-list']}>
                                    {moeviewData.amusementData.map((data, index) => (
                                      <div className={styles['title-info']} key={index}>
                                        <div className={`${styles.poster} ${styles['posters-other']}`}>
                                          <Image
                                            src={data.posterDefault}
                                            alt=""
                                            width={390}
                                            height={560}
                                            unoptimized
                                            priority
                                          />
                                        </div>
                                        <div className={styles['info-container']}>
                                          <AmusementInfo amusementData={data} />
                                          {data.bfree !== null && bfreeServiceItems(data.bfree)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </PerfectScrollbar>
                              </div>
                            ) : (
                              <div className={styles['title-item']}>
                                {moeviewData.amusementData.map((data, index) => (
                                  <div className={styles['title-info']} key={index}>
                                    <AmusementInfo amusementData={data} />
                                    {data.bfree !== null && (
                                      <div className={styles.bfree}>
                                        <h2 className="April16thPromise">베리어프리 작품 보기</h2>
                                        {moeviewData.amusementData.map((data, index) => (
                                          <React.Fragment key={index}>{bfreeServiceItem(data.bfree)}</React.Fragment>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                        {Array.isArray(moeviewData.amusementData) && moeviewData.amusementData.length == 1 && (
                          <div className={styles.posters}>
                            <h2 className="April16thPromise">비주얼/포스터</h2>
                            <div className={`${styles['poster-list']} ${styles['posters-other']}`}>
                              <div className={styles.poster}>
                                <Image
                                  src={moeviewData.amusementData[0].posterDefault}
                                  alt=""
                                  width={390}
                                  height={560}
                                  unoptimized
                                  priority
                                />
                              </div>
                              {moeviewData.amusementData[0].posterOther && (
                                <div className={styles.poster}>
                                  <Image
                                    src={moeviewData.amusementData[0].posterOther}
                                    alt=""
                                    width={390}
                                    height={560}
                                    unoptimized
                                    priority
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.title}>
                        <div className={styles.function}>
                          <button onClick={copyToClipboard}>
                            <ClipboardIcon /> <span>URL 복사</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className={`${styles.preview} preview`}>
                  <div className={styles.video}>
                    <YouTubeController
                      videoId={'erONHczFnGA'}
                      videoImage={'https://i.ytimg.com/vi/erONHczFnGA/hqdefault.jpg'}
                    />
                  </div>
                  <div className={styles.youtube}>
                    <h1>영상 재생에 문제가 있다는 제보가 들어와 삭제 처리된 페이지입니다. 뒤로 돌아가세요.</h1>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`${styles.preview} preview`}>
              <div className={styles.video}>
                <YouTubeController
                  videoId={'ARJ5bXkof30'}
                  videoImage={'https://i.ytimg.com/vi/ARJ5bXkof30/hqdefault.jpg'}
                />
              </div>
              <div className={styles.youtube}>
                <h1>없는 페이지이므로 체념하고 돌아가세요! 404 NOT FOUND PAGE!</h1>
              </div>
            </div>
          )}
        </div>
        {moeviewData.attributes && moeviewData.attributes.publishedAt !== null && (
          <>
            {Array.isArray(moeviewData.amusementData) && (
              <ReviewList review={moeviewData.attributes.amusements} current={moeviewId} />
            )}
            {Array.isArray(moeviewData.amusementData) && <RelatedList related={moeviewData.amusementData} />}
          </>
        )}
      </article>
      {selectedAmusementId && selectedAmusement && (
        <AmusementDetail amusement={selectedAmusement} sorting="review" onClose={handleCloseAmusementDetail} />
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const moeviewId = context.params?.moeviewId;
  let moeviewData = null;

  if (moeviewId && typeof moeviewId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moeviews?id=${moeviewId.substring(14)}`);
    const moeviewResponse = await response.json();
    let createdAt = moeviewResponse.attributes?.createdAt;

    if (createdAt && formatDateDetail(createdAt) === moeviewId.substring(0, 14)) {
      moeviewData = moeviewResponse;
    }
  }

  if (!moeviewData) {
    return {
      props: {
        moeviewData: null,
      },
    };
  }

  return {
    props: {
      moeviewId,
      moeviewData,
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
