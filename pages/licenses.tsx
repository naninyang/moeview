import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import styles from '@/styles/Usage.module.sass';

function Licenses() {
  const router = useRouter();
  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('backhistory');
    if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push('/');
    }
  };

  const timestamp = Date.now();

  return (
    <main className={styles.usage}>
      <Seo
        pageTitles={`저작권 안내 - ${originTitle}`}
        pageTitle="저작권 안내"
        pageDescription="저작권 안내"
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
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>저작권 안내</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.licenses</em>
        </h1>
        <div className={styles.container}>
          <article>
            <h2>소스 저작권 안내</h2>
            <section>
              <p>
                모든 YouTube 영상은 YouTube 및 각 영상 제작자에게 저작권이 있으며, 영상에서 사용된 원본 소스는 원본 소스
                제작사에게 저작권이 있습니다.
              </p>
              <p>또한 모든 작품은 각 작품의 이해관계자에게 저작권이 있습니다.</p>
            </section>
          </article>
          <article>
            <h2>OTT 서비스 및 방송사의 권리</h2>
            <section>
              <p>
                OTT 및 방송국의 브랜드 로고는 각 OTT 플랫폼 서비스 및 방송사에 권리가 있으며, 리뷰에서 언급되는 OTT
                작품은 OTT 서비스 구독 이후 시청 가능합니다.
              </p>
            </section>
          </article>
          <article>
            <h2>SCP 재단 콘텐츠 라이선스</h2>
            <section>
              <p>
                SCP 재단 로고를 포함한 SCP 재단 관련 콘텐츠는 Creative Commons Sharelike 3.0에 따라 라이선스가 부여되며,
                모든 콘셉트의 출처는 scpwiki.com 및 해당 저자에서 비롯됩니다.
              </p>
              <p>이 콘텐츠들에서 파생된 영상은 이에 따라 Creative Commons Sharealike 3.0에 따라 배포됩니다.</p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Licenses;
