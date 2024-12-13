import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import { NoticeData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import { BackButton } from '@/components/Icons';
import { Pagination } from '@/components/Pagination';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Notice.module.sass';

interface NoticeProps {
  data: NoticeData[];
  noticesData: any;
  currentPage: number;
  error: string;
}

const Notices: NextPage<NoticeProps> = ({ noticesData, data, currentPage, error }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [deviceSafari, setDeviceSafari] = useState<string>();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const onInstallPWA = () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as any;
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  useEffect(() => {
    if (isSafari) {
      setDeviceSafari('isSafari');
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem('notices', router.asPath);
  }, [router.asPath]);

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
    <main className={styles.notice}>
      <Seo
        pageTitles={`공지사항 - ${originTitle}`}
        pageTitle="공지사항"
        pageDescription="모애뷰 공지를 확인하세요"
        pageImg={`https://semo.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        <button onClick={previousPageHandler} type="button">
          <BackButton />
          <span>뒤로가기</span>
        </button>
      </div>
      <div className={styles.content}>
        <h1>
          <span className={`${isSafari ? 'April16thPromise' : 'April16thLife'}`}>공지사항</span>
          <em className={`${isSafari ? 'April16thPromise' : 'April16thSafety'}`}>semoview.notices</em>
        </h1>
        <div className={styles.summary}>
          <div className={styles['button-group']}>
            <Anchor href="/contact-us">문의하기</Anchor>
            {deviceSafari !== 'isSafari' && (
              <button type="button" onClick={onInstallPWA}>
                앱 내려받기
              </button>
            )}
          </div>
        </div>
        <div className={styles.notices}>
          <hr />
          {data && !error && (
            <ul>
              {data.map((notice) => (
                <li key={notice.idx}>
                  <Anchor key={notice.idx} href={`/notices/${notice.idx}`} scroll={false} shallow={true}>
                    <strong>
                      <span>{notice.subject}</span>
                    </strong>
                    <time>{notice.created}</time>
                  </Anchor>
                </li>
              ))}
            </ul>
          )}
          <hr />
          {noticesData && <Pagination currentPage={currentPage} pageCount={noticesData.pageCount} sorting={'notice'} />}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  let noticesData = null;
  let data = null;
  let error = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices?page=${currentPage}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    noticesData = await response.json();
    data = noticesData.notices;
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return {
    props: {
      noticesData,
      data,
      error,
      currentPage,
    },
  };
};

export default Notices;
