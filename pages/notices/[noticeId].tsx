import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { NoticePermalinkData } from '@/types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Notice.module.sass';
import { BackButton } from '@/components/Icons';

const NoticeContent = ({ data }: { data: any }) => {
  const renderChildren = (children: any) => {
    return children.map((child: any, index: number) => {
      if (child.type === 'text') {
        if (child.bold) {
          return <strong key={index}>{child.text}</strong>;
        }
        if (child.strikethrough) {
          return <s key={index}>{child.text}</s>;
        }
        if (child.bold === undefined && child.strikethrough === undefined) {
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{
                __html: child.text.replace(/\n/g, '<br />'),
              }}
            />
          );
        }
      } else if (child.type === 'link') {
        return (
          <Anchor key={index} href={child.url}>
            {renderChildren(child.children)}
          </Anchor>
        );
      }
    });
  };

  const renderContent = (content: any) => {
    return content.map((item: any, index: number) => {
      if (item.type === 'paragraph') {
        return <p key={index}>{renderChildren(item.children)}</p>;
      } else if (item.type === 'list') {
        const ListComponent = item.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListComponent key={index}>
            {item.children.map((listItem: any, listItemIndex: number) => (
              <li key={listItemIndex}>{renderChildren(listItem.children)}</li>
            ))}
          </ListComponent>
        );
      }
    });
  };

  return <div className={styles.description}>{renderContent(data)}</div>;
};

const Notice = ({ notice }: { notice: NoticePermalinkData | null }) => {
  const router = useRouter();
  const previousPageHandler = () => {
    const previousPage = sessionStorage.getItem('notices');
    if (previousPage) {
      router.push(`${previousPage}`);
    } else {
      router.push('/notices');
    }
  };

  const timestamp = Date.now();
  return (
    <main className={styles.notice}>
      {!notice ? (
        <p className={styles.loading}>
          <span>안내사항 불러오는 중</span>
          <i />
        </p>
      ) : (
        <>
          <Seo
            pageTitles={`${notice.attributes.subject} - ${originTitle}`}
            pageTitle={`${notice.attributes.subject}`}
            pageDescription={`${notice.attributes.description}`}
            pageImg={`https://semo.dev1stud.io/og-image.webp?ts=${timestamp}`}
          />
          <div className="top-link">
            <button onClick={previousPageHandler} type="button">
              <BackButton />
              <span>뒤로가기</span>
            </button>
          </div>
          <div className={styles.content}>
            <article>
              <header>
                <h2>{notice.attributes.subject}</h2>
                <time dateTime={notice.attributes.createdAt}>{notice.attributes.created}</time>
              </header>
              <NoticeContent data={notice.attributes.content} />
              <div className={styles.button}>
                <button onClick={previousPageHandler} type="button">
                  <BackButton />
                  <span>뒤로가기</span>
                </button>
              </div>
            </article>
          </div>
        </>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const noticeId = context.params?.noticeId;
  let notice = null;

  if (noticeId && typeof noticeId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices/?id=${noticeId.substring(14)}`);
    const data = (await response.json()) as { data: NoticePermalinkData[] };
    notice = data.data;
  }

  if (!notice) {
    return {
      props: {
        notice: null,
      },
    };
  }

  return {
    props: {
      notice,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Notice;
