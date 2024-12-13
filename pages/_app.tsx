import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import {
  Lato,
  Noto_Sans,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Thai,
} from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { GA_TRACKING_ID, pageview } from '@/lib/gtag';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.sass';

const fontEN = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

const fontUN = Noto_Sans({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
});

const fontKR = Noto_Sans_KR({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic'],
});

const fontJP = Noto_Sans_JP({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontSC = Noto_Sans_SC({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontTC = Noto_Sans_TC({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['vietnamese'],
});

const fontTH = Noto_Sans_Thai({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['thai'],
});

const April16thLife = localFont({
  src: './fonts/April16th-Life.woff2',
  style: 'normal',
});

const April16thPromise = localFont({
  src: './fonts/April16th-Promise.woff2',
  weight: '200',
  style: 'normal',
});

const April16thSafety = localFont({
  src: './fonts/April16th-Safety.woff2',
  weight: '200',
  style: 'normal',
});

const Happiness = localFont({
  src: './fonts/HappinessSansVF.woff2',
  style: 'normal',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        registration.waiting?.postMessage('SKIP_WAITING');
      };
      registInit();
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <style jsx global>
        {`
          body {
            ${router.pathname === '/amusement/[amusementId]' ||
            router.pathname === '/recommend/[recommendId]' ||
            router.pathname === '/open-sources'
              ? 'background-color:black'
              : ''}
          }
          main {
            ${router.pathname === '/amusement/[amusementId]' ||
            router.pathname === '/recommend/[recommendId]' ||
            router.pathname === '/open-sources'
              ? 'margin-top:0'
              : ''}
          }
          body,
          pre,
          input,
          button,
          textarea {
            font-family: ${fontEN.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
            font-weight: 400;
          }
          select,
          .lang {
            font-family: ${fontEN.style.fontFamily}, ${fontJP.style.fontFamily}, ${fontTH.style.fontFamily},
              ${fontSC.style.fontFamily}, ${fontTC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
            font-weight: 400;
            white-space: break-spaces;
            word-wrap: break-word;
            word-break: normal;
          }
          [lang='en'] {
            font-family: ${fontUN.style.fontFamily}, sans-serif;
          }
          [lang='en-US'] {
            font-family: ${fontEN.style.fontFamily}, sans-serif;
          }
          [lang='ja'] {
            font-family: ${fontEN.style.fontFamily}, ${fontJP.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
            white-space: break-spaces;
            word-wrap: break-word;
            word-break: normal;
          }
          [lang='th'] {
            font-family: ${fontEN.style.fontFamily}, ${fontTH.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          [lang='zh-Hans'] {
            font-family: ${fontEN.style.fontFamily}, ${fontSC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          [lang='zh-Hant'] {
            font-family: ${fontEN.style.fontFamily}, ${fontTC.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          .preview {
            font-family: ${fontEN.style.fontFamily}, ${fontKR.style.fontFamily}, sans-serif;
          }
          .number,
          time {
            font-family: ${fontEN.style.fontFamily}, sans-serif;
          }
          .April16thLife {
            font-family: ${April16thLife.style.fontFamily}, ${April16thSafety.style.fontFamily},
              ${April16thPromise.style.fontFamily}, sans-serif;
          }
          .April16thPromise {
            font-family: ${April16thPromise.style.fontFamily}, sans-serif;
          }
          .April16thSafety {
            font-family: ${April16thSafety.style.fontFamily}, ${April16thPromise.style.fontFamily}, sans-serif;
          }
          .seed {
            font-family: ${Happiness.style.fontFamily}, sans-serif;
          }
        `}
      </style>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
