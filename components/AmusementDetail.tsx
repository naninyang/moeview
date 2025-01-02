import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isSafari } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import { AmusementData, Category } from '@/types';
import { OriginalName } from './OriginalName';
import { CategoryName } from './CategoryName';
import { AnimeName } from './AnimeName';
import { formatTime } from './FormatTime';
import { SupportLang } from './SupportLang';
import { TagsItem } from '@/pages/amusement/[amusementId]';
import { RatingsDrama } from './RatingsDrama';
import { TagName } from './TagName';
import styles from '@/styles/AmusementDetail.module.sass';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { VectorsCrossDark, VectorsCrossLight } from './vectors';
const rem = (px: number): string => `${px / 16}rem`;

type AmusementDetailProps = {
  amusement: AmusementData;
  sorting: string;
  onClose: () => void;
};

const CloseLightIcon = styled.i({
  background: `url(${VectorsCrossLight.src}) no-repeat 50% 50%/contain`,
});

const CloseDarkIcon = styled.i({
  background: `url(${VectorsCrossDark.src}) no-repeat 50% 50%/contain`,
});

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: `(max-width: ${rem(575)}` });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

export function ADCC({ items }: { items: any }) {
  const adcc = items && items.filter((items: any) => items);

  if (!adcc) {
    return null;
  }

  return (
    <div className={styles['hanguk']}>
      <dt>자막/더빙/베리어프리</dt>
      {adcc.map((item: string, index: number) => (
        <dd key={index}>{SupportLang(item)}</dd>
      ))}
    </div>
  );
}

const AmusementDetail: React.FC<AmusementDetailProps> = ({ amusement, sorting, onClose }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const isMobile = useMobile();

  return (
    <dialog className={`${styles.modal} ${sorting === 'amusement' ? styles['modal-amusement'] : ''}`}>
      <div className={styles.container}>
        <button type="button" onClick={onClose}>
          {sorting === 'amusement' ? <CloseLightIcon /> : <CloseDarkIcon />}
          <span>닫기</span>
        </button>
        <h3>
          {amusement.titleKorean !== null ? (
            amusement.titleKorean.length >= 18 ? (
              <span
                className={`${styles.long} ${isSafari || sorting !== 'amusement' ? 'April16thPromise' : 'April16thLife'}`}
              >
                {amusement.titleKorean}
              </span>
            ) : (
              <span className={`${isSafari || sorting !== 'amusement' ? 'April16thPromise' : 'April16thLife'}`}>
                {amusement.titleKorean}
              </span>
            )
          ) : amusement.title.length >= 18 ? (
            <span
              className={`${styles.long} ${isSafari || sorting !== 'amusement' ? 'April16thPromise' : 'April16thLife'}`}
            >
              {amusement.title}
            </span>
          ) : (
            <span className={`${isSafari || sorting !== 'amusement' ? 'April16thPromise' : 'April16thLife'}`}>
              {amusement.category === 'game_fan' ? `'${amusement.title}' 팬 게임 콜렉션` : amusement.title}
            </span>
          )}
        </h3>
        <div className={styles.contents}>
          <PerfectScrollbar className={styles['scrollbar-container']}>
            <div className={styles.content}>
              <dl className={styles.title}>
                {amusement.titleKorean !== null && (
                  <div className={styles['origin-title']}>
                    <dt>원제</dt>
                    {amusement.lang === 'chineseBeonche' && <dd lang="zh-Hant">{amusement.title}</dd>}
                    {amusement.lang === 'chineseGanche' && <dd lang="zh-Hans">{amusement.title}</dd>}
                    {amusement.lang === 'europe' && <dd lang="en">{amusement.title}</dd>}
                    {amusement.lang === 'english' && <dd lang="en-US">{amusement.title}</dd>}
                    {amusement.lang === 'japanese' && <dd lang="ja">{amusement.title}</dd>}
                    {amusement.lang === 'thai' && <dd lang="th">{amusement.title}</dd>}
                    {amusement.lang === null && <dd lang="ko">{amusement.title}</dd>}
                  </div>
                )}
                {amusement.titleOther && (
                  <div className={amusement.lang === null ? styles['origin-title'] : ''}>
                    <dt>작품의 다른 언어 제목</dt>
                    <dd className="lang">
                      {amusement.lang !== null && '('}
                      {amusement.titleOther}
                      {amusement.lang !== null && ')'}
                    </dd>
                  </div>
                )}
                {amusement.etc && (
                  <div className={styles.accent}>
                    <dt>작품 추가설명</dt>
                    <dd className="lang">{amusement.etc}</dd>
                  </div>
                )}
                {amusement.originalAuthor && amusement.original && amusement.originTitle && (
                  <div className={styles.accent}>
                    <dt>원작</dt>
                    <dd>
                      &apos;{amusement.originalAuthor}&apos;의 {OriginalName(amusement.original)} &apos;
                      {amusement.originTitle}&apos; 원작
                    </dd>
                  </div>
                )}
                {amusement.original !== null && amusement.originTitle === null && amusement.originalAuthor !== null && (
                  <div className={styles.accent}>
                    <dt>원작</dt>
                    <dd>동명의 {OriginalName(amusement.original)} 원작</dd>
                  </div>
                )}
              </dl>
              <dl className={styles.summary}>
                <div className={styles.item}>
                  {amusement.ott !== null && (
                    <div className={styles.platform}>
                      <dt>OTT 플랫폼</dt>
                      <dd>
                        {amusement.ott === 'amazonOriginal' && 'AMAZON ORIGINAL'}
                        {amusement.ott === 'appleOriginal' && 'An Apple Original'}
                        {amusement.ott === 'appleFilm' && 'Apple Original Films'}
                        {amusement.ott === 'disneyOriginal' && 'Disney Original'}
                        {amusement.ott === 'disneyStar' && 'Star Original'}
                        {(amusement.ott === 'netflixSeries' ||
                          amusement.ott === 'netflixOriginal' ||
                          amusement.ott === 'netflixAnime') &&
                          'A NETFLIX Series'}
                        {(amusement.ott === 'netflixPresents' ||
                          amusement.ott === 'netflixFilm' ||
                          amusement.ott === 'netflixAnimeFilm') &&
                          'NETFLIX Presents'}
                        {amusement.ott === 'tvingOriginal' && '티빙 오리지널'}
                        {amusement.ott === 'tvingOnly' && '오직 티빙에서'}
                        {amusement.ott === 'watchaOriginal' && '왓챠 오리지널'}
                        {amusement.ott === 'watchaExclusive' && '오직 왓챠에서'}
                        {amusement.ott === 'wavveOriginal' && '웨이브 오리지널'}
                        {amusement.ott === 'wavveOnly' && '오직 웨이브에서'}
                        {(amusement.ott === 'waveOnly' || amusement.ott === 'waveFirstrun') && '웨이브 해외시리즈'}
                        {amusement.ott === 'paramount' && 'Paramount+'}
                      </dd>
                    </div>
                  )}
                  <div className={`${styles.category} ${amusement.ott !== null ? styles['ott-category'] : ''}`}>
                    <dt>카테고리</dt>
                    <dd>
                      {amusement.category !== 'anime_film' ? (
                        <>
                          {(amusement.category === 'film' ||
                            amusement.category === 'anime' ||
                            amusement.category === 'ott_film' ||
                            amusement.category === 'ott_anime') && (
                            <em>
                              {(amusement.animeBroadcast1 !== null || amusement.animeBroadcast2 !== null) && (
                                <>
                                  {amusement.animeBroadcast1 === 'tokyomx' && <span>도쿄MX</span>}
                                  {amusement.animeBroadcast1 === 'tvtokyo' && <span>테레토</span>}
                                  {amusement.animeBroadcast1 === 'fujitv' && <span>후지테레비</span>}
                                  {amusement.animeBroadcast1 === 'mbs' && <span>MBS</span>}
                                  {amusement.animeBroadcast1 === 'tbs' && <span>TBS</span>}
                                  {amusement.animeBroadcast1 === 'atx' && <span>AT-X</span>}
                                  {amusement.animeBroadcast1 === 'nippontv' && <span>닛테레</span>}
                                  {amusement.animeBroadcast1 === 'wowow' && <span>WOWOW</span>}
                                  {amusement.animeBroadcast2 === 'aniplus' && (
                                    <>
                                      {amusement.animeBroadcast1 !== null && '& '}
                                      <span>애니플러스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.animeBroadcast2 === 'daewon' && (
                                    <>
                                      {amusement.animeBroadcast1 !== null && '& '}
                                      <span>애니원</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.animeBroadcast2 === 'anibox' && (
                                    <>
                                      {amusement.animeBroadcast1 !== null && '& '}
                                      <span>애니박스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.animeBroadcast2 === 'tooniverse' && (
                                    <>
                                      {amusement.animeBroadcast1 !== null && '& '}
                                      <span>투니버스</span> 방영{' '}
                                    </>
                                  )}
                                  {amusement.animeBroadcast2 === 'animax' && (
                                    <>
                                      {amusement.animeBroadcast1 !== null && '& '}
                                      <span>애니맥스 코리아</span> 방영{' '}
                                    </>
                                  )}
                                </>
                              )}
                              {CategoryName(amusement.category)}
                            </em>
                          )}
                          {amusement.category === 'ott_anime_film' && <em>영화</em>}
                        </>
                      ) : (
                        <>
                          {(amusement.category as Category) === 'anime_film' && <em>영화</em>}
                          {(amusement.category as Category) !== 'anime_film' && (
                            <em>{CategoryName(amusement.category)}</em>
                          )}
                        </>
                      )}
                      {amusement.ott === null && amusement.category !== 'game_fan' && amusement.ottAddr !== null && (
                        <em>단편영화</em>
                      )}
                      {amusement.anime !== null && <em>{AnimeName(amusement.anime)}</em>}
                    </dd>
                  </div>
                  {(amusement.category === 'ott_film' ||
                    amusement.category === 'ott_anime_film' ||
                    amusement.category === 'anime' ||
                    amusement.category === 'anime_film' ||
                    amusement.category === 'ott_anime') && (
                    <>
                      {amusement.runningTime && (
                        <div className={styles.country}>
                          <dt>재생시간</dt>
                          <dd>
                            {amusement.runningTime}분{formatTime(amusement.runningTime)}
                          </dd>
                        </div>
                      )}
                      {amusement.series && (
                        <div className={styles.country}>
                          <dt>에피소드</dt>
                          <dd>{amusement.series > 1 ? `${amusement.series}부작` : '단막극'}</dd>
                        </div>
                      )}
                      {amusement.country !== '?' && (
                        <div className={styles.country}>
                          <dt>제작국가</dt>
                          <dd>{amusement.country}</dd>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {isMobile && (amusement.category === 'ott_film' || amusement.category === 'ott_anime_film') && (
                  <div className={styles.item}>
                    {amusement.runningTime && (
                      <div className={styles.country}>
                        <dt>재생시간</dt>
                        <dd>
                          {amusement.runningTime}분{formatTime(amusement.runningTime)}
                        </dd>
                      </div>
                    )}
                    {amusement.country !== '?' && (
                      <div className={styles.country}>
                        <dt>제작국가</dt>
                        <dd>{amusement.country}</dd>
                      </div>
                    )}
                  </div>
                )}
                <div className={styles.item}>
                  {amusement.supportLang !== null && <ADCC items={amusement.supportLang} />}
                  {amusement.release !== '?' && (
                    <div
                      className={
                        amusement.ott !== 'amazonOriginal' || amusement.ratingCustom ? styles['custom-rating'] : ''
                      }
                    >
                      <dt>
                        {(amusement.category === 'ott_anime' || amusement.anime === 'tva') && '방영'}
                        {(amusement.category === 'film' ||
                          amusement.category === 'anime_film' ||
                          amusement.category === 'ott_anime_film' ||
                          amusement.category === 'ott_film' ||
                          amusement.anime === 'film') &&
                          '상영'}
                        {amusement.anime === 'ova' && '출시'}
                        년도
                      </dt>
                      <dd>{amusement.release}년</dd>
                    </div>
                  )}
                  {!isMobile && amusement.category !== 'game_fan' && (
                    <div className={styles.rating}>
                      <dt>시청등급</dt>
                      <dd>
                        {amusement.ott === 'amazonOriginal' ? (
                          <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                            {amusement.rating === 'all' && 'All'}
                            {amusement.rating === 'a7' && '7+'}
                            {amusement.rating === 'b12' && '13+'}
                            {amusement.rating === 'c15' && '16+'}
                            {amusement.rating === 'd19' && '18+'}
                          </i>
                        ) : (
                          <>
                            {(amusement.category === 'ott_anime' ||
                              amusement.anime === 'tva' ||
                              amusement.anime === 'ova') && (
                              <>
                                {amusement.rating === 'all' ? (
                                  <span>전체 이용가</span>
                                ) : (
                                  <span>
                                    {RatingsDrama(amusement.rating)}
                                    {amusement.rating === 'd19' ? '세 미만 이용불가' : '세 이상 이용가'}
                                  </span>
                                )}
                              </>
                            )}
                            {(amusement.category === 'film' ||
                              amusement.category === 'anime_film' ||
                              amusement.category === 'ott_anime_film' ||
                              amusement.category === 'ott_film' ||
                              amusement.anime === 'film') && (
                              <>
                                {amusement.rating === 'all' && <span>전체 이용가</span>}
                                {amusement.rating === 'b12' && <span>12세 이용가</span>}
                                {amusement.rating === 'c15' && <span>15세 이용가</span>}
                                {amusement.rating === 'd19' && <span>청소년 이용불가</span>}
                              </>
                            )}
                          </>
                        )}
                        {(amusement.ott === 'amazonOriginal' || amusement.ratingCustom) && (
                          <div className={styles.custom}>
                            ({amusement.ott === 'amazonOriginal' && !amusement.ratingCustom && '아마존 자체 심의등급'}
                            {amusement.ott === 'amazonOriginal' &&
                              amusement.ratingCustom &&
                              '한국 리전 아마존 시청 불가'}
                            {amusement.ott !== 'amazonOriginal' && amusement.ratingCustom && '모애뷰 자체설정 심의등급'}
                            )
                          </div>
                        )}
                      </dd>
                    </div>
                  )}
                </div>
                {isMobile && amusement.category !== 'game_fan' && (
                  <div className={styles.item}>
                    <div className={styles.rating}>
                      <dt>시청등급</dt>
                      <dd>
                        {amusement.ott === 'amazonOriginal' ? (
                          <i className={`${styles['rating-amazon']} number`} aria-label="시청 가능 연령">
                            {amusement.rating === 'all' && 'All'}
                            {amusement.rating === 'a7' && '7+'}
                            {amusement.rating === 'b12' && '13+'}
                            {amusement.rating === 'c15' && '16+'}
                            {amusement.rating === 'd19' && '18+'}
                          </i>
                        ) : (
                          <>
                            {(amusement.category === 'ott_anime' ||
                              amusement.anime === 'tva' ||
                              amusement.anime === 'ova') && (
                              <>
                                {amusement.rating === 'all' ? (
                                  <span>전체 이용가</span>
                                ) : (
                                  <span>
                                    {RatingsDrama(amusement.rating)}
                                    {amusement.rating === 'd19' ? '세 미만 이용불가' : '세 이상 이용가'}
                                  </span>
                                )}
                              </>
                            )}
                            {(amusement.category === 'film' ||
                              amusement.category === 'anime_film' ||
                              amusement.category === 'ott_anime_film' ||
                              amusement.category === 'ott_film' ||
                              amusement.anime === 'film') && (
                              <>
                                {amusement.rating === 'all' && <span>전체 이용가</span>}
                                {amusement.rating === 'b12' && <span>12세 이용가</span>}
                                {amusement.rating === 'c15' && <span>15세 이용가</span>}
                                {amusement.rating === 'd19' && <span>청소년 이용불가</span>}
                              </>
                            )}
                          </>
                        )}
                        {(amusement.ott === 'amazonOriginal' || amusement.ratingCustom) && (
                          <div className={styles.custom}>
                            ({amusement.ott === 'amazonOriginal' && !amusement.ratingCustom && '아마존 자체 심의등급'}
                            {amusement.ott === 'amazonOriginal' &&
                              amusement.ratingCustom &&
                              '한국 리전 아마존 시청 불가'}
                            {amusement.ott !== 'amazonOriginal' && amusement.ratingCustom && '모애뷰 자체설정 심의등급'}
                            )
                          </div>
                        )}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>
              <dl className={styles.staff}>
                {amusement.original !== null && amusement.originTitle === null && amusement.originalAuthor !== null && (
                  <div>
                    <dt>원작자</dt>
                    <dd>{amusement.originalAuthor}</dd>
                  </div>
                )}
                {amusement.genre !== '?' && amusement.tags === null && (
                  <div>
                    <dt>장르</dt>
                    <dd>
                      {amusement.genre}
                      {amusement.tags !== null && `, ${TagName(amusement.tags, 'genre')}`}
                    </dd>
                  </div>
                )}
                {amusement.genre !== '?' && amusement.tags !== null && <TagsItem items={amusement} type="genre" />}
                {amusement.studio && (
                  <div>
                    <dt>스튜디오</dt>
                    <dd>{amusement.studio}</dd>
                  </div>
                )}
                {amusement.distributor && (
                  <div>
                    <dt>제작</dt>
                    <dd>{amusement.distributor}</dd>
                  </div>
                )}
                {amusement.publisher !== '?' && (
                  <div>
                    <dt>제작/배급</dt>
                    <dd>{amusement.publisher}</dd>
                  </div>
                )}
                {amusement.director && (
                  <div>
                    <dt>감독</dt>
                    <dd>{amusement.director}</dd>
                  </div>
                )}
                {amusement.creator !== '?' && (
                  <div>
                    <dt>주요 제작자</dt>
                    <dd>{amusement.creator}</dd>
                  </div>
                )}
                {amusement.cast !== '?' && (
                  <>
                    {amusement.cast !== null && (
                      <div>
                        {amusement.category !== 'anime' &&
                        amusement.category !== 'anime_film' &&
                        amusement.category !== 'ott_anime' &&
                        amusement.category !== 'ott_anime_film' ? (
                          <dt>주요 출연자</dt>
                        ) : amusement.dubbing !== null ? (
                          <dt>원어 성우</dt>
                        ) : (
                          <dt>주요 성우</dt>
                        )}
                        <dd>{amusement.cast}</dd>
                      </div>
                    )}
                  </>
                )}
                {amusement.dubbing && (
                  <div>
                    <dt>
                      {amusement.dubbingLang === 'japanese' && '일본'}
                      {amusement.dubbingLang === 'english' && '미국'}
                      {amusement.dubbingLang === null && '한국'} 성우
                    </dt>
                    <dd>{amusement.dubbing}</dd>
                  </div>
                )}
                {amusement.characters && (
                  <div>
                    <dt>캐릭터</dt>
                    <dd>{amusement.characters}</dd>
                  </div>
                )}
                {amusement.comment && (
                  <div className={styles.comment}>
                    <dt>작품 추가 정보</dt>
                    <dd
                      className="seed"
                      dangerouslySetInnerHTML={{
                        __html: amusement.comment.replace(/\n/g, '<br />'),
                      }}
                    />
                  </div>
                )}
              </dl>
              {amusement.synopsys && (
                <div className={styles.synopsys}>
                  <dt>시놉시스</dt>
                  <dd
                    className="lang"
                    dangerouslySetInnerHTML={{
                      __html: amusement.synopsys.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              )}
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </dialog>
  );
};

export default AmusementDetail;
