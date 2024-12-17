import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import { AmusementData, BannerData, Counts, MoeviewAmusementData, MoeviewData } from '@/types';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { VectorsSlideNext, VectorsSlidePause, VectorsSlidePlay, VectorsSlidePrev } from '@/components/vectors';
import { ReviewItem } from '@/components/ReviewItem';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Home.module.sass';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextIcon = styled.i({
  background: `url(${VectorsSlideNext.src}) no-repeat 50% 50%/contain`,
});

const PauseIcon = styled.i({
  background: `url(${VectorsSlidePause.src}) no-repeat 50% 50%/contain`,
});

const PlayIcon = styled.i({
  background: `url(${VectorsSlidePlay.src}) no-repeat 50% 50%/contain`,
});

const PrevIcon = styled.i({
  background: `url(${VectorsSlidePrev.src}) no-repeat 50% 50%/contain`,
});

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: `(max-width: ${575 / 16}rem` });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

const LoadingIndicator = () => {
  const loadingBlocks = Array.from({ length: 7 }, (_, index) => index);
  return (
    <>
      {loadingBlocks.map((_, index) => (
        <div key={index} className={styles['loading-indicator']} aria-hidden="true">
          <i />
          <strong />
        </div>
      ))}
    </>
  );
};

function Home({ bannerData, bannerError }: { bannerData: any; bannerError: string }) {
  const timestamp = Date.now();
  const isMobile = useMobile();

  const [count, setCount] = useState<Counts | null>(null);

  async function fetchCountData() {
    try {
      const response = await fetch(`/api/count`);
      const reviewData = await response.json();
      setCount(reviewData);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  function Background({ color }: { color: string }) {
    const hexToRgb = (hex: string) => {
      hex = hex.replace(/^#/, '');
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;

      return { r, g, b };
    };

    const rgbColor = hexToRgb(color);
    return (
      <div className={styles.semo}>
        {isMobile ? (
          <>
            <div
              style={{
                background: `linear-gradient(180deg, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0) 0%, rgba(255, 255, 255, 1) 100%)`,
              }}
            />
            <div style={{ backgroundColor: '#fff' }} />
          </>
        ) : (
          <>
            <div
              style={{
                background: `linear-gradient(180deg, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0) 0%, rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.9) 100%)`,
              }}
            />
            <div style={{ backgroundColor: `#${color}` }} />
          </>
        )}
      </div>
    );
  }

  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    centerPadding: '14%',
    centerMode: isMobile ? false : true,
    className: 'center',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5200,
    arrows: false,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const toggleAutoplay = () => {
    if (isPlaying) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    sessionStorage.setItem('home', router.asPath);
    sessionStorage.setItem('backhistory', router.asPath);
  }, [router.asPath]);

  const [reviewData, setReviewData] = useState<MoeviewData | null>(null);
  const [ottData, setOttData] = useState<MoeviewAmusementData | null>(null);
  const [healingData, setHealingData] = useState<MoeviewAmusementData | null>(null);
  const [dubbingData, setDubbingData] = useState<MoeviewAmusementData | null>(null);
  const [bfreeData, setBfreeData] = useState<MoeviewAmusementData | null>(null);

  const [reviewLoading, setReviewLoading] = useState(true);
  const [ottLoading, setOttLoading] = useState(true);
  const [healingLoading, setHealingLoading] = useState(true);
  const [dubbingLoading, setDubbingLoading] = useState(true);
  const [bfreeLoading, setBfreeLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/category?categoryName=ott&page=1&pageSize=7');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setOttData(data);
        setOttLoading(false);

        response = await fetch('/api/tag?page=1&pageSize=7&tagName=healing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setHealingData(data);
        setHealingLoading(false);

        response = await fetch('/api/subdub?page=1&pageSize=7&subdubName=dubbing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setDubbingData(data);
        setDubbingLoading(false);

        response = await fetch('/api/bfree?page=1&pageSize=7&bfreeName=bfree');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setBfreeData(data);
        setBfreeLoading(false);

        response = await fetch('/api/moeviews?page=1&main=true');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setReviewData(data);
        setReviewLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setOttLoading(false);
        setHealingLoading(false);
        setDubbingLoading(false);
        setBfreeLoading(false);
        setReviewLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <Seo
        pageTitle="모애뷰"
        pageDescription="모듬 애니리뷰"
        pageImg={`https://moe.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      {(bannerError || error) && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      {(!bannerError || !error) && (
        <>
          <div className={styles.content}>
            {bannerData && (
              <div className={`${styles.banners} home-banner`}>
                <Slider ref={sliderRef} {...settings}>
                  {Array.isArray(bannerData) &&
                    bannerData
                      .sort((a, b) => a.order - b.order)
                      .map((banner: BannerData) => (
                        <div key={banner.order}>
                          {banner.type === 'anime' ? (
                            <>
                              {isMobile ? (
                                <Anchor
                                  href={banner.link}
                                  style={{
                                    background: `url(https://cdn.dev1stud.io/semoview/banner/pao-${banner.type}.webp) no-repeat 50% 50%/contain`,
                                  }}
                                >
                                  <div className={styles.summary} style={{ color: '#000' }}>
                                    <p>{banner.description}</p>
                                    <em>
                                      ({banner.author} ‘{banner.title}’)
                                    </em>
                                  </div>
                                  <Background color={banner.color} />
                                </Anchor>
                              ) : (
                                <Anchor
                                  href={banner.link}
                                  style={{
                                    background: `url(https://cdn.dev1stud.io/semoview/banner/bread-${banner.type}.webp) no-repeat 50% 50%/contain`,
                                  }}
                                >
                                  <div className={styles.summary} style={{ color: banner.isLight ? '#000' : '#fff' }}>
                                    <p>{banner.description}</p>
                                    <em>
                                      ({banner.author} ‘{banner.title}’)
                                    </em>
                                  </div>
                                  <Background color={banner.color} />
                                </Anchor>
                              )}
                            </>
                          ) : (
                            <>
                              {isMobile ? (
                                <Anchor
                                  href={`https://semo.dev1stud.io/${banner.link}`}
                                  style={{
                                    background: `url(https://cdn.dev1stud.io/semoview/banner/pao-${banner.type}.webp) no-repeat 50% 50%/contain`,
                                  }}
                                >
                                  <div className={styles.summary} style={{ color: '#000' }}>
                                    <p>{banner.description}</p>
                                    <em>
                                      ({banner.author} ‘{banner.title}’ {banner.type === 'wavve' && '시리즈'})
                                    </em>
                                  </div>
                                  <Background color={banner.color} />
                                </Anchor>
                              ) : (
                                <Anchor
                                  href={`https://semo.dev1stud.io/${banner.link}`}
                                  style={{
                                    background: `url(https://cdn.dev1stud.io/semoview/banner/bread-${banner.type}.webp) no-repeat 50% 50%/contain`,
                                  }}
                                >
                                  <div className={styles.summary} style={{ color: banner.isLight ? '#000' : '#fff' }}>
                                    <p>{banner.description}</p>
                                    <em>
                                      ({banner.author} ‘{banner.title}’ {banner.type === 'wavve' && '시리즈'})
                                    </em>
                                  </div>
                                  <Background color={banner.color} />
                                </Anchor>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                </Slider>
                <button
                  type="button"
                  className={`${styles.prev} ${styles.move}`}
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <PrevIcon />
                  <span>이전으로 이동</span>
                </button>
                <button
                  type="button"
                  className={`${styles.next} ${styles.move}`}
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <NextIcon />
                  <span>다음으로 이동</span>
                </button>
                <div className={styles.paging}>
                  <button type="button" className={styles.stat} onClick={toggleAutoplay}>
                    {isPlaying ? (
                      <>
                        <PauseIcon />
                        <span>일시멈춤</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        <span>재생</span>
                      </>
                    )}
                  </button>
                  {bannerData.map((_: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.pager} ${currentSlide === index ? styles.active : ''}`}
                      onClick={() => sliderRef.current?.slickGoTo(index)}
                    >
                      <i />
                      <span>{index + 1}번째</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?category=ott&page=1">OTT 오리지널 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && ottData && ` ${ottData.total}개`}
              </h2>
              <Anchor href="/amusement?category=ott&page=1">
                <span>더보기</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                    fill="black"
                  />
                </svg>
              </Anchor>
            </div>
            <section>
              {!ottLoading ? (
                <>
                  {ottData &&
                    Array.isArray(ottData.data) &&
                    ottData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?tag=healing&page=1">
                  <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#영화</span> <span>#애니</span>{' '}
                  <span>#유튜브리뷰</span>
                </Anchor>
                {process.env.NODE_ENV === 'development' && healingData && ` ${healingData.total}개`}
              </h2>
              <Anchor href="/amusement?tag=healing&page=1">
                <span>더보기</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                    fill="black"
                  />
                </svg>
              </Anchor>
            </div>
            <section>
              {!healingLoading ? (
                <>
                  {healingData &&
                    Array.isArray(healingData.data) &&
                    healingData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?subdub=dubbing&page=1">한국어 더빙 공식 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && dubbingData && ` ${dubbingData.total}개`}
              </h2>
              <Anchor href="/amusement?subdub=dubbing&page=1">
                <span>더보기</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                    fill="black"
                  />
                </svg>
              </Anchor>
            </div>
            <section>
              {!dubbingLoading ? (
                <>
                  {dubbingData &&
                    Array.isArray(dubbingData.data) &&
                    dubbingData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'dubbing'} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator />
              )}
            </section>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?bfree=bfree&page=1">CC(SDH)/AD 둘다 지원하는 작품!</Anchor>
                {process.env.NODE_ENV === 'development' && bfreeData && ` ${bfreeData.total}개`}
              </h2>
              <Anchor href="/amusement?bfree=bfree&page=1">
                <span>더보기</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                    fill="black"
                  />
                </svg>
              </Anchor>
            </div>
            <section>
              {!bfreeLoading ? (
                <>
                  {bfreeData &&
                    Array.isArray(bfreeData.data) &&
                    bfreeData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'bfree'} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </>
              ) : (
                <LoadingIndicator />
              )}
            </section>
          </div>
          <div className={styles['review-content']}>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/reviews?page=1">리뷰 영상</Anchor>
                {process.env.NODE_ENV === 'development' && count && reviewData && ` ${count.total}개`}
              </h2>
              <Anchor href="/reviews?page=1">
                <span>더보기</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                    fill="black"
                  />
                </svg>
              </Anchor>
            </div>
            <section>
              {!reviewLoading ? (
                <>
                  {reviewData &&
                    Array.isArray(reviewData.moeviews) &&
                    reviewData.moeviews.map((moeview: MoeviewData) => (
                      <div className={styles.item} key={moeview.id}>
                        <ReviewItem moeview={moeview} />
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                  <div className={styles.item}>
                    <figure className={styles.figure} aria-hidden="true">
                      <div className={styles['loading-primary']}>
                        <div className={styles['preview-container']} aria-hidden="true">
                          <div className={styles.thumbnail}>
                            <div className={`${styles.dummy} ${styles.skeleton}`} />
                          </div>
                          <div className={styles['preview-info']}>
                            <div className={styles.detail}>
                              <div className={`${styles['user-info']}`}>
                                <strong className={styles.skeleton} />
                                <cite className={styles.skeleton} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles['loading-secondary']}>
                        <div className={`${styles.option} ${styles.skeleton}`} />
                        <div className={`${styles.subject} ${styles.skeleton}`} />
                        <div className={`${styles.lang} ${styles.skeleton}`} />
                        <div className={`${styles.release} ${styles.skeleton}`} />
                      </div>
                    </figure>
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let bannerData = null;
  let bannerError = null;

  try {
    const banner = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`);
    if (!banner.ok) {
      throw new Error('Network response was not ok');
    }
    bannerData = await banner.json();
  } catch (err) {
    bannerError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      bannerData,
      bannerError,
    },
  };
};
