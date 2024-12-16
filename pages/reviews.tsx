import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Counts, MoeviewData } from '@/types';
import Seo from '@/components/Seo';
import { Pagination } from '@/components/Pagination';
import { ReviewItem } from '@/components/ReviewItem';
import styles from '@/styles/Reviews.module.sass';

function Review({ data, error, currentPage }: { data: any; error: string; currentPage: number }) {
  const router = useRouter();
  const timestamp = Date.now();

  useEffect(() => {
    sessionStorage.setItem('backhistory', router.asPath);
    sessionStorage.setItem('semoview', router.asPath);
    sessionStorage.removeItem('home');
    sessionStorage.removeItem('works');
  }, [router.asPath]);

  const [count, setCount] = useState<Counts | null>(null);

  async function fetchCountData() {
    try {
      const response = await fetch(`/api/count`);
      const data = await response.json();
      setCount(data);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchCountData();
  }, []);

  return (
    <main className={styles.reviews}>
      <Seo
        pageTitle="세상의 모든 리뷰"
        pageDescription="세상의 모든 리뷰를 수집한다"
        pageImg={`https://moe.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="headline">
        <h1 className="April16thPromise">
          <em dangerouslySetInnerHTML={{ __html: '유튜브<br/>리뷰 보기' }} />{' '}
          {count && process.env.NODE_ENV === 'development' && <span>({count.total} 개 리뷰/실황)</span>}
        </h1>
      </div>
      <div className={styles.list}>
        {error && (
          <div className={styles.error}>
            <p>데이터를 불러오는데 실패했습니다.</p>
            <button type="button" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          </div>
        )}
        {data && !error && (
          <div className={styles['moeview-content']}>
            {Array.isArray(data.moeviews) &&
              data.moeviews.map((moeview: MoeviewData) => (
                <div className={styles.item} key={moeview.id}>
                  <ReviewItem moeview={moeview} />
                </div>
              ))}
            <Pagination currentPage={currentPage} pageCount={data.pageCount} sorting={'review'} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Review;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let data = null;
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/moeviews?page=${currentPage}&both=false`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      data,
      error,
      currentPage,
    },
  };
};
