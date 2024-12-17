import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import styles from '@/styles/Usage.module.sass';
import styled from '@emotion/styled';
import Image from 'next/image';
import Anchor from '@/components/Anchor';
import { VectorsMoeview, VectorsSemoview } from '@/components/vectors';

const MoeviewLogo = styled.i({
  background: `url(${VectorsMoeview.src}) no-repeat 50% 50%/contain`,
});

const SemoviewLogo = styled.i({
  background: `url(${VectorsSemoview.src}) no-repeat 50% 50%/contain`,
});

function Usage() {
  const [deviceSafari, setDeviceSafari] = useState<string>();

  useEffect(() => {
    if (isSafari) {
      setDeviceSafari('isSafari');
    }
  }, []);

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
        pageTitles={`이용안내 - ${originTitle}`}
        pageTitle="이용안내"
        pageDescription="이용 안내"
        pageImg={`https://moe.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <div className={`${styles.about} seed`}>
          <section className={deviceSafari !== 'isSafari' ? styles.safari : ''}>
            <div className={styles.primary}>
              <div className={styles.head}>
                <h1>
                  <span>
                    <em>모</em>듬 <em>애</em>니 리<i>뷰</i>
                  </span>
                  <MoeviewLogo />
                </h1>
                <h1>
                  <span>
                    <em>세</em>상의 <em>모</em>든 <i>리뷰</i>
                  </span>
                  <SemoviewLogo />
                </h1>
              </div>
              <p>
                모애뷰d와 세모뷰는 유튜브에 올라온 리뷰 영상들을 <span>눌러보지 않고도 어떤 작품인지 작품 정보를</span>{' '}
                알 수 있게 해보자는 생각으로 탄생한 리뷰 전용 서비스입니다.
              </p>
            </div>
          </section>
          <section>
            <div className={styles.soul}>
              <div className={styles.headline}>
                <h2>Feel your soul</h2>
                <p>
                  작품 보기 전, 당신이 찾아보고 싶은 작품의 리뷰를 먼저 보고{' '}
                  <span>기본 정보를 이해한 뒤 작품을 본다면 더 재미있겠죠?!</span>
                </p>
              </div>
              <div className={styles.dummy} />
            </div>
          </section>
          <section>
            <div className={styles.fit}>
              <div className={styles.headline}>
                <h2>Feel your fit</h2>
                <p>당신이 가지고 있는 디바이스에 맞춰 모애뷰를 즐기세요!</p>
              </div>
              <div className={styles.dummy} />
            </div>
          </section>
          <section>
            <div className={styles.life}>
              <div className={styles.headline}>
                <h2>Feel your life</h2>
                <p>
                  당신의 라이프에 맞춰서 골라 보세요! <span>영화, 드라마, 애니메이션, </span> 그리고 방송사 공식
                  요약본에 게임 실황까지!
                </p>
                <p>
                  *모애뷰에서는 애니메이션만 취급합니다. <span>(세모뷰에서는 애니메이션 취급하지 않습니다.)</span>
                </p>
              </div>
              <div className={styles.dummies}>
                <div className={styles.dummy} />
                <div className={styles.dummy} />
                <div className={styles.dummy} />
              </div>
            </div>
          </section>
          <section className={styles.amusement}>
            <div className={styles.amusement}>
              <div className={styles.headline}>
                <h2>
                  <Anchor href="/categories">
                    <span>featured Amusements</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 5.92969L8.5 7.42969L13.0703 12L8.5 16.5703L10 18.0703L16.0703 12L10 5.92969Z"
                        fill="black"
                      />
                    </svg>
                  </Anchor>
                </h2>
              </div>
              <div className={styles.images}>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/semoview/EpZNLhW2jmJAXmVpeOKmhBs_AGIfRfrUMcww3iL3jmqD1dyqXBQaV7yZm4w30-MtOmha0oa_hASSJXmBwvGPhg_QSQbhDXMKDhvaKoIgO8XQEJVTmjZMFiu3A_RrjgGXRIfWp5YppL-ctJILXqIqiw.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>누군가는 거짓말을 하고 있다</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/PuFSahyVDNbQLHubBlJUzRzjR7RJCIomI1dYfzQKh_dr2SBHI2S2JI67EkONetHLhZSmPCX6UV20osNcSjwWp0U-slL3NXucdjDu-Vm-Dp4Sq8UU30MCTvMOmzvLlo6iGU-zr-T8ixTJdQsk_ZrKVivFpi0XwDNYalTmABlWUdk.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>소용없어 거짓말</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/FPolvRgxUwYWhK3biTFdqEo4si4SSeq6p0IhlM9ORhmlt9_wDYgwD2z5tvytmOTQmy95eyAc2jl0fZJSmMRB0hC7xzbwM74kKtqmuRAFSqhPJNms8G7zVfJSPMJvG0E9iXlC4hXoTefS5q75S8DM3Q.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>왓쳐</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/gayBfQsk13TyNSB-0jv6myIkPnL8UPX4MMp4SZ6mQ2m4b8_vwaHugpF0voyubNLlBvLcgbjKN4zZza-5akLpB1hF2JPYHV8x8hX_cES-O39DwK_hjEjLDbydyGSL1NKnbtHsPUX3gMEU5gI5qSuXaA.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>기생수: 더 그레이</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/semoview/akHZzJOI59Ceg4ZVUDniyjSS9dkn_u5LMMQIp0OnNH67XCazQwhQRfFNn6wU9dif8s_aam-6C-GzTtqp4vI7vYR4SxDDJGTmRrpi-GTdxrTHTilNJV4JUMuzr6iDTflg-u7x_Mfu9fEfkgbr1ZzFCw.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>여고추리반3</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/semoview/jRTTVsGZDY7Zcim.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>레인코트 킬러: 유영철을 추격하다</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/NCdyhGX3H0R8e3T9MN8tKY5WU1UZvto_askemNHtPdsrPaFUX6av40cVHeNKztt5T2hHpKIqfHhsZo5rbzkmWad11nljIWJGxuN6R18IN8M3HJ7LV9XGM1R3EPpZPwtVGhu9Nb4Q2BBXgKzWvAx77A.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>오늘 밤, 세계에서 이 사랑이 사라진다 해도</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/q2OsUK4Fnic8r4V04DD2dujPs7jimlauRz8SEW3bb9ElWTde1b6tEF1A7TX-4MfhTrYj_keORVG4QY2gffhlwng9mqIFV2CHj2Q400tcweCHlYRhmCwLnpjNHrkHbBb-_qmxAm0MHUSgIyjuFjwaSrt_rA-CWWeThmiL9jyL7_s.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>테트리스</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/1zcPA0jfoHKcgfkjKfKdvEYQkH-UvY9L1ABzTm3LJPEEphcBmf-zxUMf8R9YZrGyz7ahadkpTEq3oqa0wn3_l9Z1xoD8Synm_lQMaTtQE-Xbi0lZxho_CodP-WKuz_R5bZzX-jyehuut68EMrhR0yw.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>사축 씨는 꼬마 유령에게 치유 받고 싶어</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/F1Z8xrEcenSzS26tUgbZC-WdhD7EnyROdyaZU9aBAGKiYVft4N__2TwNDuDvXjUAozmitHLKrirbPOkV7arPikKI8_E9TDJDDKL0v402Yo9ia5b4ifKcB8DLBL8cEA9xl5-P2q4VbSGoS-gX6NB8Ig.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>논논비요리 논스톱</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/9XdpzDYU7AN6TY5m-oao3aq9RlqqeHtvi3KSFavNzlUrCyvQoq6cpfb3LIMwawYe19C20kfeuIla00pLHNnPGvjriPMfArIRjWOC4sIrrz4BRaFfZdXMqMHOcZ1gq9eIOTkJBCkStzl60MoqKaoNJQ.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>citrus</span>
                </div>
                <div className={styles.image}>
                  <Image
                    src="https://cdn.dev1stud.io/jejeup/10RgdhHqxim_6778EsKjzWkhMQG3JOnJQzk5jU4VGDDNUkh_B6nmb_0EFLSXl_PaoXmxtQIQ0_IcEp2mxQXGxGDYKHuBt_b2NLrlLWOsF_nD49IxOen9KzJw_2TUxhtCJ_il0vmOu4GK1XDHxr9KSA.webp"
                    width="390"
                    height="560"
                    alt=""
                    unoptimized
                    priority
                  />
                  <span>나 혼자만 레벨 업</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className={styles.container}>
          <article>
            <h2>심의등급 안내</h2>
            <section>
              <p>
                한국 심의를 받은 콘텐츠는 공식 심의등급이 표시가 되며{' '}
                <span>그렇지 않은 경우에는 모애뷰 임의로 등급을 정합니다.</span>
              </p>
              <p>모애뷰 자체 심의등급은 법적 구속력이 없습니다.</p>
            </section>
          </article>
          <article>
            <h2>베리어프리 콘텐츠 이용 안내</h2>
            <section>
              <p>
                베리어프리 영상은 2024년 2분기 기준 <span>판권 등록된 OTT서비스 링크를 제공하고 있습니다.</span>
              </p>
              <p>
                OTT 서비스는 <span>프라임 비디오, 애플 TV+, 디즈니+, 넷플릭스</span> 웨이브, 왓챠, 티빙 기준입니다.
              </p>
              <p>
                웨이브와 애플 TV+의 이용방법은 <span>각 링크 하단에 첨부된 내용을 확인해 주세요.</span>
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Usage;
