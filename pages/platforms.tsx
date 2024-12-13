import { useEffect, useState } from 'react';
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

function Platforms({ tvingData, tvingError }: { tvingData: any; tvingError: string }) {
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
    sessionStorage.removeItem('hanguk');
    sessionStorage.removeItem('subdub');
    sessionStorage.removeItem('bfree');

    sessionStorage.removeItem('ai');
    sessionStorage.removeItem('works');

    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('platform', router.asPath);
  }, [router.asPath]);

  const [netflixData, setNetflixData] = useState<MoeviewAmusementData | null>(null);
  const [amazonData, setAmazonData] = useState<MoeviewAmusementData | null>(null);
  const [tokyomxData, setTokyomxData] = useState<MoeviewAmusementData | null>(null);
  const [aniplusData, setAniplusData] = useState<MoeviewAmusementData | null>(null);

  const [netflixLoading, setNetflixLoading] = useState(true);
  const [amazonLoading, setAmazonLoading] = useState(true);
  const [tokyomxLoading, setTokyomxLoading] = useState(true);
  const [aniplusLoading, setAniplusLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/api/platform?page=1&pageSize=7&platformName=netflix');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        setNetflixData(data);
        setNetflixLoading(false);

        response = await fetch('/api/platform?page=1&pageSize=7&platformName=amazon');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setAmazonData(data);
        setAmazonLoading(false);

        response = await fetch('/api/platform?page=1&pageSize=7&platformName=tokyomx');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setTokyomxData(data);
        setTokyomxLoading(false);

        response = await fetch('/api/platform?page=1&pageSize=7&platformName=aniplus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        data = await response.json();
        setAniplusData(data);
        setAniplusLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류');
        }
        setNetflixLoading(false);
        setAmazonLoading(false);
        setTokyomxLoading(false);
        setAniplusLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className={styles.categories}>
      <Seo
        pageTitles={`OTT 플랫폼 또는 방송국 선택하기 - ${originTitle}`}
        pageTitle={`OTT 플랫폼 또는 방송국 선택하기`}
        pageDescription="아마존 프라임비디오 / 애플 TV+ / 디즈니+ & 스타+ / 넷플릭스 / 티빙 & 파라마운트+ / 왓챠 / 웨이브"
        pageImg={`https://semo.dev1stud.io/og-platforms.webp?ts=${timestamp}`}
      />
      <ChoiceGenre />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: 'OTT 플랫폼/방송사를<br/>골라보세요!' }} />
        </h1>
      </div>
      {(tvingError || error) && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button type="button" onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      )}
      <div className={styles.content}>
        {!tvingError && tvingData && (
          <>
            <div className={styles.headline}>
              <h2 className="April16thPromise">
                <Anchor href="/amusement?platform=tving&page=1">티빙 오리지널 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && ` ${tvingData.total}개`}
              </h2>
              <Anchor href="/amusement?platform=tving&page=1">
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
              {Array.isArray(tvingData.data) &&
                tvingData.data.map((amusement: AmusementData, index: number) => (
                  <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                    <AmusementItem amusement={amusement} platform={'tving'} />
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
                <Anchor href="/amusement?platform=netflix&page=1">넷플릭스 오리지널 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && netflixData && ` ${netflixData.total}개`}
              </h2>
              <Anchor href="/amusement?platform=netflix&page=1">
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
              {!netflixLoading ? (
                <>
                  {netflixData &&
                    Array.isArray(netflixData.data) &&
                    netflixData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} platform={'netflix'} />
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
                <Anchor href="/amusement?platform=amazon&page=1">아마존 프라임비디오 오리지널 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && amazonData && ` ${amazonData.total}개`}
              </h2>
              <Anchor href="/amusement?platform=amazon&page=1">
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
              {!amazonLoading ? (
                <>
                  {amazonData &&
                    Array.isArray(amazonData.data) &&
                    amazonData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} platform={'amazon'} />
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
                <Anchor href="/amusement?platform=tokyomx&page=1">도쿄MX 방영 애니 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && tokyomxData && ` ${tokyomxData.total}개`}
              </h2>
              <Anchor href="/amusement?platform=KBS2&page=1">
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
              {!tokyomxLoading ? (
                <>
                  {tokyomxData &&
                    Array.isArray(tokyomxData.data) &&
                    tokyomxData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} platform={'tokyomx'} />
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
                <Anchor href="/amusement?platform=aniplus&page=1">애니플러스 방영 애니 리뷰</Anchor>
                {process.env.NODE_ENV === 'development' && aniplusData && ` ${aniplusData.total}개`}
              </h2>
              <Anchor href="/amusement?platform=tvN&page=1">
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
              {!aniplusLoading ? (
                <>
                  {aniplusData &&
                    Array.isArray(aniplusData.data) &&
                    aniplusData.data.map((amusement: AmusementData, index: number) => (
                      <Link key={index} href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                        <AmusementItem amusement={amusement} platform={'aniplus'} />
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
          <p>좀 더 많은 OTT/방송국을 보고 싶으신가요?</p>
          <p className="April16thPromise">
            <Anchor href="/amusement">플랫폼을 골라보세요!</Anchor>
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Platforms;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let tvingData = null;
  let tvingError = null;

  try {
    const tving = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/platform?page=1&pageSize=7&platformName=tving`);
    if (!tving.ok) {
      throw new Error('Network response was not ok');
    }
    tvingData = await tving.json();
  } catch (err) {
    tvingError = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      tvingData,
      tvingError,
    },
  };
};
