import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Anchor from './Anchor';
import styles from '@/styles/Categories.module.sass';
import { VectorsWarning } from './vectors';

const WarningIcon = styled.i({
  background: `url(${VectorsWarning.src}) no-repeat 50% 50%/contain`,
});

export default function ChoiceBarrierFree() {
  const router = useRouter();
  return (
    <div className={styles.choice}>
      <p>
        <WarningIcon /> 확인하기 링크를 누른 뒤 잠시만 기다려 주세요! 속도가 다소 느립니다.
      </p>
      <ul>
        <li className={router.pathname === '/hanguk' ? styles.current : ''}>
          <Anchor href="/hanguk">지원여부 전체 확인하기</Anchor>
        </li>
        <li className={router.pathname === '/subdub' ? styles.current : ''}>
          <Anchor href="/subdub">자막 & 더빙 확인하기</Anchor>
        </li>
        <li className={router.pathname === '/barrier-free' ? styles.current : ''}>
          <Anchor href="/barrier-free">베리어프리 확인하기</Anchor>
        </li>
      </ul>
    </div>
  );
}
