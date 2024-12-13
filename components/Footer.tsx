import styles from '@/styles/Footer.module.sass';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Anchor from './Anchor';
import {
  VectorsStudioDefault,
  VectorsStudioDark,
  VectorsDev1studioDark,
  VectorsDev1studioLight,
  VectorsGithubDark,
  VectorsGithubLight,
} from './vectors';

const StudioDefault = styled.i({
  background: `url(${VectorsStudioDefault.src}) no-repeat 50% 50%/contain`,
});

const StudioDark = styled.i({
  background: `url(${VectorsStudioDark.src}) no-repeat 50% 50%/contain`,
});

const Dev1studioDark = styled.i({
  background: `url(${VectorsDev1studioDark.src}) no-repeat 50% 50%/contain`,
});

const Dev1studioLight = styled.i({
  background: `url(${VectorsDev1studioLight.src}) no-repeat 50% 50%/contain`,
});

const GithubDark = styled.i({
  background: `url(${VectorsGithubDark.src}) no-repeat 50% 50%/contain`,
});

const GithubLight = styled.i({
  background: `url(${VectorsGithubLight.src}) no-repeat 50% 50%/contain`,
});

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.site}>
          <Anchor href="https://dev1stud.io">
            {router.pathname === '/amusement/[amusementId]' ||
            router.pathname === '/recommend/[recommendId]' ||
            router.pathname === '/open-sources' ? (
              <Dev1studioLight />
            ) : (
              <Dev1studioDark />
            )}
            <span>데브런닷스튜디오</span>
          </Anchor>
          <Anchor href="https://github.com/naninyang/semoview">
            {router.pathname === '/amusement/[amusementId]' ||
            router.pathname === '/recommend/[recommendId]' ||
            router.pathname === '/open-sources' ? (
              <GithubLight />
            ) : (
              <GithubDark />
            )}
            <span>모애뷰 깃헙 저장소</span>
          </Anchor>
        </div>
        <div className={styles.content}>
          <dl>
            <div>
              <dt>저작권 안내</dt>
              <div>
                <dd>
                  <Anchor href="/licenses">소스 저작권 안내</Anchor>
                </dd>
                <dd>
                  <Anchor href="/licenses">OTT 서비스 및 방송사의 권리</Anchor>
                </dd>
                <dd>
                  <Anchor href="/licenses">SCP 재단 콘텐츠 라이선스</Anchor>
                </dd>
              </div>
            </div>
            <div>
              <dt>이용안내</dt>
              <div>
                <dd>
                  <Anchor href="/usage">심의등급 안내</Anchor>
                </dd>
                <dd>
                  <Anchor href="/usage">베리어프리 콘텐츠 이용 안내</Anchor>
                </dd>
                <dd>
                  <Anchor href="/usage">모애뷰 소개</Anchor>
                </dd>
              </div>
            </div>
            <div>
              <dt>문의&공지</dt>
              <div>
                <dd>
                  <Anchor href="/contact-us">문의하기</Anchor>
                </dd>
                <dd>
                  <Anchor href="/notices">공지사항</Anchor>
                </dd>
                <dd>
                  <Anchor href="/open-sources">오픈소스</Anchor>
                </dd>
              </div>
            </div>
          </dl>
        </div>
        <div className={styles.studio}>
          <p className={styles.copyright} lang="en">
            &copy; Copyrights{' '}
            {router.pathname === '/amusement/[amusementId]' ||
            router.pathname === '/recommend/[recommendId]' ||
            router.pathname === '/open-sources' ? (
              <StudioDark />
            ) : (
              <StudioDefault />
            )}
            <strong>DEV1L.studios</strong> <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
