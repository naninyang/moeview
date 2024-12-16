import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { AmusementData, MoeviewAmusementData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import ChoiceBarrierFree from '@/components/ChoiceBarrierFree';
import { AmusementItem } from '@/components/AmusementItem';
import styles from '@/styles/Categories.module.sass';
import { VectorsSupportLang } from '@/components/vectors';

const HangukBackground = styled.div({
  background: `url(${VectorsSupportLang.src}) no-repeat 50% 50%/cover`,
});

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

function Subdub({ subtitleData, subtitleError }: { subtitleData: any; subtitleError: string }) {
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
    sessionStorage.removeItem('tag');
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.setItem('subdub', router.asPath);
  }, [router.asPath]);

  const [dubbingData, setDubbingData] = useState<MoeviewAmusementData | null>(null);
  const [bothData, setBothData] = useState<MoeviewAmusementData | null>(null);

  const [dubbingLoading, setDubbingLoading] = useState(true);
  const [bothLoading, setBothLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/subdub?page=1&pageSize=7&subdubName=dubbing');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setDubbingData(data);
        setDubbingLoading(false);

        response = await fetch('/api/subdub?page=1&pageSize=7&subdubName=both');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setBothData(data);
        setBothLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setDubbingLoading(false);
        setBothLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`자막/더빙 지원 여부 확인하기 - ${originTitle}`}
        pageTitle={`자막/더빙 지원 여부 확인하기`}
        pageDescription="한글 자막, 한국어 더빙"
        pageImg={`https://moe.dev1stud.io/og-subdub.webp?ts=${timestamp}`}
      />
      <ChoiceBarrierFree />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '자막/더빙<br/>지원 작품!' }} />
        </h1>
      </div>
      {(subtitleError || error) && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      <div className={styles.content}>
        {!subtitleError && subtitleData && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?subdub=subtitle&page=1">한글 자막 공식 지원!</Anchor>
                {process.env.NODE_ENV === 'development' && ` ${subtitleData.total}개`}
              </h2>
              <Anchor href="/amusement?subdub=subtitle&page=1">
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
              {Array.isArray(subtitleData.data) &&
                subtitleData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} supportLanguage={'subtitle'} />
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
                <Anchor href="/amusement?subdub=both&page=1">자막/더빙 둘다 지원하는 작품!</Anchor>
                {process.env.NODE_ENV === 'development' && bothData && ` ${bothData.total}개`}
              </h2>
              <Anchor href="/amusement?subdub=both&page=1">
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
              {!bothLoading ? (
                <>
                  {bothData &&
                    Array.isArray(bothData.data) &&
                    bothData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} supportLanguage={'both'} />
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
        <aside className={styles.hanguk}>
          <HangukBackground />
          <p>베리어프리 작품 확인!</p>
          <p className="April16thPromise">
            <Anchor href="/barrier-free">작품 확인하기!</Anchor>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Subdub;

export const getServerSideProps: GetServerSideProps = async () => {
  let subtitleData = null;
  let bothData = null;
  let subtitleError = null;

  try {
    const subtitle = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subdub?page=1&pageSize=7&subdubName=subtitle`);
    if (!subtitle.ok) {
      throw new Error('Network response was not ok');
    }
    subtitleData = await subtitle.json();
  } catch (err) {
    subtitleError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      subtitleData,
      subtitleError,
    },
  };
};
