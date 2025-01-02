import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import { License } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import { BackButtonLight } from '@/components/Icons';
import Anchor from '@/components/Anchor';
import footer from '@/styles/Footer.module.sass';
import styles from '@/styles/Open.module.sass';

function OpenSources({ licenses }: { licenses: License[] }) {
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
    <main className={`${footer.open} ${styles.open}`}>
      <Seo
        pageTitles={`오픈소스 - ${originTitle}`}
        pageTitle="오픈소스"
        pageDescription="'모애뷰'에서 사용한 오픈소스"
        pageImg={`https://moe.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className={`top-link ${styles['top-link']}`}>
        <button onClick={previousPageHandler} type="button">
          <BackButtonLight />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <h1>
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>오픈소스</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.opensources</em>
        </h1>
        <dl>
          <div>
            <dt>UX Designer & Developer</dt>
            <dd>클로이 Chloe</dd>
          </div>
          <div>
            <dt>Curator & Informator</dt>
            <dd>클로이 Chloe</dd>
          </div>
        </dl>
        <p>
          개발 코드를 보고싶은 분은 <Anchor href="https://github.com/naninyang/semoview">깃헙 저장소</Anchor>를
          확인하세요
        </p>
        <div className={styles.list}>
          <hr />
          {licenses.map((license, index) => (
            <div key={index}>
              <h2>{license.filename}</h2>
              <pre>
                <code>{license.content}</code>
              </pre>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const markdownDir = path.join(process.cwd(), 'pages/licenses');
  const filenames = fs.readdirSync(markdownDir);
  const licenses = filenames.map((filename) => {
    const filePath = path.join(markdownDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      filename: filename.replace(/\.md$/, ''),
      content,
    };
  });

  return {
    props: {
      licenses,
    },
  };
}

export default OpenSources;
