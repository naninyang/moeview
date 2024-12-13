import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AmusementData, MoeviewAmusementData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceGenre from '@/components/ChoiceGenre';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Categories.module.sass';

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

function Tags({ horrorFilmData, horrorFilmError }: { horrorFilmData: any; horrorFilmError: string }) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.removeItem('amusementCategory');
    sessionStorage.removeItem('amusementTag');
    sessionStorage.removeItem('amusementPlatform');
    sessionStorage.removeItem('amusementHanguk');
    sessionStorage.removeItem('amusementSubdub');
    sessionStorage.removeItem('amusementBfree');

    sessionStorage.removeItem('category');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('tag', router.asPath);
  }, [router.asPath]);

  const [horrorAnimeData, setHorrorAnimeData] = useState<MoeviewAmusementData | null>(null);
  const [healingData, setHealingData] = useState<MoeviewAmusementData | null>(null);

  const [horrorAnimeLoading, setHorrorAnimeLoading] = useState(true);
  const [healingLoading, setHealingLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/tag?page=1&pageSize=7&tagName=horror&categoryName=anime');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setHorrorAnimeData(data);
        setHorrorAnimeLoading(false);

        response = await fetch('/api/tag?page=1&pageSize=7&tagName=healing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setHealingData(data);
        setHealingLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setHorrorAnimeLoading(false);
        setHealingLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`리뷰 태그 선택하기 - ${originTitle}`}
        pageTitle={`리뷰 태그 선택하기`}
        pageDescription="#힐링 #치유 #감동 #백합 #레즈 #퀴어 #LGBTQ+ #이세계 #타임슬립 #타임리프 #타임루프 #회귀 #이상현상 #아노말리 #아포칼립스 #피카레스크 #악인전 #공포 #호러 #경영 #전략 #시뮬레이션 #백룸 #전생 #전이"
        pageImg={`https://semo.dev1stud.io/og-tags.webp?ts=${timestamp}`}
      />
      <ChoiceGenre />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '태그 골라보기!' }} />
        </h1>
      </div>
      {(horrorFilmError || error) && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      <div className={styles.content}>
        {!horrorFilmError && horrorFilmData && horrorFilmData.total > 0 && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?tag=horror&category=film&page=1">
                  <span>#공포</span> <span>#호러</span> <span>#영화</span> <span>#유튜브리뷰</span>
                </Anchor>
                {process.env.NODE_ENV === 'development' && horrorFilmData && ` ${horrorFilmData.total}개`}
              </h2>
              <Anchor href="/amusement?tag=horror&category=film&page=1">
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
              {horrorFilmData &&
                Array.isArray(horrorFilmData.data) &&
                horrorFilmData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} />
                    <strong>
                      <span className="seed">{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                    </strong>
                  </Link>
                ))}
            </section>
          </>
        )}
        {!error && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?tag=horror&category=anime&page=1">
                  <span>#공포</span> <span>#호러</span> <span>#시리즈</span> <span>#유튜브리뷰</span>
                </Anchor>
                {process.env.NODE_ENV === 'development' && horrorAnimeData && ` ${horrorAnimeData.total}개`}
              </h2>
              <Anchor href="/amusement?tag=horror&category=anime&page=1">
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
              {!horrorAnimeLoading ? (
                <>
                  {horrorAnimeData &&
                    Array.isArray(horrorAnimeData.data) &&
                    horrorAnimeData.data.map((amusement: AmusementData, index: number) => (
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
                  <span>#힐링</span> <span>#치유</span> <span>#감동</span> <span>#드라마</span> <span>#영화</span>{' '}
                  <span>#애니</span> <span>#유튜브리뷰</span>
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
          </>
        )}
        <aside>
          <div className={styles.sideA} />
          <div className={styles.sideB} />
          <p>좀 더 많은 태그를 보고 싶으신가요?</p>
          <p className="April16thPromise">
            <Anchor href="/amusement">태그를 골라보세요!</Anchor>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Tags;

export const getServerSideProps: GetServerSideProps = async () => {
  let horrorFilmData = null;
  let horrorFilmError = null;

  try {
    const horrorFilm = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tag?page=1&pageSize=7&tagName=horror&categoryName=film`,
    );
    if (!horrorFilm.ok) {
      throw new Error('Network response was not ok');
    }
    horrorFilmData = await horrorFilm.json();
  } catch (err) {
    horrorFilmError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      horrorFilmData,
      horrorFilmError,
    },
  };
};
