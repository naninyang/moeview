import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { AmusementData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { RatingsDrama } from '@/components/RatingsDrama';
import { Pagination } from '@/components/Pagination';
import { CategoryName } from '@/components/CategoryName';
import { TagName } from '@/components/TagName';
import { BadgeLang } from '@/components/BadgeLang';
import styles from '@/styles/Categories.module.sass';
import {
  AbcIcon,
  AmazonIcon,
  AniboxIcon,
  AnimaxIcon,
  AniplusIcon,
  AppleIcon,
  AtxIcon,
  BackButton,
  BbcIcon,
  DaewonIcon,
  DisneyIcon,
  EnaIcon,
  FujitvIcon,
  HbomaxIcon,
  HuluIcon,
  JtbcIcon,
  Kbs2Icon,
  MbcIcon,
  MbsIcon,
  NetflixIcon,
  NippontvIcon,
  OcnIcon,
  ParamountIcon,
  PeacockIcon,
  RatingFilmAll,
  RatingFilmB12,
  RatingFilmC15,
  RatingFilmD18,
  RatingGameAll,
  RatingGameB12,
  RatingGameC15,
  RatingGameD19,
  SbsIcon,
  SkyIcon,
  StarIcon,
  SyfyIcon,
  TbsIcon,
  TokyomxIcon,
  TooniverseIcon,
  TvingIcon,
  TvnIcon,
  TvtokyoIcon,
  WatchaIcon,
  WavveIcon,
  WavveIcon2,
  WowowIcon,
} from '@/components/Icons';

function Amusement({
  categoryData,
  category,
  tagData,
  tag,
  platformData,
  platform,
  hangukData,
  hanguk,
  subdubData,
  subdub,
  bfreeData,
  bfree,
  literatureData,
  literature,
  pageTitle,
  ogAddress,
  currentPage,
  error,
}: {
  categoryData: any;
  category: string;
  tagData: any;
  tag: string;
  platformData: any;
  platform: string;
  hangukData: any;
  hanguk: string;
  subdubData: any;
  subdub: string;
  bfreeData: any;
  bfree: string;
  literatureData: any;
  literature: string;
  pageTitle: string;
  ogAddress: string;
  currentPage: number;
  error: string;
}) {
  const router = useRouter();
  const timestamp = Date.now();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedHanguk, setSelectedHanguk] = useState<string>('');

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');
    sessionStorage.removeItem('amusementHanguk');
    sessionStorage.removeItem('amusementSubdub');
    sessionStorage.removeItem('amusementBfree');

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('works');
    sessionStorage.removeItem('ai');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem(
      `${category && !tag ? 'amusementCategory' : ''}${category && tag ? 'amusementTag' : ''}${!category && tag ? 'amusementTag' : ''}${platform ? 'amusementPlatform' : ''}${category && hanguk ? 'amusementHanguk' : ''}${!category && hanguk ? 'amusementHanguk' : ''}${subdub ? 'amusementSubdub' : ''}${bfree ? 'amusementBfree' : ''}${literature ? 'amusementLiterature' : ''}`,
      router.asPath,
    );
  }, [router.asPath]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorySubmit = () => {
    if (!selectedCategory) {
      alert('카테고리를 선택해 주세요');
    } else {
      router.push(`/amusement?category=${selectedCategory}&page=1`);
    }
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(event.target.value);
  };
  const handlePlatformSubmit = () => {
    if (!selectedPlatform) {
      alert('플랫폼을 선택해 주세요');
    } else {
      router.push(`/amusement?platform=${selectedPlatform}&page=1`);
    }
  };

  const handleHangukChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHanguk(event.target.value);
  };
  const handleHangukSubmit = () => {
    if (!selectedHanguk) {
      alert('선택해 주세요');
    } else {
      const parts = selectedHanguk.split(',');
      const hanguk = parts[0];
      const category = parts[1];
      const url = category
        ? `/amusement?hanguk=${hanguk}&category=${category}&page=1`
        : hanguk === 'subtitle' || hanguk === 'dubbing' || hanguk === 'both'
          ? `/amusement?subdub=${hanguk}&page=1`
          : hanguk === 'cc' || hanguk === 'description' || hanguk === 'bfree'
            ? `/amusement?bfree=${hanguk}&page=1`
            : `/amusement?hanguk=${hanguk}&page=1`;
      router.push(url);
    }
  };

  const amuseTitles = pageTitle
    ? pageTitle.replace(/\n/g, ' ')
    : literatureData === null
      ? 'Not Found literature'
      : literatureData?.attributes.subject;
  const title = pageTitle
    ? pageTitle.replace(/\n/g, '<br />')
    : literatureData === null
      ? 'Not Found literature'
      : literatureData?.attributes.subject;

  const description = pageTitle
    ? '원하는 카테고리/태그/OTT & 방송국을 선택해 리뷰영상을 즐기세요!'
    : literatureData === null
      ? 'Not Found literature'
      : literatureData?.attributes.description.replace(/\\n/g, ' ');

  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('literature');
    let refer = document.referrer !== '' || document.referrer.includes(window.location.origin);
    if (!refer) {
      router.push(`/categories`);
    } else if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push(`/categories`);
    }
  };

  function AmusementItem({ amusement }: { amusement: AmusementData }) {
    const supportLanguage = router.query.hanguk || router.query.subdub || router.query.bfree;
    const platformOtt =
      platform === 'apple' ||
      platform === 'paramount' ||
      platform === 'amazon' ||
      platform === 'netflix' ||
      platform === 'disney' ||
      platform === 'tving' ||
      platform === 'watcha' ||
      platform === 'wavve' ||
      platform === 'wave';
    const platformDrama =
      platform === 'ABC' ||
      platform === 'KBS2' ||
      platform === 'MBC' ||
      platform === 'SBS' ||
      platform === 'tvN' ||
      platform === 'OCN' ||
      platform === 'JTBC' ||
      platform === 'ENA';
    const platformAnime1 =
      platform === 'tokyomx' ||
      platform === 'tvtokyo' ||
      platform === 'fujitv' ||
      platform === 'mbs' ||
      platform === 'tbs' ||
      platform === 'atx' ||
      platform === 'nippontv' ||
      platform === 'wowow';
    const platformAnime2 =
      platform === 'aniplus' ||
      platform === 'daewon' ||
      platform === 'anibox' ||
      platform === 'tooniverse' ||
      platform === 'animax';
    return (
      <div className={`${styles.thumbnail} ${category === 'game' || category === 'game_fan' ? styles.game : ''}`}>
        <Image
          src={amusement.posterDefault}
          width={category === 'game' || category === 'game_fan' ? 460 : 390}
          height={category === 'game' || category === 'game_fan' ? 215 : 560}
          alt=""
          unoptimized
          priority
        />
        {amusement.category !== 'game_fan' && (
          <dl>
            {platform ? (
              <>
                {amusement.animeBroadcast2 && !platformAnime2 && (
                  <div
                    className={`${styles.anime2} ${amusement.animeBroadcast1 === null || platformAnime1 ? styles.anime2only : ''}`}
                  >
                    <dt>한국 방송사</dt>
                    <dd>
                      {amusement.animeBroadcast2 === 'aniplus' && (
                        <>
                          <AniplusIcon /> <span>애니플러스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'daewon' && (
                        <>
                          <DaewonIcon /> <span>애니원</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'anibox' && (
                        <>
                          <AniboxIcon /> <span>애니박스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'tooniverse' && (
                        <>
                          <TooniverseIcon /> <span>투니버스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'animax' && (
                        <>
                          <AnimaxIcon /> <span>애니맥스 코리아</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
                {amusement.animeBroadcast1 && !platformAnime1 && (
                  <div
                    className={`${styles.anime1} ${amusement.animeBroadcast1 ? styles.anime1 : ''} ${amusement.ott && !platformOtt && !platformAnime1 ? styles.broadcasts : ''}`}
                  >
                    <dt>일본 방송사</dt>
                    <dd>
                      {amusement.animeBroadcast1 === 'tokyomx' && (
                        <>
                          <TokyomxIcon /> <span>도쿄MX</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'tvtokyo' && (
                        <>
                          <TvtokyoIcon /> <span>테레토</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'fujitv' && (
                        <>
                          <FujitvIcon /> <span>후지테레비</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'mbs' && (
                        <>
                          <MbsIcon /> <span>MBS</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'tbs' && (
                        <>
                          <TbsIcon /> <span>TBS</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'atx' && (
                        <>
                          <AtxIcon /> <span>AT-X</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'nippontv' && (
                        <>
                          <NippontvIcon /> <span>닛테레</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'wowow' && (
                        <>
                          <WowowIcon /> <span>WOWOW</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
                {(amusement.broadcast || amusement.wavveSeries) && !platformDrama && (
                  <div className={`${styles.broadcast} ${amusement.ott && !platformOtt ? styles.broadcasts : ''}`}>
                    <dt>방송사</dt>
                    <dd>
                      {amusement.broadcast === 'ENA' && (
                        <>
                          <EnaIcon /> <span>ENA</span>
                        </>
                      )}
                      {amusement.broadcast === 'JTBC' && (
                        <>
                          <JtbcIcon /> <span>JTBC</span>
                        </>
                      )}
                      {amusement.broadcast === 'KBS2' && (
                        <>
                          <Kbs2Icon /> <span>KBS 2TV</span>
                        </>
                      )}
                      {amusement.broadcast === 'MBC' && (
                        <>
                          <MbcIcon /> <span>MBC</span>
                        </>
                      )}
                      {amusement.broadcast === 'OCN' && (
                        <>
                          <OcnIcon /> <span>OCN</span>
                        </>
                      )}
                      {amusement.broadcast === 'SBS' && (
                        <>
                          <SbsIcon /> <span>SBS</span>
                        </>
                      )}
                      {amusement.broadcast === 'tvN' && (
                        <>
                          <TvnIcon /> <span>tvN</span>
                        </>
                      )}
                      {amusement.broadcast === 'ABC' && (
                        <>
                          <AbcIcon /> <span>ABC</span>
                        </>
                      )}
                      {amusement.wavveSeries &&
                        amusement.wavveSeries.map((item: string, index: number) => (
                          <React.Fragment key={index}>
                            {item === 'bbc' && (
                              <>
                                <BbcIcon />
                                <span>BBC</span>
                              </>
                            )}
                            {item === 'hbomax' && (
                              <>
                                <HbomaxIcon />
                                <span>HBO맥스</span>
                              </>
                            )}
                            {item === 'hulu' && (
                              <>
                                <HuluIcon />
                                <span>Hulu</span>
                              </>
                            )}
                            {item === 'peacock' && (
                              <>
                                <PeacockIcon />
                                <span>Peacock</span>
                              </>
                            )}
                            {item === 'sky' && (
                              <>
                                <SkyIcon />
                                <span>SKY</span>
                              </>
                            )}
                            {item === 'syfy' && (
                              <>
                                <SyfyIcon />
                                <span>SYFY</span>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                    </dd>
                  </div>
                )}
                {amusement.ott && !platformOtt && (
                  <div className={styles.platform}>
                    <dt>OTT 플랫폼</dt>
                    <dd>
                      {amusement.ott === 'amazonOriginal' && (
                        <>
                          <AmazonIcon /> <span>아마존 프라임비디오</span>
                        </>
                      )}
                      {amusement.ott === 'appleOriginal' && (
                        <>
                          <AppleIcon /> <span>Apple TV+ 시리즈</span>
                        </>
                      )}
                      {amusement.ott === 'appleFilm' && (
                        <>
                          <AppleIcon /> <span>Apple TV+ 영화</span>
                        </>
                      )}
                      {(amusement.ott === 'netflixSeries' ||
                        amusement.ott === 'netflixPresents' ||
                        amusement.ott === 'netflixOriginal' ||
                        amusement.ott === 'netflixFilm' ||
                        amusement.ott === 'netflixAnime' ||
                        amusement.ott === 'netflixAnimeFilm' ||
                        amusement.ott === 'netflixDocumentary') && (
                        <>
                          <NetflixIcon />
                          <span>
                            {(amusement.ott === 'netflixSeries' ||
                              amusement.ott === 'netflixOriginal' ||
                              amusement.ott === 'netflixAnime') &&
                              '넷플릭스 시리즈'}
                            {(amusement.ott === 'netflixPresents' ||
                              amusement.ott === 'netflixFilm' ||
                              amusement.ott === 'netflixAnimeFilm') &&
                              '넷플릭스 영화'}
                            {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                          </span>
                        </>
                      )}
                      {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                        <>
                          <TvingIcon /> <span>티빙</span>
                        </>
                      )}
                      {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                        <>
                          <WatchaIcon /> <span>왓챠</span>
                        </>
                      )}
                      {(amusement.ott === 'wavveOriginal' ||
                        amusement.ott === 'wavveOnly' ||
                        amusement.ott === 'waveOnly') && (
                        <>
                          <WavveIcon /> <span>웨이브</span>
                        </>
                      )}
                      {amusement.ott === 'waveFirstrun' && (
                        <>
                          <WavveIcon2 /> <span>웨이브 해외시리즈</span>
                        </>
                      )}
                      {amusement.ott === 'paramount' && (
                        <>
                          <ParamountIcon /> <span>Paramount+</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
                {platform === 'disney' && (
                  <div className={styles.platform}>
                    <dt>OTT 플랫폼</dt>
                    <dd>
                      {amusement.ott === 'disneyOriginal' && (
                        <>
                          <DisneyIcon /> <span>Disney+</span>
                        </>
                      )}
                      {amusement.ott === 'disneyStar' && (
                        <>
                          <StarIcon /> <span>Star+</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
              </>
            ) : (
              <>
                {amusement.animeBroadcast2 && (
                  <div className={`${styles.anime2} ${amusement.animeBroadcast1 === null ? styles.anime2only : ''}`}>
                    <dt>한국 방송사</dt>
                    <dd>
                      {amusement.animeBroadcast2 === 'aniplus' && (
                        <>
                          <AniplusIcon /> <span>애니플러스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'daewon' && (
                        <>
                          <DaewonIcon /> <span>애니원</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'anibox' && (
                        <>
                          <AniboxIcon /> <span>애니박스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'tooniverse' && (
                        <>
                          <TooniverseIcon /> <span>투니버스</span>
                        </>
                      )}
                      {amusement.animeBroadcast2 === 'animax' && (
                        <>
                          <AnimaxIcon /> <span>애니맥스 코리아</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
                {amusement.animeBroadcast1 && (
                  <div
                    className={`${styles.anime1} ${amusement.animeBroadcast1 ? styles.anime1 : ''} ${amusement.ott ? styles.broadcasts : ''}`}
                  >
                    <dt>일본 방송사</dt>
                    <dd>
                      {amusement.animeBroadcast1 === 'tokyomx' && (
                        <>
                          <TokyomxIcon /> <span>도쿄MX</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'tvtokyo' && (
                        <>
                          <TvtokyoIcon /> <span>테레토</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'fujitv' && (
                        <>
                          <FujitvIcon /> <span>후지테레비</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'mbs' && (
                        <>
                          <MbsIcon /> <span>MBS</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'tbs' && (
                        <>
                          <TbsIcon /> <span>TBS</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'atx' && (
                        <>
                          <AtxIcon /> <span>AT-X</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'nippontv' && (
                        <>
                          <NippontvIcon /> <span>닛테레</span>
                        </>
                      )}
                      {amusement.animeBroadcast1 === 'wowow' && (
                        <>
                          <WowowIcon /> <span>WOWOW</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
                {(amusement.broadcast || amusement.wavveSeries) && (
                  <div className={`${styles.broadcast} ${amusement.ott ? styles.broadcasts : ''}`}>
                    <dt>방송사</dt>
                    <dd>
                      {amusement.broadcast === 'ENA' && (
                        <>
                          <EnaIcon /> <span>ENA</span>
                        </>
                      )}
                      {amusement.broadcast === 'JTBC' && (
                        <>
                          <JtbcIcon /> <span>JTBC</span>
                        </>
                      )}
                      {amusement.broadcast === 'KBS2' && (
                        <>
                          <Kbs2Icon /> <span>KBS 2TV</span>
                        </>
                      )}
                      {amusement.broadcast === 'MBC' && (
                        <>
                          <MbcIcon /> <span>MBC</span>
                        </>
                      )}
                      {amusement.broadcast === 'OCN' && (
                        <>
                          <OcnIcon /> <span>OCN</span>
                        </>
                      )}
                      {amusement.broadcast === 'SBS' && (
                        <>
                          <SbsIcon /> <span>SBS</span>
                        </>
                      )}
                      {amusement.broadcast === 'tvN' && (
                        <>
                          <TvnIcon /> <span>tvN</span>
                        </>
                      )}
                      {amusement.broadcast === 'ABC' && (
                        <>
                          <AbcIcon /> <span>ABC</span>
                        </>
                      )}
                      {amusement.wavveSeries &&
                        amusement.wavveSeries.map((item: string, index: number) => (
                          <React.Fragment key={index}>
                            {item === 'bbc' && (
                              <>
                                <BbcIcon />
                                <span>BBC</span>
                              </>
                            )}
                            {item === 'hbomax' && (
                              <>
                                <HbomaxIcon />
                                <span>HBO맥스</span>
                              </>
                            )}
                            {item === 'hulu' && (
                              <>
                                <HuluIcon />
                                <span>Hulu</span>
                              </>
                            )}
                            {item === 'peacock' && (
                              <>
                                <PeacockIcon />
                                <span>Peacock</span>
                              </>
                            )}
                            {item === 'sky' && (
                              <>
                                <SkyIcon />
                                <span>SKY</span>
                              </>
                            )}
                            {item === 'syfy' && (
                              <>
                                <SyfyIcon />
                                <span>SYFY</span>
                              </>
                            )}
                          </React.Fragment>
                        ))}
                    </dd>
                  </div>
                )}
                {amusement.ott && (
                  <div className={styles.platform}>
                    <dt>OTT 플랫폼</dt>
                    <dd>
                      {amusement.ott === 'amazonOriginal' && (
                        <>
                          <AmazonIcon /> <span>아마존 프라임비디오</span>
                        </>
                      )}
                      {amusement.ott === 'appleOriginal' && (
                        <>
                          <AppleIcon /> <span>Apple TV+ 시리즈</span>
                        </>
                      )}
                      {amusement.ott === 'appleFilm' && (
                        <>
                          <AppleIcon /> <span>Apple TV+ 영화</span>
                        </>
                      )}
                      {amusement.ott === 'disneyOriginal' && (
                        <>
                          <DisneyIcon /> <span>Disney+</span>
                        </>
                      )}
                      {amusement.ott === 'disneyStar' && (
                        <>
                          <StarIcon /> <span>Star+</span>
                        </>
                      )}
                      {(amusement.ott === 'netflixSeries' ||
                        amusement.ott === 'netflixPresents' ||
                        amusement.ott === 'netflixOriginal' ||
                        amusement.ott === 'netflixFilm' ||
                        amusement.ott === 'netflixAnime' ||
                        amusement.ott === 'netflixAnimeFilm' ||
                        amusement.ott === 'netflixDocumentary') && (
                        <>
                          <NetflixIcon />
                          <span>
                            {(amusement.ott === 'netflixSeries' ||
                              amusement.ott === 'netflixOriginal' ||
                              amusement.ott === 'netflixAnime') &&
                              '넷플릭스 시리즈'}
                            {(amusement.ott === 'netflixPresents' ||
                              amusement.ott === 'netflixFilm' ||
                              amusement.ott === 'netflixAnimeFilm') &&
                              '넷플릭스 영화'}
                            {amusement.ott === 'netflixDocumentary' && '넷플릭스 다큐멘터리'}
                          </span>
                        </>
                      )}
                      {(amusement.ott === 'tvingOriginal' || amusement.ott === 'tvingOnly') && (
                        <>
                          <TvingIcon /> <span>티빙</span>
                        </>
                      )}
                      {(amusement.ott === 'watchaOriginal' || amusement.ott === 'watchaExclusive') && (
                        <>
                          <WatchaIcon /> <span>왓챠</span>
                        </>
                      )}
                      {(amusement.ott === 'wavveOriginal' ||
                        amusement.ott === 'wavveOnly' ||
                        amusement.ott === 'waveOnly') && (
                        <>
                          <WavveIcon /> <span>웨이브</span>
                        </>
                      )}
                      {amusement.ott === 'waveFirstrun' && (
                        <>
                          <WavveIcon2 /> <span>웨이브 해외시리즈</span>
                        </>
                      )}
                      {amusement.ott === 'paramount' && (
                        <>
                          <ParamountIcon /> <span>Paramount+</span>
                        </>
                      )}
                    </dd>
                  </div>
                )}
              </>
            )}
            <div className={category === 'game' || category === 'game_fan' ? styles.game : ''}>
              <dt>{category === 'game' ? '심의등급' : '시청등급'}</dt>
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
                    {(amusement.category === 'drama' ||
                      amusement.category === 'ott_drama' ||
                      amusement.category === 'ott_anime' ||
                      amusement.category === 'ott_documentary' ||
                      amusement.anime === 'tva' ||
                      amusement.anime === 'ova') && (
                      <>
                        {amusement.rating === 'all' ? (
                          <>
                            <i className={`${styles.drama} ${styles.all} number`}>{RatingsDrama(amusement.rating)}</i>
                            <span>전체 이용가</span>
                          </>
                        ) : (
                          <>
                            {amusement.rating === 'd19' ? (
                              <>
                                <i className={`${styles.drama} ${styles.d19} number`}>
                                  {RatingsDrama(amusement.rating)}
                                </i>
                                <span>세 미만 이용불가</span>
                              </>
                            ) : (
                              <>
                                <i className={`${styles.drama} number`}>{RatingsDrama(amusement.rating)}</i>
                                <span>세 이상 이용가</span>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {(amusement.category === 'film' ||
                      amusement.category === 'anime_film' ||
                      amusement.category === 'ott_anime_film' ||
                      amusement.category === 'ott_documentary_film' ||
                      amusement.category === 'ott_film' ||
                      amusement.anime === 'film') && (
                      <>
                        {amusement.rating === 'all' && (
                          <>
                            <RatingFilmAll className={styles.rating} /> <span>전체 이용가</span>
                          </>
                        )}
                        {amusement.rating === 'b12' && (
                          <>
                            <RatingFilmB12 className={styles.rating} /> <span>12세 이용가</span>
                          </>
                        )}
                        {amusement.rating === 'c15' && (
                          <>
                            <RatingFilmC15 className={styles.rating} /> <span>15세 이용가</span>
                          </>
                        )}
                        {amusement.rating === 'd19' && (
                          <>
                            <RatingFilmD18 className={styles.rating} /> <span>청소년 이용불가</span>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {(amusement.category === 'game' || amusement.category === 'game_fan') && (
                  <>
                    {amusement.rating === 'all' && (
                      <>
                        <RatingGameAll className={styles.rating} /> <span>전체 이용가</span>
                      </>
                    )}
                    {amusement.rating === 'b12' && (
                      <>
                        <RatingGameB12 className={styles.rating} /> <span>12세 이용가</span>
                      </>
                    )}
                    {amusement.rating === 'c15' && (
                      <>
                        <RatingGameC15 className={styles.rating} /> <span>15세 이용가</span>
                      </>
                    )}
                    {amusement.rating === 'd19' && (
                      <>
                        <RatingGameD19 className={styles.rating} /> <span>청소년 이용불가</span>
                      </>
                    )}
                  </>
                )}
              </dd>
              {amusement.supportLang && (
                <>
                  <dt>추가지원</dt>
                  <dd>
                    {supportLanguage
                      ? amusement.supportLang
                          .filter((item: string) => item !== router.query.bfree)
                          .map((item: string, index: number) => (
                            <i className={styles.supportLang} key={index}>
                              {BadgeLang(item, amusement.country)}
                            </i>
                          ))
                      : amusement.supportLang.map((item: string, index: number) => (
                          <i className={styles.supportLang} key={index}>
                            {BadgeLang(item, amusement.country)}
                          </i>
                        ))}
                  </dd>
                </>
              )}
            </div>
          </dl>
        )}
      </div>
    );
  }

  return (
    <main className={`${styles.categories} ${styles.amusement}`}>
      <Seo
        pageTitles={`${amuseTitles} - ${originTitle}`}
        pageTitle={`${amuseTitles}`}
        pageDescription={description}
        pageImg={`https://semo.dev1stud.io/og-${ogAddress}.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        {router.query.category && !router.query.tag && !router.query.hanguk && (
          <Anchor href="/categories">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.tag && (
          <Anchor href="/tags">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.platform && (
          <Anchor href="/platforms">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.hanguk && (
          <Anchor href="/hanguk">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.subdub && (
          <Anchor href="/subdub">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.bfree && (
          <Anchor href="/barrier-free">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
        {router.query.literature && (
          <button onClick={previousPageHandler} type="button">
            <BackButton />
            <span>뒤로가기</span>
          </button>
        )}
        {!router.query.category &&
          !router.query.tag &&
          !router.query.platform &&
          !router.query.hanguk &&
          !router.query.subdub &&
          !router.query.bfree &&
          !router.query.literature && (
            <Anchor href="/categories">
              <BackButton />
              <span>뒤로가기</span>
            </Anchor>
          )}
      </div>
      {error && (
        <>
          {router.query.literature && (
            <div className={styles.content}>
              <div className="headline without-select">
                <h1 className="April16thPromise">
                  <em>찾을 수 없는 연결고리</em> <span className="preview">Not Found Literature</span>
                </h1>
              </div>
              <section className={styles.error}>
                <p>존재하지 않는 연결고리입니다.</p>
                <p>
                  <button onClick={previousPageHandler} type="button">
                    뒤로 이동
                  </button>
                  해 주세요
                </p>
              </section>
            </div>
          )}
          {router.query.platform && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em>플랫폼을 찾을 수 없어요</em> <span className="preview">Not found platform</span>
                </h1>
                <div className="select">
                  <select onChange={handlePlatformChange} defaultValue={platform}>
                    <option value="">플랫폼(OTT 또는 방송국) 선택</option>
                    <optgroup label="OTT 플랫폼">
                      <option value="apple">애플 TV+</option>
                      <option value="paramount">파라마운트+</option>
                      <option value="amazon">아마존 프라임비디오</option>
                      <option value="netflix">넷플릭스</option>
                      <option value="disney">디즈니+</option>
                      <option value="tving">티빙</option>
                      <option value="watcha">왓챠</option>
                      <option value="wavve">웨이브</option>
                      <option value="wave">웨이브 해외시리즈</option>
                    </optgroup>
                    <optgroup label="애니메이션 방영 일본 방송국">
                      <option value="tokyomx">도쿄MX</option>
                      <option value="tvtokyo">테레토</option>
                      <option value="fujitv">후지테레비</option>
                      <option value="mbs">MBS</option>
                      <option value="tbs">TBS</option>
                      <option value="atx">AT-X</option>
                      <option value="nippontv">닛테레</option>
                      <option value="wowow">wowow</option>
                    </optgroup>
                    <optgroup label="애니메이션 방영 한국 방송국">
                      <option value="aniplus">애니플러스</option>
                      <option value="daewon">애니원</option>
                      <option value="anibox">애니박스</option>
                      <option value="tooniverse">투니버스</option>
                      <option value="animax">애니맥스 코리아</option>
                    </optgroup>
                  </select>
                  <button onClick={handlePlatformSubmit}>선택</button>
                </div>
              </div>
              <section className={styles.error}>
                <p>존재하지 않는 플랫폼입니다.</p>
                <p>플랫폼을 선택해 주세요</p>
              </section>
            </div>
          )}
        </>
      )}
      {!router.query.category &&
        !router.query.tag &&
        !router.query.platform &&
        !router.query.hanguk &&
        !router.query.subdub &&
        !router.query.bfree &&
        !router.query.literature && (
          <div className={styles.welcome}>
            <h1 className="April16thPromise">원하는 카테고리/태그/플랫폼을 선택하세요 👋</h1>
            <div className={styles.unselect}>
              <div className={styles.form}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">카테고리 선택</option>
                  <option value="ott">오직 OTT에서</option>
                  <option value="film">영화</option>
                  <option value="anime">애니메이션</option>
                </select>
                <button onClick={handleCategorySubmit}>카테고리 선택</button>
                <select value={selectedPlatform} onChange={handlePlatformChange}>
                  <option value="">플랫폼(OTT 또는 방송국) 선택</option>
                  <optgroup label="OTT 플랫폼">
                    <option value="apple">애플 TV+</option>
                    <option value="paramount">파라마운트+</option>
                    <option value="amazon">아마존 프라임비디오</option>
                    <option value="netflix">넷플릭스</option>
                    <option value="disney">디즈니+</option>
                    <option value="tving">티빙</option>
                    <option value="watcha">왓챠</option>
                    <option value="wavve">웨이브</option>
                  </optgroup>
                  <optgroup label="애니메이션 방영 일본 방송국">
                    <option value="tokyomx">도쿄MX</option>
                    <option value="tvtokyo">테레토</option>
                    <option value="fujitv">후지테레비</option>
                    <option value="mbs">MBS</option>
                    <option value="tbs">TBS</option>
                    <option value="atx">AT-X</option>
                    <option value="nippontv">닛테레</option>
                    <option value="wowow">wowow</option>
                  </optgroup>
                  <optgroup label="애니메이션 방영 한국 방송국">
                    <option value="aniplus">애니플러스</option>
                    <option value="daewon">애니원</option>
                    <option value="anibox">애니박스</option>
                    <option value="tooniverse">투니버스</option>
                    <option value="animax">애니맥스 코리아</option>
                  </optgroup>
                </select>
                <button onClick={handlePlatformSubmit}>플랫폼 선택</button>
                <select value={selectedHanguk} onChange={handleHangukChange}>
                  <option value="">선택</option>
                  <option value="subtitle">자막 지원</option>
                  <option value="dubbing">더빙 지원</option>
                  <option value="cc">청각 장애인용 자막 지원</option>
                  <option value="description">화면 해설 지원</option>
                  <option value="anything">모든 작품</option>
                </select>
                <button onClick={handleHangukSubmit}>자막 및 화면해설 선택</button>
              </div>
              <div className={styles.tags}>
                <strong>세상의 모든 해시태그</strong>
                <ul className={styles['tag-list']}>
                  <li>
                    <Anchor href="/amusement?tag=apocalypse&page=1">
                      <span>#아포칼립스</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=healing&page=1">
                      <span>#힐링</span> <span>#치유</span> <span>#감동</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=isekai&page=1">
                      <span>#이세계</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=relife&page=1">
                      <span>#전생</span> <span>#전이</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=horror&category=film&page=1">
                      <span>#공포</span> <span>#호러</span> <span>#영화</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=queer&page=1">
                      <span>#퀴어</span> <span>#LGBTQ+</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=timeslip&page=1">
                      <span>#타임슬립</span> <span>#타임리프</span> <span>#타임루프</span> <span>#회귀</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=picaresca&page=1">
                      <span>#피카레스크</span> <span>#악인전</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=yuri&page=1">
                      <span>#백합</span> <span>#레즈</span>
                    </Anchor>
                  </li>
                  <li>
                    <Anchor href="/amusement?tag=horror&category=anime&page=1">
                      <span>#공포</span> <span>#호러</span> <span>#애니</span>
                    </Anchor>
                  </li>
                </ul>
              </div>

              <div className={styles.visual}>
                <svg width="345" height="294" viewBox="0 0 345 294" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M316.972 267.09C316.781 261.103 319.831 250.336 319.504 244.641C319.13 238.065 315.721 234.498 314.408 228.527C313.172 222.906 314.902 215.478 314.446 209.747C314.065 204.967 312.668 195.467 305.798 195.048C299.4 194.66 297.552 199.701 295.149 203.633C286.519 217.742 298.955 235.579 302.003 249.486C303.633 256.913 304.979 266.804 304.381 274.384C303.869 280.93 302.799 284.512 299.961 286.291C299.021 286.881 296.923 287.292 295.653 287.967C295.07 288.279 295.001 289.523 295.141 290.121C295.343 290.959 295.819 291.843 298.768 292.3L304.258 292.259C307.71 292.3 309.018 291.59 310.551 289.748C311.626 288.452 312.836 287.273 314.16 286.232C314.702 285.879 315.222 285.524 315.695 285.164C317.955 283.503 319.56 281.814 319.865 280.498C320.991 275.782 317.123 271.771 316.972 267.09Z"
                    fill="#F2A19C"
                  />
                  <path
                    d="M325.958 266.129C324.917 260.229 326.404 249.141 325.27 243.548C323.965 237.091 320.082 234.046 317.932 228.32C315.91 222.939 316.566 215.335 315.299 209.724C314.242 205.049 311.506 195.843 304.649 196.402C298.266 196.913 297.148 202.177 295.326 206.41C288.794 221.605 303.641 237.492 308.634 250.824C311.304 257.945 314.045 267.545 314.521 275.133C314.94 281.687 314.398 285.384 311.841 287.548C310.994 288.263 308.87 288.212 307.708 289.058C307.173 289.449 307.283 290.69 307.511 291.263C307.831 292.063 308.427 292.87 311.409 292.906L316.694 292.88C319.089 292.763 321.556 291.506 322.818 289.467C323.697 288.031 324.727 286.692 325.889 285.473C326.376 285.049 326.839 284.622 327.271 284.196C329.273 282.228 330.619 280.33 330.734 278.986C331.18 274.162 326.775 270.741 325.958 266.129Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M320.72 130.999C330.463 125.317 340.119 131.638 345 140.373C339.485 145.011 334.776 150.389 329.347 155.088C327.597 145.91 322.45 141.418 318.127 133.845C319.12 132.105 319.304 132.041 320.72 130.999Z"
                    fill="#23286B"
                  />
                  <path
                    d="M342.155 133.089C342.108 133.089 342.06 133.079 342.017 133.061C341.973 133.042 341.933 133.015 341.899 132.982L341.794 132.872C340.039 131.083 338.524 129.514 336.164 128.482C333.897 127.506 331.438 127.059 328.972 127.177C325.338 127.35 320.687 128.753 319.556 132.149C319.541 132.193 319.518 132.234 319.487 132.269C319.456 132.304 319.418 132.333 319.376 132.354C319.334 132.375 319.288 132.387 319.241 132.39C319.195 132.393 319.148 132.386 319.103 132.371C319.059 132.356 319.018 132.333 318.983 132.303C318.948 132.273 318.919 132.236 318.898 132.194C318.877 132.152 318.865 132.107 318.862 132.061C318.859 132.014 318.865 131.968 318.881 131.924C320.132 128.199 324.895 126.666 328.934 126.471C331.508 126.347 334.077 126.814 336.443 127.836C338.938 128.924 340.499 130.526 342.306 132.381L342.411 132.491C342.46 132.541 342.493 132.604 342.506 132.673C342.519 132.742 342.511 132.813 342.484 132.877C342.457 132.942 342.411 132.997 342.352 133.035C342.294 133.074 342.225 133.094 342.155 133.094V133.089Z"
                    fill="#23286B"
                  />
                  <path
                    d="M292.208 175.566C286.995 178.009 277.906 175.648 272.78 174.105C265.673 171.969 261.68 166.391 256.656 161.432C254.307 159.112 252.139 156.894 248.95 155.757C245.915 154.676 241.904 156.715 240.967 153.148C240.322 150.621 240.53 144.753 242.708 143.876C245.441 142.783 247.916 145.292 252.019 146.076C251.609 142.816 249.633 142.877 249.971 139.321C251.507 135.521 255.346 145.292 256.915 147.647C259.111 150.926 258.993 151.59 262.44 154.091C265.661 156.41 269.035 158.509 272.539 160.374C277.914 163.169 282.178 165.096 288.067 165.977C290.782 166.383 297.265 166.21 297.352 170.456C297.396 173.42 294.775 174.365 292.208 175.566Z"
                    fill="#F2A19C"
                  />
                  <path
                    d="M301.747 153.12C299.528 157.137 298.914 163.443 301.102 167.587C296.387 167.952 291.776 169.164 287.492 171.164C287.141 165.07 285.662 160.177 282.885 154.75C285.777 153.946 289.49 154.388 292.685 154.221C295.715 154.063 298.571 153.322 301.545 153.064C301.701 153.381 301.972 152.701 301.747 153.12Z"
                    fill="#F2A19C"
                  />
                  <path
                    d="M308.227 128.163C303.93 120.587 296.682 121.701 293.101 122.069C288.773 122.514 286.421 124.399 283.675 127.435C281.405 129.939 281.277 133.582 276.509 132.695C275.112 132.609 272.954 145.322 278.001 152.338C282.475 158.557 289.219 160.745 296.71 160.185C303.669 159.674 308.88 154.265 311.703 147.525C313.12 144.134 314.152 141.227 313.166 137.348C312.181 133.47 311.216 133.426 308.227 128.163Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M316.559 139.563C319.242 139.563 321.416 137.398 321.416 134.727C321.416 132.055 319.242 129.89 316.559 129.89C313.876 129.89 311.701 132.055 311.701 134.727C311.701 137.398 313.876 139.563 316.559 139.563Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M302.879 172.176C301.248 168.854 299.485 168.361 297.573 166.997C295.206 165.305 290.305 163.42 287.658 162.16C282.189 159.572 268.089 154.38 263.411 150.678C259.255 147.387 258.863 147.941 258.18 143.524C257.847 141.372 253.112 136.559 252.703 135.529C251.438 132.348 250.635 139.167 253.255 141.858C251.052 141.347 233.897 137.65 241.019 143.646C241.385 145.706 240.561 146.27 241.042 147.658C242.322 151.385 240.707 149.676 243.914 152.172C245.705 153.57 250.857 153.059 253.227 154.952C255.787 156.996 260.829 161.516 263.805 163.246C266.782 164.976 269.809 165.269 272.689 167.242C278.598 171.292 281.685 175.139 288.733 177.595C293.174 179.161 304.839 181.66 302.879 172.176Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M294.788 156.639C294.737 156.638 294.687 156.627 294.64 156.606C294.594 156.585 294.553 156.554 294.519 156.516C293.47 155.307 292.587 154.416 291.88 153.705C289.083 150.874 288.835 150.384 290.565 144.763C292.612 138.12 292.211 137.478 287.225 132.583L286.647 131.998C284.325 129.737 282.132 127.603 282.296 125.209C282.401 123.776 283.348 122.429 285.195 121.091C285.272 121.035 285.368 121.013 285.461 121.027C285.555 121.042 285.639 121.093 285.695 121.17C285.724 121.207 285.745 121.25 285.758 121.296C285.77 121.342 285.773 121.39 285.766 121.437C285.759 121.484 285.743 121.529 285.719 121.569C285.694 121.61 285.661 121.645 285.623 121.673C283.957 122.882 283.102 124.06 283.012 125.271C282.864 127.335 284.94 129.359 287.138 131.5L287.729 132.075C292.83 137.075 293.398 137.984 291.253 144.957C289.587 150.358 289.797 150.578 292.392 153.2C293.109 153.925 293.997 154.825 295.062 156.051C295.094 156.086 295.119 156.128 295.135 156.173C295.151 156.218 295.157 156.266 295.154 156.314C295.151 156.362 295.138 156.409 295.116 156.451C295.094 156.494 295.063 156.532 295.026 156.562C294.958 156.615 294.874 156.642 294.788 156.639Z"
                    fill="#23286B"
                  />
                  <path
                    d="M285.821 120.907C279.149 123.239 288.787 128.868 291.357 130.72C295.383 133.62 298.505 136.058 299.291 141.5C299.882 145.616 297.755 150.974 300.924 154.684C304.781 159.194 304.829 157.014 309.006 153.951C315.719 149.027 317.818 134.581 310.857 126.809C307.476 123.035 293.415 118.254 285.821 120.907Z"
                    fill="#23286B"
                  />
                  <path
                    d="M282.576 133.201C282.013 133.189 281.461 133.052 280.958 132.8C279.847 132.289 278.685 131.191 278.583 129.941C278.576 129.847 278.606 129.755 278.667 129.683C278.728 129.611 278.814 129.566 278.908 129.558C278.955 129.553 279.002 129.558 279.047 129.572C279.092 129.587 279.134 129.61 279.17 129.64C279.205 129.671 279.235 129.708 279.256 129.75C279.277 129.792 279.289 129.838 279.292 129.885C279.359 130.708 280.17 131.643 281.263 132.159C282.123 132.565 282.942 132.596 283.448 132.246C283.487 132.219 283.53 132.2 283.576 132.19C283.622 132.18 283.669 132.179 283.715 132.187C283.761 132.196 283.805 132.213 283.845 132.238C283.884 132.264 283.918 132.297 283.945 132.335C283.972 132.373 283.991 132.416 284.001 132.462C284.011 132.508 284.011 132.555 284.003 132.6C283.995 132.646 283.977 132.69 283.952 132.729C283.927 132.768 283.894 132.802 283.855 132.828C283.477 133.081 283.03 133.211 282.576 133.201Z"
                    fill="#23286B"
                  />
                  <path d="M111.725 109.82H185.797V171.179H111.725V109.82Z" fill="#1D72D8" />
                  <path d="M109.285 109.28H188.24V136.046H109.285V109.28Z" fill="#428DFC" />
                  <path
                    d="M149.008 159.139C149.016 159.139 149.023 159.139 149.031 159.139C149.7 159.126 150.233 158.575 150.22 157.909L149.369 112.63C150.292 112.268 151.311 111.597 152.001 110.794C152.332 110.775 152.654 110.621 152.879 110.342C156.915 105.313 159.817 99.3375 161.272 93.0623C162.653 87.0944 161.769 82.2466 158.781 79.4136C158.684 79.3218 158.573 79.247 158.451 79.1914C157.388 78.7036 156.223 78.6697 155.08 79.0936C152.919 79.8942 151.251 82.1439 150.411 83.9825C149.104 86.8414 148.248 89.768 147.843 92.697C146.348 88.3406 144.535 84.2149 140.141 83.3141C138.961 83.0726 137.855 83.3721 136.944 84.1817C134.596 86.2672 134.105 91.368 134.346 94.0929C134.421 94.9352 134.576 95.7395 134.804 96.5075C132.463 95.9417 130.092 95.9937 127.716 96.9899C126.315 97.5774 125.233 98.8164 124.667 100.479C123.876 102.805 124.172 105.718 125.423 107.902C127.379 111.315 131.761 113.29 138.095 113.611C140.726 113.781 143.906 113.311 146.941 112.366L147.799 157.955C147.81 158.613 148.349 159.139 149.008 159.139ZM148.88 109.08C145.427 110.577 141.387 111.404 138.235 111.2C134.404 111.006 129.455 110.069 127.526 106.704C126.618 105.119 126.391 102.929 126.961 101.254C127.201 100.547 127.69 99.6194 128.655 99.2149C131.064 98.2041 133.588 98.4807 136.128 99.4878C138.775 103.862 143.893 106.849 148.88 109.08ZM157.264 81.3149C160.247 84.3393 159.582 89.614 158.909 92.5207C157.836 97.1523 155.927 101.611 153.324 105.605C152.93 103.908 151.993 102.346 151.026 100.73L150.922 100.557C150.629 100.067 150.358 99.5337 150.104 98.9698C149.685 94.3284 150.521 89.5657 152.616 84.9836C153.406 83.2549 154.736 81.798 155.924 81.3572C156.398 81.1809 156.839 81.167 157.264 81.3149ZM147.723 99.5741C147.923 101.486 148.318 103.376 148.909 105.232C145.426 102.37 141.693 99.3073 137.84 97.5696C137.257 96.4369 136.877 95.21 136.759 93.8798C136.515 91.1175 137.191 87.1946 138.555 85.984C138.895 85.6828 139.223 85.5916 139.651 85.6797C143.207 86.4091 144.601 90.6061 146.076 95.05C146.583 96.5733 147.1 98.1305 147.723 99.5741Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M204.303 132.188C204.45 132.188 204.599 132.161 204.744 132.105C205.368 131.862 205.676 131.161 205.432 130.54C203.839 126.478 199.862 123.677 195.652 120.712C191.937 118.097 188.096 115.392 185.946 111.755C184.613 109.499 184.086 106.894 183.528 104.135C183.126 102.151 182.712 100.099 181.968 98.1456C180.724 94.8766 177.865 92.0026 174.853 90.9943C172.782 90.3023 170.782 90.4998 169.069 91.5709C167.664 92.4488 166.75 93.7391 165.866 94.9859L165.63 95.3192C161.771 100.725 156.7 105.361 150.964 108.727C150.387 109.065 150.195 109.805 150.534 110.38C150.874 110.955 151.617 111.148 152.193 110.808C158.221 107.271 163.55 102.399 167.604 96.7188L167.845 96.3783C168.625 95.277 169.362 94.2366 170.355 93.6171C171.448 92.9343 172.701 92.8213 174.081 93.2838C176.405 94.0621 178.715 96.4133 179.701 99.0017C180.374 100.77 180.751 102.637 181.151 104.612C181.725 107.445 182.317 110.375 183.857 112.98C186.27 117.064 190.328 119.922 194.252 122.684C198.157 125.434 201.845 128.032 203.173 131.419C203.362 131.896 203.819 132.188 204.303 132.188Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M313.041 131.751C322.784 126.075 332.442 132.388 337.322 141.116C331.807 145.748 327.097 151.117 321.668 155.811C319.919 146.644 314.773 142.159 310.436 134.595C311.441 132.857 311.625 132.793 313.041 131.751Z"
                    fill="#23286B"
                  />
                  <path
                    d="M334.477 133.84C334.384 133.84 334.291 133.804 334.221 133.732L334.114 133.622C332.36 131.822 330.845 130.268 328.479 129.239C326.249 128.268 323.76 127.82 321.288 127.935C317.659 128.107 313.016 129.51 311.876 132.895C311.814 133.081 311.612 133.182 311.425 133.118C311.238 133.056 311.138 132.855 311.2 132.669C312.453 128.949 317.216 127.418 321.254 127.226C323.838 127.103 326.434 127.575 328.765 128.589C331.259 129.674 332.819 131.275 334.626 133.128L334.733 133.238C334.87 133.378 334.867 133.603 334.725 133.739C334.656 133.807 334.567 133.84 334.477 133.84Z"
                    fill="#23286B"
                  />
                  <path
                    d="M284.532 176.265C279.317 178.705 270.228 176.346 265.103 174.807C257.995 172.673 254.002 167.1 248.982 162.148C246.632 159.83 244.465 157.615 241.276 156.481C238.241 155.401 234.229 157.438 233.294 153.874C232.632 151.35 232.852 145.49 235.03 144.615C237.752 143.522 240.238 146.027 244.341 146.812C243.932 143.556 241.955 143.617 242.29 140.063C243.834 136.268 247.655 146.027 249.234 148.381C251.428 151.654 251.311 152.318 254.758 154.815C257.662 156.919 261.68 159.446 264.858 161.092C270.246 163.882 274.497 165.807 280.385 166.687C283.102 167.093 289.584 166.92 289.669 171.161C289.729 174.121 287.098 175.065 284.532 176.265Z"
                    fill="#F2A19C"
                  />
                  <path
                    d="M294.062 153.847C291.842 157.857 291.228 164.156 293.416 168.296C288.883 168.598 283.99 169.905 279.807 171.864C279.454 165.778 277.976 160.887 275.189 155.469C278.081 154.666 281.794 155.108 284.988 154.941C288.019 154.783 290.868 154.043 293.848 153.787C294.023 154.108 294.293 153.429 294.062 153.847Z"
                    fill="#F2A19C"
                  />
                  <path
                    d="M295.838 207.073C289.305 222.248 304.152 238.117 309.155 251.433C311.826 258.546 312.812 266.366 313.298 273.944C313.826 282.195 312.78 284.703 308.04 291.821C312.128 298.122 330.697 280.444 331.142 275.269C331.557 270.455 327.281 265.971 326.466 261.365C325.424 255.472 326.915 249.751 325.782 244.165C324.475 237.716 320.594 234.674 318.444 228.956C316.423 223.58 317.078 215.985 315.81 210.383C314.753 205.712 312.017 196.518 305.159 197.077C298.777 197.598 297.658 202.844 295.838 207.073Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M300.549 128.918C296.251 121.352 289.004 122.465 285.422 122.833C281.094 123.277 278.743 125.159 275.998 128.181C273.725 130.681 273.598 134.321 268.817 133.435C267.421 133.349 265.262 146.049 270.31 153.056C274.784 159.266 281.528 161.452 289.02 160.892C295.978 160.372 301.188 154.98 304.011 148.247C305.429 144.862 306.46 141.957 305.476 138.083C304.485 134.185 303.536 134.177 300.549 128.918Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M288.564 163.143C298.344 165.543 301.408 176.897 306.993 185.356C312.555 193.78 322.613 214.428 329.913 221.431C316.02 229.922 295.684 237.002 279.602 238.654C279.284 228.009 277.098 201.369 275.052 191.183C273.981 185.854 271.924 180.046 274.033 174.631C278.305 163.664 279.751 160.98 288.564 163.143Z"
                    fill="url(#paint0_linear_0_1)"
                  />
                  <path
                    d="M308.88 140.308C311.564 140.308 313.739 138.145 313.739 135.476C313.739 132.808 311.564 130.645 308.88 130.645C306.197 130.645 304.021 132.808 304.021 135.476C304.021 138.145 306.197 140.308 308.88 140.308Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M295.201 172.878C293.569 169.571 291.806 169.07 289.894 167.705C287.529 166.017 282.626 164.125 279.98 162.875C274.51 160.291 260.412 155.105 255.734 151.407C251.576 148.12 251.184 148.673 250.501 144.267C250.168 142.118 245.434 137.311 245.025 136.281C243.76 133.098 242.956 139.911 245.578 142.593C243.375 142.082 226.218 138.39 233.342 144.389C233.707 146.446 232.883 147.01 233.364 148.396C234.654 152.119 233.03 150.413 236.236 152.905C238.03 154.301 243.178 153.789 245.549 155.68C248.11 157.722 253.149 162.238 256.128 163.964C259.078 165.674 262.13 165.986 265.011 167.957C270.919 172 274.007 175.843 281.054 178.298C285.497 179.844 297.161 182.352 295.201 172.878Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M287.11 157.36C287.01 157.36 286.911 157.318 286.841 157.237C285.791 156.03 284.91 155.14 284.202 154.424C281.405 151.596 281.156 151.097 282.888 145.486C284.936 138.854 284.534 138.212 279.546 133.322L278.958 132.749C276.637 130.492 274.444 128.361 274.619 125.97C274.724 124.538 275.673 123.192 277.52 121.856C277.679 121.741 277.902 121.775 278.018 121.934C278.134 122.092 278.098 122.314 277.939 122.428C276.273 123.634 275.418 124.81 275.33 126.021C275.18 128.083 277.256 130.103 279.456 132.241L280.046 132.817C285.151 137.821 285.72 138.729 283.57 145.694C281.904 151.088 282.115 151.303 284.71 153.926C285.425 154.649 286.315 155.548 287.38 156.773C287.509 156.921 287.492 157.144 287.343 157.273C287.276 157.331 287.193 157.36 287.11 157.36Z"
                    fill="#23286B"
                  />
                  <path
                    d="M278.141 121.673C271.469 124.003 281.109 129.627 283.679 131.476C287.705 134.372 290.827 136.808 291.608 142.243C292.199 146.355 290.071 151.704 293.243 155.411C297.1 159.916 297.147 157.738 301.325 154.678C308.036 149.762 310.135 135.332 303.175 127.568C299.795 123.797 285.736 119.022 278.141 121.673Z"
                    fill="#23286B"
                  />
                  <path
                    d="M274.897 133.951C274.395 133.951 273.844 133.818 273.279 133.552C272.17 133.03 271.005 131.943 270.903 130.696C270.888 130.501 271.034 130.33 271.23 130.314C271.435 130.298 271.599 130.444 271.614 130.638C271.681 131.462 272.491 132.396 273.584 132.911C274.444 133.316 275.262 133.348 275.771 132.997C275.933 132.885 276.154 132.925 276.267 133.086C276.379 133.247 276.339 133.468 276.177 133.58C275.818 133.827 275.38 133.951 274.897 133.951Z"
                    fill="#23286B"
                  />
                  <path
                    d="M116.381 268.468H97.5983C97.5983 268.468 90.0573 262.1 82.8508 252.174C74.7815 240.913 79.2893 223.563 64.1518 211.218C55.9983 204.545 53.1327 189.03 50.4896 185.554C50.4896 184.081 50.4896 182.69 50.4896 181.439C50.1837 162.059 48.1523 139.175 46.6777 125.356C47.2339 126.83 47.6795 128.387 48.2364 130.166C52.1873 142.817 64.3757 146.071 64.3757 146.071L71.1373 137.84C73.5302 142.178 77.8155 150.324 80.0693 157.554C83.2965 167.952 116.381 268.468 116.381 268.468Z"
                    fill="url(#paint1_linear_0_1)"
                  />
                  <path
                    d="M29.5953 268.468L20.8301 292.908H82.7689C82.7689 292.908 79.5967 286.791 69.0233 282.287C58.4777 277.783 48.516 268.468 48.516 268.468H29.5953Z"
                    fill="#A1C3FC"
                  />
                  <path
                    d="M97.5718 268.468L88.8066 292.908H150.745C150.745 292.908 147.573 286.791 137 282.287C126.454 277.783 116.493 268.468 116.493 268.468H97.5718Z"
                    fill="#A1C3FC"
                  />
                  <path
                    d="M48.5159 268.468H29.5659C13.3432 252.563 14.2623 239.384 13.038 214.081C11.8694 188.863 7.91852 196.925 9.17058 172.958C10.4226 148.907 9.78308 153.717 1.96334 119.517C-5.63248 86.1507 11.2013 66.6038 12.064 65.6031C18.1297 71.4974 26.3387 78.6989 33.1838 82.2022C27.5908 95.465 33.6572 105.308 37.6081 109.201C41.6431 113.233 43.7294 116.569 46.7626 125.412C48.2371 139.231 50.2685 162.03 50.5744 181.494C50.8532 203.237 48.5159 268.468 48.5159 268.468Z"
                    fill="#428DFC"
                  />
                  <path
                    d="M30.5121 85.8726C30.5955 85.8726 30.5955 85.8725 30.6789 85.9558C30.6789 86.039 30.6789 86.039 30.5955 86.1229C30.5121 86.1229 30.5121 86.1229 30.4287 86.0397C30.4287 85.9558 30.4287 85.8726 30.5121 85.8726ZM28.1748 86.9571C28.1748 87.0403 28.2582 87.0403 28.3416 87.0403C28.4251 87.0403 28.4251 86.9571 28.4251 86.8732C28.4251 86.79 28.3416 86.79 28.2582 86.79C28.1748 86.8739 28.1748 86.9571 28.1748 86.9571ZM30.9021 82.1467C30.9021 82.2299 30.9855 82.2299 30.9855 82.2299C31.069 82.2299 31.069 82.1467 31.069 82.1467C31.069 82.0635 30.9855 82.0635 30.9855 82.0635C30.9021 82.008 30.9021 82.0635 30.9021 82.1467ZM28.4258 82.1467C28.4258 82.2299 28.5092 82.2299 28.5092 82.2299C28.5926 82.2299 28.5926 82.1467 28.5926 82.1467L28.5092 82.0635C28.4258 82.0635 28.4258 82.1467 28.4258 82.1467ZM25.9209 82.2299C25.9209 82.3131 26.0043 82.3131 26.0043 82.3131C26.0878 82.3131 26.0878 82.2299 26.0878 82.2299C26.0878 82.1467 26.0043 82.1467 26.0043 82.1467C26.0051 82.1467 25.9209 82.1467 25.9209 82.2299ZM30.1228 91.7676C30.2062 91.8508 30.2062 91.7676 30.2896 91.7676C30.2896 91.6844 30.2896 91.6844 30.2896 91.6004C30.2062 91.6004 30.2062 91.6004 30.1228 91.6004C30.1228 91.6836 30.1228 91.7676 30.1228 91.7676ZM31.2914 85.0106C31.3748 85.0938 31.4583 85.0938 31.5139 85.0938C31.5973 85.0106 31.5973 84.9267 31.5973 84.8712C31.5139 84.788 31.4305 84.788 31.3748 84.788C31.2914 84.8719 31.2914 84.9551 31.2914 85.0106ZM28.4258 86.8739C28.5092 86.9571 28.5926 86.9571 28.6482 86.9571C28.7317 86.8739 28.7317 86.79 28.7317 86.7345C28.6483 86.6513 28.5648 86.6513 28.5092 86.6513C28.3424 86.7352 28.3424 86.8177 28.4258 86.8739ZM25.476 88.6526C25.5594 88.7358 25.6429 88.7358 25.6985 88.7358C25.7819 88.6526 25.7819 88.5686 25.7819 88.5132C25.6985 88.43 25.615 88.4299 25.5594 88.4299C25.3926 88.5139 25.3926 88.5978 25.476 88.6526ZM22.5262 90.4604C22.6096 90.5436 22.6931 90.5436 22.7487 90.5436C22.8321 90.4604 22.8321 90.3765 22.8321 90.321C22.7487 90.2378 22.6653 90.2378 22.6096 90.2378C22.4428 90.294 22.4428 90.4604 22.5262 90.4604ZM27.0061 78.9776C27.0061 79.0608 27.0061 79.1448 27.0896 79.1448C27.173 79.1448 27.2564 79.1448 27.2564 79.0616C27.2564 78.9784 27.2564 78.8944 27.173 78.8944C27.0896 78.8105 27.0061 78.8937 27.0061 78.9776ZM23.6114 78.115C23.6114 78.1982 23.6114 78.2821 23.6949 78.2821C23.7783 78.2821 23.8617 78.2821 23.8617 78.1989C23.8617 78.1157 23.8617 78.0318 23.7783 78.0318C23.6949 78.0318 23.6114 78.031 23.6114 78.115ZM20.2724 77.3369C20.2724 77.4201 20.2724 77.5041 20.3558 77.5041C20.4392 77.5041 20.5226 77.5041 20.5226 77.4209C20.5226 77.3377 20.5226 77.2537 20.4392 77.2537C20.3558 77.1975 20.2724 77.253 20.2724 77.3369ZM28.6482 82.7583C28.6482 82.8415 28.7317 82.9254 28.8151 82.9254C28.8985 82.9254 28.9819 82.8422 28.9819 82.7583C28.9819 82.6751 28.8985 82.5911 28.8151 82.5911C28.7317 82.6196 28.6482 82.7035 28.6482 82.7583ZM25.225 83.3144C25.225 83.3976 25.3084 83.4816 25.3919 83.4816C25.4753 83.4816 25.5587 83.3984 25.5587 83.3144C25.5587 83.2312 25.4753 83.1473 25.3919 83.1473C25.3084 83.148 25.225 83.2312 25.225 83.3144ZM21.831 83.8713C21.831 83.9545 21.9145 84.0384 21.9979 84.0384C22.0813 84.0384 22.1647 83.9552 22.1647 83.8713C22.1647 83.7874 22.0813 83.7042 21.9979 83.7042C21.8867 83.7042 21.831 83.7874 21.831 83.8713ZM18.4085 84.399C18.4085 84.4822 18.492 84.5661 18.5754 84.5661C18.6588 84.5661 18.7422 84.4829 18.7422 84.399C18.7422 84.3158 18.6588 84.2318 18.5754 84.2318C18.4912 84.2326 18.4085 84.3158 18.4085 84.399ZM30.1228 81.6182C30.1228 81.7014 30.2062 81.7015 30.2896 81.7015C30.373 81.7015 30.373 81.6182 30.373 81.5343C30.373 81.4504 30.2896 81.4511 30.2062 81.4511C30.1228 81.5358 30.1228 81.6182 30.1228 81.6182ZM27.563 82.2299C27.563 82.3131 27.6465 82.3131 27.7299 82.3131C27.8133 82.3131 27.8133 82.2299 27.8133 82.1459C27.8133 82.0627 27.7299 82.0627 27.6465 82.0627C27.6457 82.1467 27.563 82.2299 27.563 82.2299ZM25.0026 82.8422C25.0026 82.9254 25.086 82.9254 25.1694 82.9254C25.2528 82.9254 25.2528 82.8422 25.2528 82.7583C25.2528 82.6751 25.1694 82.6751 25.086 82.6751C25.086 82.7583 25.0026 82.8422 25.0026 82.8422ZM22.4428 83.4816C22.4428 83.5648 22.5262 83.5648 22.6096 83.5648C22.6931 83.5648 22.6931 83.4816 22.6931 83.3976C22.6931 83.3144 22.6096 83.3144 22.5262 83.3144C22.5262 83.3976 22.4428 83.3976 22.4428 83.4816ZM31.208 87.1235C31.2914 87.1235 31.3748 87.1235 31.3748 87.1235C31.3748 87.0403 31.3748 86.9564 31.3748 86.9564C31.2914 86.9564 31.208 86.9564 31.208 86.9564C31.208 87.0403 31.208 87.1235 31.208 87.1235ZM29.9003 89.3758C29.9837 89.3758 30.0672 89.3758 30.0672 89.3758C30.0672 89.2926 30.0672 89.2087 30.0672 89.2087C29.9837 89.2087 29.9003 89.2087 29.9003 89.2087C29.8169 89.2926 29.8169 89.3758 29.9003 89.3758ZM28.4814 91.6004C28.5648 91.6004 28.6482 91.6004 28.6482 91.6004C28.6482 91.5172 28.6482 91.4333 28.6482 91.4333C28.5648 91.4333 28.4814 91.4333 28.4814 91.4333C28.4258 91.545 28.4814 91.6004 28.4814 91.6004ZM26.0885 78.8937C26.0885 78.9769 26.0885 78.9769 26.1719 79.0608C26.2553 79.0608 26.2553 79.0608 26.3388 78.9776C26.3388 78.8944 26.3388 78.8944 26.2553 78.8105C26.1719 78.8105 26.0885 78.8937 26.0885 78.8937ZM23.4446 78.5047C23.4446 78.5879 23.4446 78.5879 23.528 78.6718C23.6114 78.6718 23.6114 78.6718 23.6949 78.5886C23.6949 78.5054 23.6949 78.5054 23.6114 78.4215C23.5288 78.4208 23.4446 78.4208 23.4446 78.5047ZM20.8849 78.115C20.8849 78.1982 20.8849 78.1982 20.9683 78.2821C21.0517 78.2821 21.0517 78.2821 21.1351 78.1989C21.1351 78.1157 21.1351 78.1157 21.0517 78.0318C20.9683 78.031 20.8849 78.031 20.8849 78.115ZM29.9003 84.3158C29.9003 84.399 29.9837 84.399 30.0672 84.3158C30.1506 84.3158 30.1506 84.2326 30.0672 84.1486C30.0672 84.0654 29.9837 84.0654 29.9003 84.1486C29.8169 84.1771 29.8169 84.2326 29.9003 84.3158ZM27.7299 85.8726C27.7299 85.9558 27.8133 85.9558 27.8967 85.8726C27.9801 85.8726 27.9801 85.7894 27.8967 85.7054C27.8967 85.6222 27.8133 85.6222 27.7299 85.7054C27.7299 85.7061 27.7299 85.7886 27.7299 85.8726ZM25.615 87.4301C25.615 87.5133 25.6985 87.5133 25.7819 87.4301C25.8653 87.4301 25.8653 87.3469 25.7819 87.2629C25.7819 87.1797 25.6985 87.1797 25.615 87.2629C25.615 87.2629 25.615 87.3461 25.615 87.4301ZM23.5288 88.9036C23.5288 88.9868 23.6122 88.9868 23.6956 88.9036C23.779 88.9036 23.779 88.8204 23.6956 88.7365C23.6956 88.6533 23.6122 88.6533 23.5288 88.7365C23.4453 88.8197 23.4446 88.9036 23.5288 88.9036ZM29.3434 80.5337C29.3434 80.5337 29.4269 80.5899 29.3434 80.5337C29.4269 80.5337 29.5103 80.5337 29.4269 80.4505C29.4269 80.4505 29.4269 80.4505 29.3434 80.5337C29.3434 80.5337 29.3434 80.4505 29.3434 80.5337ZM27.9523 80.9789C28.0358 81.0621 28.0358 81.0621 27.9523 80.9789C28.0358 80.9789 28.1192 80.9789 28.0358 80.8957C28.1192 80.9789 28.0358 80.8957 27.9523 80.9789ZM26.6447 81.5358C26.6447 81.5358 26.6447 81.6182 26.6447 81.5358C26.7281 81.5358 26.8115 81.5358 26.7281 81.4526C26.7003 81.4518 26.7003 81.4518 26.6447 81.5358C26.6447 81.5358 26.6447 81.4518 26.6447 81.5358ZM31.6807 83.0086H31.7641V82.9254H31.6807C31.5973 82.9254 31.6807 83.0086 31.6807 83.0086ZM31.069 84.3158H31.1524V84.2326H31.069V84.3158ZM30.4287 85.6499H30.5121V85.5667H30.4287V85.6499ZM26.7837 78.6711C26.7837 78.6711 26.8671 78.7266 26.7837 78.6711C26.8671 78.7543 26.9505 78.6711 26.9505 78.6711C26.9505 78.5879 26.9505 78.5879 26.7837 78.6711C26.7837 78.5879 26.8671 78.5879 26.7837 78.6711ZM25.3926 78.5879C25.3926 78.5879 25.3926 78.6711 25.3926 78.5879C25.476 78.6711 25.5594 78.5879 25.5594 78.5879C25.476 78.5879 25.476 78.5047 25.3926 78.5879C25.3926 78.5047 25.3926 78.5047 25.3926 78.5879ZM29.6501 82.397H29.7335V82.3138H29.6501C29.5944 82.397 29.5944 82.397 29.6501 82.397ZM28.5648 83.3976H28.6482V83.3144H28.5648V83.3976ZM27.4796 84.399H27.563V84.3158H27.4796C27.4796 84.3158 27.4796 84.3158 27.4796 84.399ZM26.2546 78.4208C26.2546 78.504 26.338 78.504 26.4215 78.504C26.5049 78.504 26.5049 78.4208 26.5049 78.3368C26.5049 78.2529 26.4215 78.2536 26.338 78.2536C26.311 78.3376 26.2546 78.3376 26.2546 78.4208ZM23.6114 78.8937C23.6114 78.9769 23.6949 78.9769 23.7783 78.9769C23.8617 78.9769 23.8617 78.8937 23.8617 78.8098C23.8617 78.7266 23.7783 78.7266 23.6949 78.7266C23.6114 78.7266 23.5288 78.8105 23.6114 78.8937ZM20.8849 79.2827C20.8849 79.3659 20.9683 79.3659 21.0517 79.3659C21.1351 79.3659 21.1351 79.2827 21.1351 79.1988C21.1351 79.1156 21.0517 79.1156 20.9683 79.1156C20.8849 79.2003 20.8849 79.2002 20.8849 79.2827ZM18.1583 79.7557C18.1583 79.8389 18.2417 79.8389 18.3251 79.8389C18.4085 79.8389 18.4085 79.7557 18.4085 79.6717C18.4085 79.5885 18.3251 79.5885 18.2417 79.5885C18.2417 79.5885 18.1583 79.6725 18.1583 79.7557ZM28.5648 82.008C28.6483 82.008 28.7317 82.008 28.7317 82.008C28.7317 81.9248 28.7317 81.8408 28.7317 81.8408C28.6483 81.8408 28.5648 81.8408 28.5648 81.8408C28.4814 81.9241 28.4814 82.008 28.5648 82.008ZM26.9505 84.2326C27.034 84.2326 27.1174 84.2326 27.1174 84.2326C27.1174 84.1494 27.1174 84.0654 27.1174 84.0654C27.034 84.0654 26.9505 84.0654 26.9505 84.0654C26.8671 84.0932 26.9505 84.1771 26.9505 84.2326ZM25.3926 86.4287C25.476 86.4287 25.5594 86.4287 25.5594 86.4287V86.2616C25.476 86.2616 25.3926 86.2616 25.3926 86.2616C25.3084 86.3455 25.3084 86.4287 25.3926 86.4287ZM23.7512 88.5978C23.8346 88.5978 23.9181 88.5978 23.9181 88.5978C23.9181 88.5146 23.9181 88.4307 23.9181 88.4307C23.8346 88.4307 23.7512 88.4307 23.7512 88.4307C23.6678 88.5139 23.6678 88.5978 23.7512 88.5978ZM22.276 75.251C22.276 75.3342 22.276 75.4182 22.3594 75.4182C22.4428 75.4182 22.5262 75.4182 22.5262 75.335C22.5262 75.2518 22.5262 75.1678 22.4428 75.1678C22.3601 75.1678 22.276 75.1678 22.276 75.251ZM19.5772 74.6394C19.5772 74.7226 19.5772 74.8065 19.6606 74.8065C19.744 74.8065 19.8274 74.8065 19.8274 74.7233C19.8274 74.6401 19.8274 74.5562 19.744 74.5562C19.6328 74.473 19.6328 74.5562 19.5772 74.6394ZM16.934 73.9169C16.934 74.0001 16.934 74.084 17.0174 74.084C17.1008 74.084 17.1843 74.084 17.1843 74.0008C17.1843 73.9176 17.1843 73.8336 17.1008 73.8336C17.0167 73.8607 17.0167 73.9169 16.934 73.9169ZM28.0358 79.6725C28.0358 79.7557 28.1192 79.7557 28.2026 79.6725C28.286 79.6725 28.286 79.5893 28.2026 79.5053C28.2026 79.4221 28.1192 79.4221 28.0358 79.5053C28.0358 79.5053 28.0358 79.5885 28.0358 79.6725ZM25.6985 81.0621C25.6985 81.1453 25.7819 81.1453 25.8653 81.0621C25.9487 81.0621 25.9487 80.9789 25.8653 80.895C25.8653 80.8118 25.7819 80.8118 25.6985 80.895C25.6985 80.9789 25.6985 81.0621 25.6985 81.0621ZM23.3612 82.5364C23.3612 82.6196 23.4446 82.6196 23.528 82.5364C23.6114 82.5364 23.6114 82.4532 23.528 82.3693C23.528 82.2861 23.4446 82.2861 23.3612 82.3693C23.3612 82.397 23.3612 82.4525 23.3612 82.5364ZM21.1073 83.9268C21.1073 84.01 21.1907 84.01 21.2742 83.9268C21.3576 83.9268 21.3576 83.8436 21.2742 83.7596C21.2742 83.6764 21.1907 83.6764 21.1073 83.7596C21.0517 83.7874 21.0517 83.8713 21.1073 83.9268ZM18.7978 85.3449C18.7978 85.4281 18.8813 85.4281 18.9647 85.3449C19.0481 85.3449 19.0481 85.2617 18.9647 85.1777C18.9647 85.0945 18.8813 85.0945 18.7978 85.1777C18.7144 85.2609 18.7144 85.3449 18.7978 85.3449ZM29.9559 84.1771C30.0394 84.1771 30.1228 84.1771 30.1228 84.0939C30.1228 84.0107 30.1228 83.9268 30.0394 83.9268C29.9559 83.9268 29.8725 83.9268 29.8725 84.01C29.8725 84.0932 29.9559 84.1771 29.9559 84.1771ZM29.3434 86.8177C29.4269 86.8177 29.5103 86.8177 29.5103 86.7345C29.5103 86.6513 29.5103 86.5674 29.4269 86.5674C29.3434 86.5674 29.26 86.5674 29.26 86.6506C29.26 86.7352 29.3434 86.8177 29.3434 86.8177ZM28.7317 89.5152C28.8151 89.5152 28.8985 89.5152 28.8985 89.432C28.8985 89.3488 28.8985 89.2649 28.8151 89.2649C28.7317 89.2649 28.6482 89.2649 28.6482 89.3481C28.6482 89.432 28.6483 89.432 28.7317 89.5152ZM28.1192 92.1573C28.2026 92.1573 28.286 92.1573 28.286 92.0741C28.286 91.9909 28.286 91.907 28.2026 91.907C28.1192 91.907 28.0358 91.907 28.0358 91.9902C28.0358 92.0734 28.0358 92.0734 28.1192 92.1573ZM21.3576 73.5271C21.3576 73.5271 21.3576 73.6103 21.441 73.6103C21.441 73.6103 21.5244 73.6103 21.5244 73.5271C21.5244 73.5271 21.5244 73.4439 21.441 73.4439C21.3576 73.4716 21.3576 73.4716 21.3576 73.5271ZM25.1694 78.5879C25.1694 78.5879 25.2528 78.6711 25.2528 78.5879C25.2528 78.5047 25.3362 78.5047 25.2528 78.5047C25.2528 78.5047 25.1694 78.4215 25.1694 78.5047V78.5879ZM23.6114 79.4214C23.6114 79.4214 23.6949 79.5046 23.6949 79.4214C23.6949 79.4214 23.7783 79.3382 23.6949 79.3382C23.6949 79.3382 23.6114 79.255 23.6114 79.3382V79.4214ZM22.0535 80.2841C22.0535 80.2841 22.1369 80.3673 22.1369 80.2841C22.1369 80.2841 22.2203 80.2009 22.1369 80.2009C22.1369 80.2009 22.0535 80.1177 22.0535 80.2009V80.2841ZM28.4258 81.146C28.4258 81.146 28.5092 81.146 28.5092 81.0628C28.5092 80.9796 28.5092 80.9796 28.4258 80.9796C28.4258 80.9796 28.3424 80.9796 28.3424 81.0628C28.3424 81.0621 28.3424 81.146 28.4258 81.146ZM27.8689 82.8422C27.8689 82.8422 27.9523 82.8422 27.9523 82.759C27.9523 82.759 27.9523 82.6758 27.8689 82.6758C27.8689 82.6758 27.7855 82.6758 27.7855 82.759C27.8689 82.7583 27.8689 82.8422 27.8689 82.8422ZM27.3962 84.5654C27.3962 84.5654 27.4796 84.5654 27.4796 84.4822C27.4796 84.4822 27.4796 84.399 27.3962 84.399C27.3962 84.399 27.3128 84.399 27.3128 84.4822C27.3406 84.4822 27.3406 84.4822 27.3962 84.5654ZM23.6114 76.6414C23.6114 76.7246 23.6949 76.7246 23.6949 76.7246C23.7783 76.7246 23.7783 76.6414 23.7783 76.6414C23.7783 76.5582 23.6949 76.5582 23.6949 76.5582C23.6114 76.5582 23.6114 76.6414 23.6114 76.6414ZM21.831 76.8633C21.831 76.9465 21.9145 76.9465 21.9145 76.9465C21.9979 76.9465 21.9979 76.8633 21.9979 76.8633C21.9979 76.7801 21.9145 76.7801 21.9145 76.7801C21.9145 76.7801 21.831 76.8085 21.831 76.8633ZM20.1055 77.0304C20.1055 77.1136 20.1889 77.1136 20.1889 77.1136C20.2724 77.1136 20.2724 77.0304 20.2724 77.0304C20.2724 76.9472 20.1889 76.9472 20.1889 76.9472C20.1055 76.9472 20.1055 77.0304 20.1055 77.0304ZM26.9505 79.5053H27.034V79.4221H26.9505V79.5053ZM25.866 80.8402H25.9495V80.757H25.866C25.866 80.8402 25.866 80.8402 25.866 80.8402ZM24.7808 82.2299H24.8642V82.1467H24.7808C24.6974 82.1467 24.6974 82.2299 24.7808 82.2299ZM23.6678 83.6202H23.7512V83.537H23.6678C23.6114 83.537 23.6114 83.537 23.6678 83.6202ZM30.4287 82.2299C30.5121 82.2299 30.5121 82.1467 30.5121 82.1467C30.5121 82.0635 30.4287 82.0635 30.4287 82.0635C30.3452 82.0635 30.3452 82.1467 30.3452 82.1467C30.346 82.2299 30.4287 82.2299 30.4287 82.2299ZM30.5955 84.01C30.6789 84.01 30.6789 83.9268 30.6789 83.9268C30.6789 83.8436 30.5955 83.8436 30.5955 83.8436C30.5121 83.8436 30.5121 83.9268 30.5121 83.9268L30.5955 84.01ZM30.8187 85.7061C30.9021 85.7061 30.9021 85.6229 30.9021 85.6229C30.9021 85.5397 30.8187 85.5397 30.8187 85.5397C30.7353 85.5397 30.7353 85.6229 30.7353 85.6229C30.7345 85.7061 30.7345 85.7061 30.8187 85.7061ZM20.2724 71.9149C20.2724 71.9981 20.2724 72.082 20.3558 72.082C20.4392 72.082 20.5226 72.082 20.5226 71.9988C20.5226 71.9156 20.5226 71.8317 20.4392 71.8317C20.3558 71.8309 20.2724 71.8309 20.2724 71.9149ZM17.7126 70.969C17.7126 71.0522 17.7126 71.1361 17.796 71.1361C17.8795 71.1361 17.9629 71.1361 17.9629 71.0529C17.9629 70.9697 17.9629 70.8858 17.8795 70.8858C17.7682 70.9142 17.7126 70.9142 17.7126 70.969ZM15.1529 70.0516C15.1529 70.1348 15.1529 70.2187 15.2363 70.2187C15.3197 70.2187 15.4031 70.2187 15.4031 70.1355C15.4031 70.0523 15.4031 69.9684 15.3197 69.9684C15.2085 69.8852 15.1529 69.9684 15.1529 70.0516ZM23.0553 77.1143C23.0553 77.1975 23.1387 77.1975 23.2221 77.1975C23.3056 77.1975 23.3056 77.1143 23.3056 77.0304C23.3056 76.9472 23.2221 76.9472 23.1387 76.9472C23.0553 76.9472 22.9719 77.0304 23.0553 77.1143ZM20.579 78.1982C20.579 78.2814 20.6624 78.2814 20.7458 78.2814C20.8292 78.2814 20.8292 78.1982 20.8292 78.1142C20.8292 78.031 20.7458 78.031 20.6624 78.031C20.579 78.115 20.4956 78.1982 20.579 78.1982ZM18.1026 79.3659C18.1026 79.4491 18.1861 79.4491 18.2695 79.4491C18.3529 79.4491 18.3529 79.3659 18.3529 79.282C18.3529 79.1988 18.2695 79.1988 18.1861 79.1988C18.1026 79.2002 18.1026 79.2827 18.1026 79.3659ZM15.5978 80.4505C15.5978 80.5337 15.6812 80.5337 15.7646 80.5337C15.8481 80.5337 15.8481 80.4505 15.8481 80.3666C15.8481 80.2833 15.7646 80.2833 15.6812 80.2833C15.5978 80.368 15.5978 80.4505 15.5978 80.4505ZM26.1719 79.8943C26.2553 79.8943 26.3388 79.8943 26.3388 79.8111C26.3388 79.7279 26.3388 79.644 26.2553 79.644C26.1719 79.644 26.0885 79.644 26.0885 79.7272C26.0885 79.8111 26.1719 79.8943 26.1719 79.8943ZM25.225 82.4525C25.3084 82.4525 25.3919 82.4525 25.3919 82.3693C25.3919 82.2861 25.3919 82.2021 25.3084 82.2021C25.225 82.2021 25.1416 82.2021 25.1416 82.2853C25.1694 82.397 25.1694 82.4525 25.225 82.4525ZM24.3074 85.0106C24.3908 85.0106 24.4742 85.0106 24.4742 84.9274C24.4742 84.8442 24.4742 84.7603 24.3908 84.7603C24.3074 84.7603 24.2239 84.7603 24.2239 84.8435C24.2239 84.9551 24.2239 84.9551 24.3074 85.0106ZM23.3612 87.5133C23.4446 87.5133 23.528 87.5133 23.528 87.4301C23.528 87.3469 23.528 87.2629 23.4446 87.2629C23.3612 87.2629 23.2778 87.2629 23.2778 87.3461C23.3056 87.4301 23.3056 87.5133 23.3612 87.5133ZM21.0517 74.862C21.0517 74.9452 21.1351 74.9452 21.2185 74.9452C21.302 74.9452 21.302 74.862 21.302 74.7781C21.302 74.6949 21.2185 74.6949 21.2185 74.6949C21.1073 74.6949 21.0517 74.7788 21.0517 74.862ZM18.3251 74.9459C18.3251 75.0291 18.4085 75.0291 18.492 75.0291C18.5754 75.0291 18.5754 74.9459 18.5754 74.862C18.5754 74.7781 18.492 74.7788 18.492 74.7788C18.4085 74.7788 18.3251 74.862 18.3251 74.9459ZM15.6819 75.0014C15.6819 75.0846 15.7654 75.0846 15.8488 75.0846C15.9322 75.0846 15.9322 75.0014 15.9322 74.9175C15.9322 74.8343 15.8488 74.8343 15.7654 74.8343C15.6819 74.9459 15.5978 74.9459 15.6819 75.0014ZM12.9824 75.0846C12.9824 75.1678 13.0658 75.1678 13.0658 75.1678C13.1493 75.1678 13.1493 75.0846 13.1493 75.0846C13.1493 75.0014 13.0658 75.0014 12.9824 75.0014V75.0846ZM25.1694 77.6427C25.2528 77.7259 25.3362 77.7259 25.3362 77.6427C25.4197 77.5595 25.4197 77.4756 25.3362 77.4756C25.2528 77.3924 25.1694 77.3924 25.1694 77.4756C25.086 77.5033 25.086 77.5873 25.1694 77.6427ZM23.3056 79.6725C23.389 79.7557 23.4724 79.7557 23.4724 79.6725C23.5558 79.5893 23.5558 79.5893 23.4724 79.5053C23.389 79.4221 23.389 79.4221 23.3056 79.5053C23.2221 79.5053 23.2221 79.5885 23.3056 79.6725ZM21.441 81.6182C21.5244 81.7014 21.6078 81.7014 21.6078 81.6182C21.6913 81.535 21.6913 81.535 21.6078 81.4511C21.5244 81.3679 21.441 81.3679 21.441 81.4511C21.3576 81.5358 21.3576 81.6182 21.441 81.6182ZM19.5772 83.6202C19.6606 83.7034 19.744 83.7034 19.744 83.6202C19.8274 83.537 19.8274 83.4531 19.744 83.4531C19.6606 83.3699 19.5772 83.3699 19.5772 83.4531C19.4938 83.4816 19.4938 83.537 19.5772 83.6202ZM17.7126 85.5675C17.796 85.6507 17.8795 85.6507 17.8795 85.5675C17.9629 85.4843 17.9629 85.4843 17.8795 85.4003C17.796 85.3171 17.7126 85.3171 17.7126 85.4003C17.7126 85.4835 17.7126 85.5675 17.7126 85.5675ZM28.1748 81.4518C28.2582 81.4518 28.2582 81.3686 28.2582 81.3686C28.2582 81.2854 28.1748 81.2854 28.1748 81.2854C28.0914 81.2854 28.0914 81.3686 28.0914 81.4526H28.1748V81.4518ZM28.3424 84.1771C28.4258 84.1771 28.4258 84.0939 28.4258 84.01C28.4258 83.9268 28.3424 83.9268 28.3424 83.9268C28.2589 83.9268 28.2589 84.01 28.2589 84.01C28.1748 84.1771 28.2582 84.1771 28.3424 84.1771ZM28.4258 86.8739C28.5092 86.8739 28.5092 86.7907 28.5092 86.7068C28.5092 86.6236 28.4258 86.6236 28.3424 86.6236C28.2589 86.6236 28.2589 86.7068 28.2589 86.7907C28.3424 86.8739 28.3424 86.8739 28.4258 86.8739ZM28.4814 89.5984C28.5648 89.5984 28.5648 89.5152 28.5648 89.5152C28.5648 89.432 28.4814 89.432 28.398 89.432C28.3146 89.432 28.3146 89.5152 28.3146 89.5992C28.4258 89.5984 28.4258 89.5984 28.4814 89.5984ZM21.441 73.2213C21.441 73.2213 21.441 73.3052 21.441 73.2213C21.5244 73.3045 21.6078 73.2213 21.6078 73.2213C21.58 73.1658 21.4966 73.1658 21.441 73.2213C21.441 73.1658 21.441 73.1658 21.441 73.2213ZM19.7996 73.2213C19.7996 73.3052 19.7996 73.3052 19.7996 73.2213C19.8831 73.3045 19.9665 73.2213 19.9665 73.2213C19.8831 73.2213 19.8831 73.1658 19.7996 73.2213C19.7996 73.2213 19.7996 73.1658 19.7996 73.2213ZM18.1583 73.3052C18.1583 73.3052 18.1583 73.3884 18.1583 73.3052C18.2417 73.3884 18.3251 73.3052 18.3251 73.3052C18.2417 73.2213 18.2417 73.2213 18.1583 73.3052C18.1583 73.2213 18.1583 73.2213 18.1583 73.3052ZM23.0553 76.6414H23.1387V76.5582H23.0553C22.9719 76.5582 22.9719 76.6414 23.0553 76.6414ZM21.8867 77.8924H21.9701V77.8092H21.8867C21.8867 77.8099 21.8867 77.8099 21.8867 77.8924ZM20.8014 79.0601H20.8849V78.9769H20.8014C20.718 78.9776 20.718 79.0601 20.8014 79.0601ZM26.6447 77.9486C26.6447 77.9486 26.7003 77.9486 26.6447 77.9486C26.7281 77.8653 26.6447 77.7814 26.6447 77.7814C26.5612 77.8924 26.5612 77.8924 26.6447 77.9486C26.5612 77.9486 26.5612 77.9486 26.6447 77.9486ZM26.6447 79.6725C26.7003 79.6725 26.7003 79.5885 26.6447 79.6725C26.7281 79.5893 26.6447 79.5053 26.6447 79.5053C26.6447 79.5053 26.6447 79.5053 26.6447 79.6725C26.6447 79.6725 26.6447 79.5885 26.6447 79.6725ZM26.7003 81.2847C26.7837 81.2847 26.7837 81.2292 26.7003 81.2847C26.7837 81.2015 26.7003 81.1176 26.7003 81.1176C26.7003 81.1176 26.6447 81.146 26.7003 81.2847C26.7003 81.2847 26.6447 81.2292 26.7003 81.2847ZM17.8517 69.6625C17.8517 69.6625 17.8517 69.7457 17.9351 69.7457C17.9351 69.7457 18.0185 69.7458 18.0185 69.6625C18.0185 69.6625 18.0185 69.5793 17.9351 69.5793C17.9351 69.6625 17.8517 69.6625 17.8517 69.6625ZM22.5262 74.6394C22.5262 74.6394 22.6096 74.7226 22.6096 74.6394C22.6096 74.6394 22.6931 74.5562 22.6096 74.5562C22.6096 74.5562 22.5262 74.473 22.5262 74.5562C22.5826 74.5562 22.5262 74.6394 22.5262 74.6394ZM21.0517 75.3342C21.0517 75.3342 21.1351 75.4174 21.1351 75.3342C21.1351 75.3342 21.2185 75.251 21.1351 75.251C21.1351 75.251 21.0517 75.1678 21.0517 75.251V75.3342ZM19.5772 76.0298C19.5772 76.0298 19.6606 76.113 19.6606 76.0298C19.6606 76.0298 19.744 75.9466 19.6606 75.9466C19.6606 75.9466 19.5772 75.8634 19.5772 75.9466C19.5772 75.9466 19.5772 75.9466 19.5772 76.0298ZM18.0192 76.6414C18.0192 76.6414 18.1026 76.7246 18.1026 76.6414C18.1026 76.6414 18.1861 76.5582 18.1026 76.5582C18.1026 76.5582 18.0192 76.475 18.0192 76.5582V76.6414ZM24.8364 76.8633C24.8364 76.8633 24.9199 76.8633 24.9199 76.7801C24.9199 76.7801 24.9199 76.6969 24.8364 76.6969C24.8364 76.6969 24.753 76.6969 24.753 76.7801C24.8364 76.8085 24.8364 76.8085 24.8364 76.8633ZM24.3074 78.3376C24.3074 78.3376 24.3908 78.3376 24.3908 78.2544C24.3908 78.2544 24.3908 78.1712 24.3074 78.1712C24.3074 78.1712 24.2239 78.1712 24.2239 78.2544C24.2239 78.3376 24.2239 78.3376 24.3074 78.3376ZM23.6678 79.8943C23.6678 79.8943 23.7512 79.8943 23.7512 79.8111C23.7512 79.8111 23.7512 79.7279 23.6678 79.7279C23.6678 79.7279 23.5844 79.7279 23.5844 79.8111C23.6678 79.8943 23.6678 79.8943 23.6678 79.8943ZM23.1387 81.4518C23.1387 81.4518 23.2221 81.4518 23.2221 81.3686C23.2221 81.3686 23.2221 81.2854 23.1387 81.2854C23.1387 81.2854 23.0553 81.2854 23.0553 81.3686C23.0553 81.3686 23.0553 81.4518 23.1387 81.4518ZM21.1915 74.2504C21.2749 74.2504 21.2749 74.1672 21.2749 74.1672C21.2749 74.1672 21.1915 74.1665 21.1915 74.2504C21.1073 74.2504 21.1915 74.1665 21.1915 74.2504ZM20.1055 75.0846C20.1889 75.0846 20.1889 75.0846 20.1055 75.0846C20.1889 75.0846 20.1889 75.0014 20.1889 75.0014C20.1889 74.9459 20.1889 74.9459 20.1055 75.0846C20.1055 75.0014 20.1055 75.0014 20.1055 75.0846ZM24.7808 76.1692C24.8364 76.1692 24.8364 76.1692 24.7808 76.1692C24.8642 76.086 24.8642 76.086 24.7808 76.086C24.7808 76.1137 24.7808 76.1137 24.7808 76.1692ZM24.6132 77.5033C24.6974 77.5033 24.6974 77.5033 24.6132 77.5033C24.6967 77.4201 24.6967 77.4201 24.6132 77.4201C24.6132 77.4201 24.6132 77.4201 24.6132 77.5033ZM19.4938 72.5265C19.4938 72.6104 19.5772 72.6104 19.4938 72.5265C19.5772 72.5265 19.5772 72.5265 19.5772 72.5265C19.5772 72.4433 19.5772 72.4433 19.4938 72.5265C19.4938 72.5265 19.4938 72.4433 19.4938 72.5265ZM18.2417 72.9155C18.3251 72.9155 18.3251 72.9155 18.3251 72.9155C18.3251 72.8316 18.2417 72.8316 18.2417 72.9155C18.1583 72.9155 18.2417 72.8316 18.2417 72.9155ZM22.9719 75.0014C23.0553 75.0014 23.0553 75.0014 22.9719 75.0014C23.0553 74.9182 23.0553 74.9182 23.0553 74.9182C23.0553 74.862 22.9719 74.9459 22.9719 75.0014C22.9719 75.0014 22.9719 74.9459 22.9719 75.0014ZM22.3601 76.1692C22.4428 76.1692 22.4428 76.1692 22.3601 76.1692C22.4435 76.086 22.4435 76.086 22.4435 76.086C22.4428 76.0298 22.3601 76.0298 22.3601 76.1692C22.3601 76.1692 22.3601 76.1137 22.3601 76.1692ZM21.7476 77.3369C21.7476 77.3369 21.831 77.3369 21.7476 77.3369C21.831 77.2537 21.831 77.2537 21.831 77.2537C21.7476 77.1975 21.7476 77.1975 21.7476 77.3369C21.7476 77.3369 21.6642 77.253 21.7476 77.3369ZM20.4114 72.5265H20.4948V72.4433H20.4114C20.3558 72.5265 20.3558 72.5265 20.4114 72.5265ZM19.7162 74.0001H19.7996V73.9169H19.7162C19.6328 73.9169 19.6328 74.0001 19.7162 74.0001ZM22.6653 75.6408C22.7487 75.5576 22.7487 75.4736 22.6653 75.4736C22.5826 75.5568 22.5826 75.5568 22.6653 75.6408C22.5826 75.6408 22.5826 75.6408 22.6653 75.6408Z"
                    fill="white"
                  />
                  <path
                    d="M92.4531 36.2405C92.4531 36.2405 79.0968 30.9024 61.3161 32.2088C43.5362 33.5153 40.5022 38.7987 30.2633 39.9664C20.0243 41.1342 6.97307 41.8297 3.02148 56.3998C3.02148 56.3998 21.1914 76.6415 34.0743 82.7036L98.4346 47.4744C98.4354 47.4744 92.369 44.4433 92.4531 36.2405Z"
                    fill="url(#paint2_linear_0_1)"
                  />
                  <path
                    d="M92.6191 111.925C92.6191 111.925 100.215 119.766 106.977 123.548C113.739 127.329 114.351 126.884 117.774 124.465C121.196 122.074 125.147 117.959 126.316 116.624C127.401 115.318 129.877 115.707 128.57 119.572C127.262 123.381 121.419 124.549 123.227 126.94C125.008 129.414 132.632 131.444 138.447 132.278C144.263 133.195 147.379 133.836 140.923 139.869C134.412 145.93 127.484 148.794 112.681 138.784C97.849 128.691 86.2182 127.468 80.375 126.828L92.6191 111.925Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M98.4343 47.4743C98.4343 47.4743 83.8537 63.6011 78.2607 76.475C72.6678 89.3488 74.0589 92.6018 82.6851 100.999C91.3105 109.368 93.6207 110.62 93.6207 110.62L64.4317 146.071C64.4317 146.071 52.244 142.817 48.2924 130.166C44.3415 117.515 42.2267 113.789 37.4958 109.145C32.8483 104.501 25.0856 91.3785 37.7182 74.0832C50.3787 56.7887 64.3468 45.9168 92.4513 36.1572"
                    fill="#23286B"
                  />
                  <path
                    d="M106.671 40.5788C106.671 40.5788 102.72 42.8311 98.4343 47.4189C98.4343 47.4189 92.3686 46.4183 92.452 36.1581L104.64 30.4302L106.671 40.5788Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M132.66 31.6534C132.66 31.7366 132.576 31.8205 132.576 31.8205C132.41 32.1263 132.271 32.5161 132.02 32.8212C129.989 36.547 130.629 41.0517 129.933 41.9691C129.238 42.8865 126.984 42.1917 125.982 41.7465C125.065 41.1904 120.863 44.8601 115.437 44.8601C110.401 44.8601 105.504 40.9955 103.416 36.7127C107.283 28.3997 110.957 25.7015 120.417 27.4816C130.74 29.3449 133.996 23.9783 133.996 23.9783C134.385 27.5378 133.05 30.7914 132.66 31.6534Z"
                    fill="#FFBEB6"
                  />
                  <path
                    d="M134.079 24.0629C134.079 24.0629 130.906 29.485 120.5 27.5662C110.177 25.7029 106.754 29.0398 102.413 39.1883C102.413 39.1883 87.499 32.7372 81.377 17.1673C81.377 17.1673 84.3267 13.8311 90.0024 13.0516C95.6795 12.3561 102.413 5.59985 104.583 3.73653C106.753 1.87322 116.548 -1.76874 125.007 4.43208C133.466 10.7161 142.008 21.1982 132.548 31.8198C132.604 31.876 134.384 28.0946 134.079 24.0629Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M128.401 25.0635C117.688 25.1467 103.859 27.7048 104.415 41.2742C104.415 41.7472 105.193 41.7472 105.193 41.2742C104.72 28.0945 118.16 25.9262 128.399 25.843C128.93 25.8415 128.93 25.0635 128.401 25.0635Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M80.8194 16.444C85.9389 8.21347 98.5159 15.9711 103.803 7.68579C104.025 7.29605 103.413 6.90777 103.107 7.29605C97.9034 15.3594 85.3271 7.60186 80.1235 16.0543C79.874 16.5279 80.5699 16.9162 80.8194 16.444Z"
                    fill="#E94A47"
                  />
                  <path
                    d="M125.982 33.127C126.205 35.6851 129.016 37.1587 131.186 35.5179C131.576 35.2121 131.186 34.6005 130.796 34.8224C129.154 35.9902 126.929 35.1282 126.761 33.043C126.761 32.654 125.982 32.654 125.982 33.127Z"
                    fill="#1C2868"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_0_1"
                      x1="273.119"
                      y1="200.553"
                      x2="329.912"
                      y2="200.553"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#23286B" />
                      <stop offset="1" stop-color="#151A4F" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_0_1"
                      x1="90.4959"
                      y1="207.321"
                      x2="52.3998"
                      y2="181.278"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#428DFC" />
                      <stop offset="0.3696" stop-color="#3385F5" />
                      <stop offset="0.999" stop-color="#1A78E8" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_0_1"
                      x1="50.5719"
                      y1="48.146"
                      x2="51.9622"
                      y2="81.9996"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#23286B" />
                      <stop offset="0.999" stop-color="#161C54" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        )}
      {!error && (
        <>
          {router.query.category && categoryData && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />
                  {categoryData.data.length === 0 ? (
                    <span className="preview">Not found category</span>
                  ) : (
                    process.env.NODE_ENV === 'development' && <span>({categoryData.total}개 작품)</span>
                  )}
                </h1>
                <div className="select">
                  <select onChange={handleCategoryChange} defaultValue={category}>
                    <option value="">카테고리 선택</option>
                    <option value="ott">오직 OTT에서</option>
                    <option value="film">영화</option>
                    <option value="anime">애니메이션</option>
                  </select>
                  <button onClick={handleCategorySubmit}>선택</button>
                </div>
              </div>
              {categoryData.data.length === 0 && (
                <section className={styles.error}>
                  <p>존재하지 않는 카테고리입니다.</p>
                  <p>카테고리를 선택해 주세요</p>
                </section>
              )}
              {Array.isArray(categoryData.data) && (
                <section className={category === 'game' || category === 'game_fan' ? styles.game : ''}>
                  {categoryData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={categoryData.pageCount}
                category={category}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.tag && tagData && (
            <div className={styles.content}>
              <div className={styles['tag-container']}>
                <strong>세상의 모든 해시태그</strong>
                <ul className={styles['tag-list']}>
                  <li className={router.query.tag === 'apocalypse' && !category ? styles.current : ''}>
                    <Anchor href="/amusement?tag=apocalypse&page=1">
                      <span>#아포칼립스</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'healing' && !category ? styles.current : ''}>
                    <Anchor href="/amusement?tag=healing&page=1">
                      <span>#힐링</span> <span>#치유</span> <span>#감동</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'isekai' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=isekai&page=1">
                      <span>#이세계</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'relife' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=relife&page=1">
                      <span>#전생</span> <span>#전이</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'horror' && category === 'film' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=horror&category=film&page=1">
                      <span>#공포</span> <span>#호러</span> <span>#영화</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'queer' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=queer&page=1">
                      <span>#퀴어</span> <span>#LGBTQ+</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'timeslip' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=timeslip&page=1">
                      <span>#타임슬립</span> <span>#타임리프</span> <span>#타임루프</span> <span>#회귀</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'picaresca' && !category ? styles.current : ''}>
                    <Anchor href="/amusement?tag=picaresca&page=1">
                      <span>#피카레스크</span> <span>#악인전</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'yuri' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=yuri&page=1">
                      <span>#백합</span> <span>#레즈</span>
                    </Anchor>
                  </li>
                  <li className={router.query.tag === 'horror' && category === 'anime' ? styles.current : ''}>
                    <Anchor href="/amusement?tag=horror&category=anime&page=1">
                      <span>#공포</span> <span>#호러</span> <span>#애니</span>
                    </Anchor>
                  </li>
                </ul>
              </div>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />{' '}
                  {tagData.data.length === 0 ? (
                    <span className="preview">Not found hash tag</span>
                  ) : (
                    process.env.NODE_ENV === 'development' && <span>({tagData.total}개 작품)</span>
                  )}
                  <strong>
                    {tagData.data.length > 0 && (
                      <>
                        #{TagName(router.query.tag as string, 'tag')} {category && `#${CategoryName(category)}`}{' '}
                        #유튜브리뷰
                      </>
                    )}
                  </strong>
                </h1>
              </div>
              {tagData.data.length === 0 && (
                <section className={`${styles.error} ${styles['tag-error']}`}>
                  <p>존재하지 않는 해시태그입니다.</p>
                  <p>해시태그를 선택해 주세요</p>
                </section>
              )}
              {Array.isArray(tagData.data) && (
                <section className={category === 'game' ? styles.game : ''}>
                  {tagData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={tagData.pageCount}
                category={category}
                tag={tag}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.platform && platformData && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />{' '}
                  {process.env.NODE_ENV === 'development' && <span>({platformData.total}개 작품)</span>}
                </h1>
                <div className="select">
                  <select onChange={handlePlatformChange} defaultValue={platform}>
                    <option value="">플랫폼(OTT 또는 방송국) 선택</option>
                    <optgroup label="OTT 플랫폼">
                      <option value="apple">애플 TV+</option>
                      <option value="paramount">파라마운트+</option>
                      <option value="amazon">아마존 프라임비디오</option>
                      <option value="netflix">넷플릭스</option>
                      <option value="disney">디즈니+</option>
                      <option value="tving">티빙</option>
                      <option value="watcha">왓챠</option>
                      <option value="wavve">웨이브</option>
                      <option value="wave">웨이브 해외시리즈</option>
                    </optgroup>
                    <optgroup label="애니메이션 방영 일본 방송국">
                      <option value="tokyomx">도쿄MX</option>
                      <option value="tvtokyo">테레토</option>
                      <option value="fujitv">후지테레비</option>
                      <option value="mbs">MBS</option>
                      <option value="tbs">TBS</option>
                      <option value="atx">AT-X</option>
                      <option value="nippontv">닛테레</option>
                      <option value="wowow">wowow</option>
                    </optgroup>
                    <optgroup label="애니메이션 방영 한국 방송국">
                      <option value="aniplus">애니플러스</option>
                      <option value="daewon">애니원</option>
                      <option value="anibox">애니박스</option>
                      <option value="tooniverse">투니버스</option>
                      <option value="animax">애니맥스 코리아</option>
                    </optgroup>
                  </select>
                  <button onClick={handlePlatformSubmit}>선택</button>
                </div>
              </div>
              {Array.isArray(platformData.data) && (
                <section>
                  {platformData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={platformData.pageCount}
                platform={platform}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.hanguk && hangukData && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />{' '}
                  {hangukData.data.length === 0 ? (
                    <span className="preview">Not found script</span>
                  ) : (
                    process.env.NODE_ENV === 'development' && <span>({hangukData.total}개 작품)</span>
                  )}
                </h1>
                <div className="select">
                  <select value={selectedHanguk} onChange={handleHangukChange}>
                    <option value="">선택</option>
                    <option value="subtitle">자막 지원</option>
                    <option value="dubbing">더빙 지원</option>
                    <option value="cc">청각 장애인용 자막 지원</option>
                    <option value="description">화면 해설 지원</option>
                    <option value="anything">지원 작품 전체</option>
                    <option value="both">자막/더빙 둘 다 지원</option>
                    <option value="bfree">베리어프리</option>
                  </select>
                  <button onClick={handleHangukSubmit}>자막 및 화면해설 선택</button>
                </div>
              </div>
              {hangukData.data.length === 0 && (
                <section className={styles.error}>
                  <p>또루뀨막똫!</p>
                  <p>자막, 화면해설 또루뀨막똫!</p>
                </section>
              )}
              {Array.isArray(hangukData.data) && (
                <section className={category === 'game' ? styles.game : ''}>
                  {hangukData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={hangukData.pageCount}
                category={category}
                hanguk={hanguk}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.subdub && subdubData && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />{' '}
                  {subdubData.data.length === 0 ? (
                    <span className="preview">Not found subtitle or dubbing</span>
                  ) : (
                    process.env.NODE_ENV === 'development' && <span>({subdubData.total}개 작품)</span>
                  )}
                </h1>
                <div className="select">
                  <select value={selectedHanguk} onChange={handleHangukChange}>
                    <option value="">선택</option>
                    <option value="subtitle">자막 지원</option>
                    <option value="dubbing">더빙 지원</option>
                    <option value="cc">청각 장애인용 자막 지원</option>
                    <option value="description">화면 해설 지원</option>
                    <option value="anything">지원 작품 전체</option>
                    <option value="both">자막/더빙 둘 다 지원</option>
                    <option value="bfree">베리어프리</option>
                  </select>
                  <button onClick={handleHangukSubmit}>자막 및 화면해설 선택</button>
                </div>
              </div>
              {subdubData.data.length === 0 && (
                <section className={styles.error}>
                  <p>자막/더빙 지원여부 선택에 오류가 있어요</p>
                  <p>다시 선택해 주세요</p>
                </section>
              )}
              {Array.isArray(subdubData.data) && (
                <section className={category === 'game' ? styles.game : ''}>
                  {subdubData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={subdubData.pageCount}
                subdub={subdub}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.bfree && bfreeData && (
            <div className={styles.content}>
              <div className="headline">
                <h1 className="April16thPromise">
                  <em dangerouslySetInnerHTML={{ __html: title }} />{' '}
                  {bfreeData.data.length === 0 ? (
                    <span className="preview">Not found barrier-free</span>
                  ) : (
                    process.env.NODE_ENV === 'development' && <span>({bfreeData.total}개 작품)</span>
                  )}
                </h1>
                <div className="select">
                  <select value={selectedHanguk} onChange={handleHangukChange}>
                    <option value="">선택</option>
                    <option value="subtitle">자막 지원</option>
                    <option value="dubbing">더빙 지원</option>
                    <option value="cc">청각 장애인용 자막 지원</option>
                    <option value="description">화면 해설 지원</option>
                    <option value="anything">지원 작품 전체</option>
                    <option value="both">자막/더빙 둘 다 지원</option>
                    <option value="bfree">베리어프리</option>
                  </select>
                  <button onClick={handleHangukSubmit}>자막 및 화면해설 선택</button>
                </div>
              </div>
              {bfreeData.data.length === 0 && (
                <section className={styles.error}>
                  <p>베리어프리 지원여부 선택에 오류가 있어요</p>
                  <p>다시 선택해 주세요</p>
                </section>
              )}
              {Array.isArray(bfreeData.data) && (
                <section className={category === 'game' ? styles.game : ''}>
                  {bfreeData.data.map((amusement: AmusementData, index: number) => (
                    <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} />
                      <strong>
                        <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                    </Link>
                  ))}
                </section>
              )}
              <Pagination
                currentPage={currentPage}
                pageCount={bfreeData.pageCount}
                bfree={bfree}
                sorting={'amusement'}
              />
            </div>
          )}
          {router.query.literature && literatureData === null && (
            <div className={styles.content}>
              <div className="headline without-select">
                <h1 className="April16thPromise">
                  <em>찾을 수 없는 연결고리</em> <span className="preview">Not Found Literature</span>
                </h1>
              </div>
              <section>
                <p>존재하지 않는 연결고리입니다.</p>
                <p>뒤로 이동해 주세요</p>
              </section>
            </div>
          )}
          {router.query.literature && literatureData && (
            <div className={styles.content}>
              <div className="headline without-select">
                <h1 className="April16thPromise">
                  <em>
                    `{literatureData.attributes.subject}`{' '}
                    {literatureData.attributes.type === 'franchise' ? '프랜차이즈' : '관련 작품'}
                  </em>{' '}
                  {process.env.NODE_ENV === 'development' && <span>({literatureData.total}개 작품)</span>}
                </h1>
                <p
                  dangerouslySetInnerHTML={{ __html: literatureData.attributes.description.replace(/\\n/g, '<br />') }}
                />
              </div>
              {Array.isArray(literatureData.amusementData.data) && (
                <section className={literatureData.attributes.isGame ? styles.game : ''}>
                  {literatureData.amusementData.data
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((amusement: AmusementData) => (
                      <Link key={amusement.order} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} />
                        <strong>
                          <span className="seed">
                            {amusement.titleKorean ? amusement.titleKorean : amusement.title}
                          </span>
                        </strong>
                      </Link>
                    ))}
                </section>
              )}
              <Pagination currentPage={currentPage} pageCount={literatureData.pageCount} sorting={'amusement'} />
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Amusement;

function CategoryTitle(category: keyof typeof CategoryTitle): string {
  const categoryTitles = {
    film: '영화 사회에서는\n영원한 우방도, 영원한 적도 없다!',
    anime: '애니입니다만,\n문제라도?',
    ott: '퇴근 후,\n이세계 OTT에서만\n볼 수 있는 작품을.',
  };
  return categoryTitles[category] || '카테고리를 찾을 수 없어요';
}

function TagTitle(tag: keyof typeof TagTitle, category?: string): string {
  const tagTitles = {
    queer: 'Love Wins',
    yuri: '그 백합잎에 입맞춤을',
    isekai: '마지막으로\n이세계를 부탁드려도 될까요',
    timeslip: '빙글뱅글 타임슬립',
    relife: '이세계에서 N회차',
    healing: '밤은\n치유물과 함께',
    picaresca: '피카레스크\n전성시대',
    apocalypse: '꿈도 희망도 없는\n세상에서.',
    horror:
      category === 'anime'
        ? '심신미약자, 임산부, 노약자\n시청금지 공포 애니!'
        : category === 'film'
          ? '심신미약자, 임산부, 노약자\n시청금지 공포 영화!'
          : '',
  };
  return tagTitles[tag] || '해시태그를 찾을 수 없어요';
}

function PlatformTitle(platform: keyof typeof PlatformTitle): string {
  const platformTitles = {
    amazon: '아마존 프라임비디오\n오리지널 리뷰',
    apple: '애플 TV+\n오리지널 리뷰',
    disney: '디즈니+\n오리지널 리뷰',
    netflix: '넷플릭스\n오리지널 리뷰',
    tving: '티빙\n오리지널 리뷰',
    watcha: '왓챠\n오리지널 리뷰',
    wavve: '웨이브\n온리/오리지널 리뷰',
    wave: '웨이브\n해외시리즈 리뷰',
    paramount: '파라마운트+\n오리지널 리뷰',
    tokyomx: '도쿄MX\n東京MX\n방영 애니메이션',
    tvtokyo: '테레토\nテレ東\n방영 애니메이션',
    fujitv: '후지테레비\nフジテレビ\n방영 애니메이션',
    mbs: 'MBS\n방영 애니메이션',
    tbs: 'TBS\n방영 애니메이션',
    atx: 'AT-X\n방영 애니메이션',
    nippontv: '닛테레\n日テレ 방영 애니메이션',
    wowow: 'WOWOW\n방영 애니메이션',
    aniplus: '애니플러스\n방영 애니메이션',
    daewon: '애니원\n방영 애니메이션',
    anibox: '애니박스\n방영 애니메이션',
    tooniverse: '투니버스\n방영 애니메이션',
    animax: '애니맥스 코리아\n방영 애니메이션',
  };
  return platformTitles[platform] || '플랫폼을 찾을 수 없어요';
}

function HangukTitle(hanguk: keyof typeof HangukTitle, category?: string): string {
  const hangukTitles = {
    subtitle: '한글 자막\n공식 지원',
    dubbing: '한국어 더빙\n공식 지원!',
    cc: '청각 장애인용\n자막 지원!',
    description: '화면 해설\n지원',
    anything: '모든 작품\n한눈에 보기',
  };
  return hangukTitles[hanguk] || '또루뀨막똫';
}

function SubdubTitle(subdub: keyof typeof SubdubTitle): string {
  const subdubTitles = {
    subtitle: '한글 자막\n공식 지원',
    dubbing: '한국어 더빙\n공식 지원!',
    both: '자막/더빙 둘다\n지원하는 작품!',
  };
  return subdubTitles[subdub] || '자막/더빙 지원여부 선택 오류';
}

function BfreeTitle(bfree: keyof typeof BfreeTitle): string {
  const bfreeTitles = {
    cc: '청각 장애인용\n자막 지원!',
    description: '화면 해설\n지원',
    bfree: 'CC(SDH)/AD 둘다\n지원하는 작품!',
  };
  return bfreeTitles[bfree] || '베리어프리 지원여부 선택 오류';
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const category = query.category || null;
  const tag = query.tag || null;
  const platform = query.platform || null;
  const hanguk = query.hanguk || null;
  const subdub = query.subdub || null;
  const bfree = query.bfree || null;
  const literature = query.literature || null;
  const currentPage = Number(query.page) || 1;
  let categoryData = null;
  let tagData = null;
  let platformData = null;
  let hangukData = null;
  let subdubData = null;
  let bfreeData = null;
  let literatureData = null;
  let categoryQuery = null;
  let tagQuery = null;
  let platformQuery = null;
  let hangukQuery = null;
  let subdubQuery = null;
  let bfreeQuery = null;
  let literatureQuery = null;
  let error = null;
  let pageTitle = '카테고리/태그/플랫폼 선택';

  if (!platform && !tag && !hanguk && !subdub && !bfree && !literature) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category?categoryName=${category}&page=${currentPage}&pageSize=48`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      categoryData = await response.json();
      pageTitle = CategoryTitle(category as keyof typeof CategoryTitle);
      categoryQuery = categoryData.data.length > 0 ? context.query.category : 'amusement-error';
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
    return {
      props: {
        categoryQuery: categoryQuery || '',
        ogAddress: categoryQuery || 'amusement-error',
        categoryData,
        category,
        pageTitle,
        currentPage,
        error,
      },
    };
  } else if (tag) {
    if (!category) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tag?tagName=${tag}&page=${currentPage}&pageSize=48`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        tagData = await response.json();
        pageTitle = TagTitle(tag as keyof typeof TagTitle);
        tagQuery = tagData.data.length > 0 ? context.query.tag : 'amusement-error';
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
      }
      return {
        props: {
          tagQuery: tagQuery || '',
          ogAddress: tagQuery || 'amusement-error',
          tagData,
          tag,
          pageTitle,
          currentPage,
          error,
        },
      };
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tag?tagName=${tag}&categoryName=${category}&page=${currentPage}&pageSize=48`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        tagData = await response.json();
        pageTitle = TagTitle(tag as keyof typeof TagTitle, category);
        tagQuery = tagData.data.length > 0 ? context.query.tag + '-' + context.query.category : 'amusement-error';
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
      }
      return {
        props: {
          tagQuery: context.query.tag || '',
          tagData,
          tag,
          categoryQuery: context.query.category || '',
          categoryData,
          category,
          pageTitle,
          ogAddress: tagQuery || 'amusement-error',
          currentPage,
          error,
        },
      };
    }
  } else if (hanguk) {
    if (!category) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?hangukName=${hanguk}&page=${currentPage}&pageSize=48`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        hangukData = await response.json();
        pageTitle = HangukTitle(hanguk as keyof typeof HangukTitle);
        hangukQuery = hangukData.data.length > 0 ? context.query.hanguk : 'amusement-error';
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
      }
      return {
        props: {
          hangukQuery: hangukQuery || '',
          ogAddress: hangukQuery || 'amusement-error',
          hangukData,
          hanguk,
          pageTitle,
          currentPage,
          error,
        },
      };
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hanguk?hangukName=${hanguk}&categoryName=${category}&page=${currentPage}&pageSize=48`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        hangukData = await response.json();
        pageTitle = HangukTitle(hanguk as keyof typeof HangukTitle, category);
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
      }
      return {
        props: {
          hangukQuery: context.query.hanguk || '',
          hangukData,
          hanguk,
          categoryQuery: context.query.category || '',
          categoryData,
          category,
          pageTitle,
          ogAddress: context.query.hanguk + '-' + context.query.category || 'amusement-error',
          currentPage,
          error,
        },
      };
    }
  } else if (subdub) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subdub?subdubName=${subdub}&page=${currentPage}&pageSize=48`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      subdubData = await response.json();
      pageTitle = SubdubTitle(subdub as keyof typeof SubdubTitle);
      subdubQuery = subdubData.data.length > 0 ? context.query.subdub : 'amusement-error';
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
    return {
      props: {
        subdubQuery: subdubQuery || '',
        ogAddress: subdubQuery || 'amusement-error',
        subdubData,
        subdub,
        pageTitle,
        currentPage,
        error,
      },
    };
  } else if (bfree) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bfree?bfreeName=${bfree}&page=${currentPage}&pageSize=48`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      bfreeData = await response.json();
      pageTitle = BfreeTitle(bfree as keyof typeof BfreeTitle);
      bfreeQuery = bfreeData.data.length > 0 ? context.query.bfree : 'amusement-error';
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
    return {
      props: {
        subdubQuery: bfreeQuery || '',
        ogAddress: bfreeQuery || 'amusement-error',
        bfreeData,
        bfree,
        pageTitle,
        currentPage,
        error,
      },
    };
  } else if (platform) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/platform?platformName=${platform}&page=${currentPage}&pageSize=48`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      platformData = await response.json();
      pageTitle = PlatformTitle(platform as keyof typeof PlatformTitle);
      platformQuery = context.query.platform;
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
      platformQuery = 'amusement-error';
    }
    return {
      props: {
        platformQuery: platformQuery || '',
        ogAddress: platformQuery || 'amusement-error',
        platformData,
        platform,
        pageTitle,
        currentPage,
        error,
      },
    };
  } else if (literature) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/literature?id=${literature}&page=${currentPage}&pageSize=48`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      literatureData = await response.json();
      literatureQuery = 'literature-' + context.query.literature;
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
      literatureQuery = 'amusement-error';
    }
    return {
      props: {
        literatureQuery: context.query.literature || '',
        ogAddress: literatureQuery || 'amusement-error',
        literatureData,
        literature,
        currentPage,
        error,
      },
    };
  } else if (
    category === null &&
    tag === null &&
    platform === null &&
    hanguk === null &&
    subdub === null &&
    bfree === null &&
    literature === null
  ) {
    return {
      props: {
        categoryQuery: '',
        tagQuery: '',
        platformQuery: '',
        categoryData,
        tagData,
        platformData,
        hangukData,
        bfreeData,
        ogAddress: 'default',
        error,
      },
    };
  }
}
