import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import styles from '@/styles/Header.module.sass';
import { VectorsMoeview, VectorsMoeviewDark, VectorsMoeviewDefault } from './vectors';

const SemoviewLogo = styled.i({
  background: `url(${VectorsMoeview.src}) no-repeat 50% 50%/contain`,
});

const SemoviewDark = styled.i({
  background: `url(${VectorsMoeviewDark.src}) no-repeat 50% 50%/contain`,
});

const SemoviewDefault = styled.i({
  background: `url(${VectorsMoeviewDefault.src}) no-repeat 50% 50%/contain`,
});

export default function Header() {
  const router = useRouter();

  return (
    <header
      className={`${styles.header} ${router.pathname === '/amusement/[amusementId]' || router.pathname === '/recommend/[recommendId]' || router.pathname === '/open-sources' ? styles.dark : router.pathname === '/' ? styles.main : ''}`}
    >
      <div className={styles.container}>
        {router.pathname === '/' ||
        router.pathname === '/reviews' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms' ||
        router.pathname === '/hanguk' ||
        router.pathname === '/subdub' ||
        router.pathname === '/barrier-free' ? undefined : (
          <s />
        )}
        <h1>
          <Anchor href="/">
            {router.pathname === '/amusement/[amusementId]' || router.pathname === '/open-sources' ? (
              <SemoviewDark />
            ) : router.pathname === '/' ||
              router.pathname === '/reviews' ||
              router.pathname === '/categories' ||
              router.pathname === '/tags' ||
              router.pathname === '/platforms' ||
              router.pathname === '/hanguk' ||
              router.pathname === '/subdub' ||
              router.pathname === '/barrier-free' ? (
              <SemoviewDefault />
            ) : (
              <SemoviewLogo />
            )}
            <span>모듬 애니리뷰</span>
          </Anchor>
        </h1>
        <nav>
          <ol>
            <li>
              <Anchor href="/works">작품목록</Anchor>
            </li>
            <li>
              <Anchor href="/contact-us">문의하기</Anchor>
            </li>
          </ol>
        </nav>
      </div>
      {(router.pathname === '/reviews' ||
        router.pathname === '/categories' ||
        router.pathname === '/tags' ||
        router.pathname === '/platforms' ||
        router.pathname === '/hanguk' ||
        router.pathname === '/subdub' ||
        router.pathname === '/barrier-free' ||
        router.pathname === '/recommends') && (
        <div className={styles.tab}>
          <nav>
            <ol>
              <li className={router.pathname === '/reviews' ? styles.current : ''}>
                <Anchor href="/reviews">
                  <span>리뷰보기</span>
                </Anchor>
              </li>
              <li
                className={
                  router.pathname === '/categories' || router.pathname === '/tags' || router.pathname === '/platforms'
                    ? styles.current
                    : ''
                }
              >
                <Anchor href="/categories">
                  <span>작품정보</span>
                </Anchor>
              </li>
              <li
                className={
                  router.pathname === '/hanguk' || router.pathname === '/subdub' || router.pathname === '/barrier-free'
                    ? styles.current
                    : ''
                }
              >
                <Anchor href="/hanguk">
                  <span>베리어프리</span>
                </Anchor>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </header>
  );
}
