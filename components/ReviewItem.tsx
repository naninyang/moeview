import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoeviewMetaData } from '@/types';
import { formatDate } from '@/components/FormatDate';
import { AnimeName } from './AnimeName';
import { RatingsDrama } from './RatingsDrama';
import { formatDuration } from '@/components/FormatDuration';
import styles from '@/styles/Reviews.module.sass';
import {
  Abc,
  AmazonOriginal,
  Anibox,
  Animax,
  Aniplus,
  AppleOriginal,
  Atx,
  Bbc,
  Daewon,
  DisneyOriginal,
  Ena,
  Fujitv,
  Hbomax,
  Hulu,
  Jtbc,
  Kbs2tv,
  Mbc,
  Mbs,
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
  Sky,
  StarOriginal,
  Syfy,
  Tbs,
  Tokyomx,
  Tooniverse,
  TvingOnly,
  TvingOriginal,
  Tvn,
  Tvtokyo,
  WatchaOnly,
  WatchaOriginal,
  WavveFirstrun,
  WavveOnly,
  WavveOriginal,
  Wowow,
} from './Icons';

export function Amusements({ moeview }: { moeview: string }) {
  const items = moeview.split(',');
  const result = items.length - 1;
  return (
    <p>
      <strong>본 작품 외 {result}개 작품 리뷰가 추가로 존재함</strong>
    </p>
  );
}

export function MoeviewMeta({ moeview }: { moeview: any }) {
  const [moeviewMetaData, setMoeviewMetaData] = useState<MoeviewMetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const isDevelopment = process.env.NODE_ENV === 'development';
  const handleReport = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const moeviewVideo = event.currentTarget.getAttribute('data-video');
    const moeviewID = event.currentTarget.getAttribute('data-id');

    try {
      const response = await fetch('/api/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moeviewVideo: moeviewVideo, moeviewID: moeviewID }),
      });

      if (response.ok) {
        alert(isDevelopment ? '비공개 처리됨.' : '제보 성공! 감사합니다 ☺️');
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
                      <button
                        type="button"
                        data-video={moeview.video}
                        data-id={moeview.idx.substring(14)}
                        onClick={handleReport}
                      >
                        {isDevelopment ? '비공개 처리하기' : '모애뷰 운영자에게 제보해 주세요.'}
                      </button>
                    </p>
                    <p>
                      {process.env.NODE_ENV === 'development' &&
                        `${moeview.idx} / ${moeview.idx.substring(14)} / ${moeview.video}`}
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

export function ReviewItem({ moeview }: { moeview: any }) {
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
  return (
    <figure className={styles.figure}>
      <MoeviewMeta moeview={moeview} />
      <figcaption>
        {moeview.worst && (
          <dl className={styles.worst}>
            <dt>Worst 경고!</dt>
            <dd>이 영상은 영상과 더보기에 그 어떤 정보도 존재하지 않는 최악의 영상입니다.</dd>
          </dl>
        )}
        {moeview.isAmusements && <Amusements moeview={moeview.amusements} />}
        <dl className={styles.summary}>
          <dt>
            {moeview.amusementData.category !== 'ott_anime' && moeview.amusementData.category !== 'ott_anime_film' ? (
              <>
                {moeview.amusementData.category !== 'anime_film' ? (
                  <>
                    <em className={styles[moeview.amusementData.broadcast]}>
                      {moeview.amusementData.animeBroadcast1 !== null ||
                      moeview.amusementData.animeBroadcast2 !== null ? (
                        <>
                          {moeview.amusementData.animeBroadcast1 === 'tokyomx' && (
                            <>
                              <Tokyomx /> <span>도쿄MX</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'tvtokyo' && (
                            <>
                              <Tvtokyo /> <span>테레토</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'fujitv' && (
                            <>
                              <Fujitv /> <span>후지테레비</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'mbs' && (
                            <>
                              <Mbs /> <span>MBS</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'tbs' && (
                            <>
                              <Tbs /> <span>TBS</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'atx' && (
                            <>
                              <Atx /> <span>AT-X</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'nippontv' && (
                            <>
                              <Nippontv /> <span>닛테레</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast1 === 'wowow' && (
                            <>
                              <Wowow /> <span>WOWOW</span>
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast2 === 'aniplus' && (
                            <>
                              {moeview.amusementData.animeBroadcast1 !== null && '|'}
                              <Aniplus />
                              <span>애니플러스</span> 방영{' '}
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast2 === 'daewon' && (
                            <>
                              {moeview.amusementData.animeBroadcast1 !== null && '|'}
                              <Daewon /> <span>애니원</span> 방영{' '}
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast2 === 'anibox' && (
                            <>
                              {moeview.amusementData.animeBroadcast1 !== null && '|'}
                              <Anibox /> <span>애니박스</span> 방영{' '}
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast2 === 'tooniverse' && (
                            <>
                              {moeview.amusementData.animeBroadcast1 !== null && '|'}
                              <Tooniverse /> <span>투니버스</span> 방영{' '}
                            </>
                          )}
                          {moeview.amusementData.animeBroadcast2 === 'animax' && (
                            <>
                              {moeview.amusementData.animeBroadcast1 !== null && '|'}
                              <Animax /> <span>애니맥스</span> 방영{' '}
                            </>
                          )}
                        </>
                      ) : (
                        <>시리즈</>
                      )}
                    </em>
                  </>
                ) : (
                  <em>영화</em>
                )}
              </>
            ) : (
              moeview.amusementData.category === 'ott_anime_film' && <em>영화</em>
            )}
            {moeview.amusementData.category === 'anime' && <em>{AnimeName(moeview.amusementData.anime)}</em>}
            {moeview.amusementData.ott === 'amazonOriginal' && (
              <cite>
                <AmazonOriginal /> AMAZON ORIGINAL
              </cite>
            )}
            {(moeview.amusementData.ott === 'appleOriginal' || moeview.amusementData.ott === 'appleFilm') && (
              <cite>
                <AppleOriginal /> {moeview.amusementData.ott === 'appleOriginal' && 'An Apple Original'}
                {moeview.amusementData.ott === 'appleFilm' && 'Apple Original Films'}
              </cite>
            )}
            {moeview.amusementData.ott === 'disneyOriginal' && (
              <cite>
                <DisneyOriginal /> Disney Original
              </cite>
            )}
            {moeview.amusementData.ott === 'disneyStar' && (
              <cite>
                <StarOriginal /> Star Original
              </cite>
            )}
            {(moeview.amusementData.ott === 'netflixSeries' ||
              moeview.amusementData.ott === 'netflixOriginal' ||
              moeview.amusementData.ott === 'netflixAnime' ||
              moeview.amusementData.ott === 'netflixPresents' ||
              moeview.amusementData.ott === 'netflixFilm' ||
              moeview.amusementData.ott === 'netflixAnimeFilm' ||
              moeview.amusementData.ott === 'netflixDocumentary') && (
              <cite>
                <NetflixOriginal />
                {(moeview.amusementData.ott === 'netflixSeries' ||
                  moeview.amusementData.ott === 'netflixOriginal' ||
                  moeview.amusementData.ott === 'netflixAnime') &&
                  'A NETFLIX Series'}
                {(moeview.amusementData.ott === 'netflixPresents' ||
                  moeview.amusementData.ott === 'netflixFilm' ||
                  moeview.amusementData.ott === 'netflixAnimeFilm') &&
                  'NETFLIX Presents'}
                {moeview.amusementData.ott === 'netflixDocumentary' && 'A NETFLIX Documentary'}
              </cite>
            )}
            {moeview.amusementData.ott === 'tvingOriginal' && (
              <cite>
                <TvingOriginal /> 티빙 오리지널
              </cite>
            )}
            {moeview.amusementData.ott === 'tvingOnly' && (
              <cite>
                <TvingOnly /> 오직 티빙에서
              </cite>
            )}
            {moeview.amusementData.ott === 'watchaOriginal' && (
              <cite>
                <WatchaOriginal /> 왓챠 오리지널
              </cite>
            )}
            {moeview.amusementData.ott === 'watchaExclusive' && (
              <cite>
                <WatchaOnly /> 오직 왓챠에서
              </cite>
            )}
            {moeview.amusementData.ott === 'wavveOriginal' && (
              <cite>
                <WavveOriginal /> 웨이브 오리지널
              </cite>
            )}
            {moeview.amusementData.ott === 'wavveOnly' && (
              <cite>
                <WavveOnly /> 오직 웨이브에서
              </cite>
            )}
            {moeview.amusementData.ott === 'waveOnly' && (
              <cite>
                <WavveOnly /> 웨이브 해외시리즈
              </cite>
            )}
            {moeview.amusementData.ott === 'waveFirstrun' && (
              <cite>
                <WavveFirstrun /> 웨이브 해외시리즈
              </cite>
            )}
            {moeview.amusementData.ott === 'paramount' && (
              <cite>
                <Paramount /> Paramount+
              </cite>
            )}
            {moeview.amusementData.ott === 'amazonOriginal' ? (
              <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                {moeview.amusementData.rating === 'all' && 'All'}
                {moeview.amusementData.rating === 'a7' && '7+'}
                {moeview.amusementData.rating === 'b12' && '13+'}
                {moeview.amusementData.rating === 'c15' && '16+'}
                {moeview.amusementData.rating === 'd19' && '18+'}
              </i>
            ) : (
              <>
                {(moeview.amusementData.category === 'drama' ||
                  moeview.amusementData.category === 'ott_drama' ||
                  moeview.amusementData.category === 'ott_anime' ||
                  moeview.amusementData.anime === 'tva' ||
                  moeview.amusementData.anime === 'ova') && (
                  <>
                    {moeview.amusementData.rating === 'all' ? (
                      <>
                        <i className={`${styles.drama} ${styles.all} number`}>
                          {RatingsDrama(moeview.amusementData.rating)}
                        </i>
                        <span>전체 이용가</span>
                      </>
                    ) : (
                      <>
                        {moeview.amusementData.rating === 'd19' ? (
                          <>
                            <i className={`${styles.drama} ${styles.d19} number`}>
                              {RatingsDrama(moeview.amusementData.rating)}
                            </i>
                            <span>세 미만 이용불가</span>
                          </>
                        ) : (
                          <>
                            <i className={`${styles.drama} number`}>{RatingsDrama(moeview.amusementData.rating)}</i>
                            <span>세 이상 이용가</span>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {(moeview.amusementData.category === 'film' ||
                  moeview.amusementData.category === 'anime_film' ||
                  moeview.amusementData.category === 'ott_anime_film' ||
                  moeview.amusementData.category === 'ott_film' ||
                  moeview.amusementData.category === 'ott_documentary_film' ||
                  moeview.amusementData.anime === 'film') && (
                  <>
                    {moeview.amusementData.rating === 'all' && (
                      <>
                        <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                      </>
                    )}
                    {moeview.amusementData.rating === 'b12' && (
                      <>
                        <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                      </>
                    )}
                    {moeview.amusementData.rating === 'c15' && (
                      <>
                        <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                      </>
                    )}
                    {moeview.amusementData.rating === 'd19' && (
                      <>
                        <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {moeview.amusementData.category === 'game' && (
              <>
                {moeview.amusementData.rating === 'all' && (
                  <>
                    <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                  </>
                )}
                {moeview.amusementData.rating === 'b12' && (
                  <>
                    <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                  </>
                )}
                {moeview.amusementData.rating === 'c15' && (
                  <>
                    <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                  </>
                )}
                {moeview.amusementData.rating === 'd19' && (
                  <>
                    <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                  </>
                )}
              </>
            )}
            {(moeview.amusementData.ott === 'amazonOriginal' || moeview.amusementData.ratingCustom) && (
              <div className={styles.custom}>
                {moeview.amusementData.ott === 'amazonOriginal' && !moeview.amusementData.ratingCustom && (
                  <button type="button" onClick={amazonRatingHandler}>
                    <i />
                    <span>아마존 자체 심의등급 작품</span>
                  </button>
                )}
                {moeview.amusementData.ott === 'amazonOriginal' && moeview.amusementData.ratingCustom && (
                  <button type="button" onClick={regionRatingHandler}>
                    <i />
                    <span>한국 리전 아마존 시청 불가 작품</span>
                  </button>
                )}
                {moeview.amusementData.ott !== 'amazonOriginal' && moeview.amusementData.ratingCustom && (
                  <button type="button" onClick={customRatingHandler}>
                    <i />
                    <span>모애뷰 자체설정 심의등급 안내</span>
                  </button>
                )}
              </div>
            )}
          </dt>
          <dd>
            <strong aria-label="작품명">
              <span className={`${styles.title} April16thPromise`}>
                {moeview.amusementData.titleKorean ? moeview.amusementData.titleKorean : moeview.amusementData.title}
              </span>
              {moeview.amusementData.lang === 'chineseBeonche' && (
                <span lang="zh-Hant">{moeview.amusementData.title} </span>
              )}
              {moeview.amusementData.lang === 'chineseGanche' && (
                <span lang="zh-Hans">{moeview.amusementData.title} </span>
              )}
              {moeview.amusementData.lang === 'europe' && <span lang="en">{moeview.amusementData.title}</span>}
              {moeview.amusementData.lang === 'english' && <span lang="en-US">{moeview.amusementData.title}</span>}
              {moeview.amusementData.lang === 'japanese' && <span lang="ja">{moeview.amusementData.title}</span>}
              {moeview.amusementData.lang === 'thai' && <span lang="th">{moeview.amusementData.title}</span>}
              {moeview.amusementData.titleOther !== null && (
                <span className="lang" aria-label="작품의 다른 언어 제목">
                  {moeview.amusementData.titleOther}
                </span>
              )}
              {moeview.amusementData.release !== '?' && (
                <>
                  {(moeview.amusementData.category === 'drama' ||
                    moeview.amusementData.category === 'ott_drama' ||
                    moeview.amusementData.category === 'ott_anime' ||
                    moeview.amusementData.anime === 'tva' ||
                    moeview.amusementData.anime === 'ova') && (
                    <time aria-label="방영년도">{moeview.amusementData.release}년</time>
                  )}
                  {(moeview.amusementData.category === 'film' ||
                    moeview.amusementData.category === 'anime_film' ||
                    moeview.amusementData.category === 'ott_anime_film' ||
                    moeview.amusementData.category === 'ott_film' ||
                    moeview.amusementData.anime === 'film') && (
                    <time aria-label="상영년도">{moeview.amusementData.release}년</time>
                  )}
                  {moeview.amusementData.category === 'game' && (
                    <time aria-label="출시년도">{moeview.amusementData.release}년</time>
                  )}
                </>
              )}
            </strong>
          </dd>
        </dl>
      </figcaption>
    </figure>
  );
}
