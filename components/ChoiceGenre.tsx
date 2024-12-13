import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import styles from '@/styles/Categories.module.sass';
import { VectorsWarning } from './vectors';

const WarningIcon = styled.i({
  background: `url(${VectorsWarning.src}) no-repeat 50% 50%/contain`,
});

export default function ChoiceGenre() {
  const router = useRouter();
  return (
    <div className={styles.choice}>
      <p>
        <WarningIcon /> 골라보기 링크를 누른 뒤 잠시만 기다려 주세요! 속도가 다소 느립니다.
      </p>
      <ul>
        <li className={router.pathname === '/categories' ? styles.current : ''}>
          <Anchor href="/categories">카테고리 골라보기</Anchor>
        </li>
        <li className={router.pathname === '/tags' ? styles.current : ''}>
          <Anchor href="/tags">태그 골라보기</Anchor>
        </li>
        <li className={router.pathname === '/platforms' ? styles.current : ''}>
          <Anchor href="/platforms">OTT & 방송사 골라보기</Anchor>
        </li>
      </ul>
    </div>
  );
}
