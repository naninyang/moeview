import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isSafari } from 'react-device-detect';
import { AmusementData, MoeviewData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import { AmusementItem } from '@/components/AmusementItem';
import { Pagination } from '@/components/Pagination';
import styles from '@/styles/Works.module.sass';

function Works({ currentPage, worksData, error }: { currentPage: number; worksData: any; error: string }) {
  const router = useRouter();

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

    sessionStorage.removeItem('ai');
    sessionStorage.setItem('works', router.asPath);
  }, [router.asPath]);

  const previousPageHandler = () => {
    router.push('/');
  };

  const timestamp = Date.now();

  return (
    <main className={styles.works}>
      <Seo
        pageTitles={`작품목록 - ${originTitle}`}
        pageTitle="문의사항"
        pageDescription="무엇이든 물어보세요"
        pageImg={`https://moe.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <h1>
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>작품목록</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.works</em>
        </h1>
        <div className={styles.summary}>
          <p>
            모애뷰에 등록된 <span>작품 전체를 보실 수 있습니다.</span>
          </p>
          {error && <p>서버가 불안정합니다. 잠시후에 다시 시도해 보세요.</p>}
        </div>
        {worksData && (
          <>
            <div className={styles.list}>
              {Array.isArray(worksData.data) &&
                worksData.data.map((amusement: AmusementData, index: number) => (
                  <div key={index} className={styles.item}>
                    <Link href={`/amusement/${amusement.idx}`} scroll={false} shallow={true}>
                      <AmusementItem amusement={amusement} page="square" />
                      <strong>
                        <span>{amusement.titleKorean ? amusement.titleKorean : amusement.title}</span>
                      </strong>
                      {(amusement.related || amusement.amusementsCount !== undefined) && (
                        <ul>
                          {amusement.related && (
                            <li>
                              <b>{amusement.related.length}</b>개 관련 영상
                            </li>
                          )}
                          {amusement.amusementsCount !== undefined && (
                            <li>
                              {amusement.amusementsCount > 0 ? (
                                <>
                                  <b>{amusement.amusementsCount}</b>개 유튜브 리뷰
                                </>
                              ) : (
                                <b>리뷰가 없습니다</b>
                              )}
                            </li>
                          )}
                        </ul>
                      )}
                    </Link>
                  </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} pageCount={worksData.pageCount} sorting={'works'} />
          </>
        )}
      </div>
    </main>
  );
}

export default Works;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let worksData = null;
  let error = null;

  try {
    const worksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works?page=${currentPage}&pageSize=30`);
    if (!worksResponse.ok) {
      throw new Error('Network response was not ok');
    }
    worksData = await worksResponse.json();

    if (worksData && Array.isArray(worksData.data)) {
      const fetchAdditionalData = async (id: string) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/moeviewAmusement?page=1&amusementId=${id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.moeviews.length;
      };

      const updatedData = await Promise.all(
        worksData.data.map(async (amusement: AmusementData) => {
          const amusementsCount = await fetchAdditionalData(amusement.id);
          return { ...amusement, amusementsCount };
        }),
      );

      worksData.data = updatedData;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      worksData,
      error,
      currentPage,
    },
  };
};
