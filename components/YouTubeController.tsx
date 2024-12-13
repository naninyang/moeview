import React, { useState } from 'react';
import Image from 'next/image';
import { isDesktop } from 'react-device-detect';
import styled from '@emotion/styled';
import YouTubePlayer from './YouTubePlayer';
import { VectorsPlay } from './vectors';

const rem = (px: number): string => `${px / 16}rem`;

interface Props {
  videoId: string;
  videoImage: string;
}

const Container = styled.div<{ isDesktop?: boolean }>(({ isDesktop }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: rem(12),
  aspectRatio: '1920 / 1080',
  '&:hover img': {
    transform: isDesktop ? 'scale(1.02)' : undefined,
  },
  '& img': {
    transition: 'all .4s cubic-bezier(.4,0,.2,1)',
    display: 'block',
    aspectRatio: '1920 / 1080',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  '& > button': {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    border: 0,
    height: '100%',
    aspectRatio: '1920 / 1080',
    '&:hover i': {
      opacity: isDesktop ? 1 : undefined,
    },
    '& i': {
      transition: 'all .4s cubic-bezier(.4,0,.2,1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(244, 246, 250, .7)',
      opacity: isDesktop ? 0 : undefined,
      borderRadius: rem(52),
      width: rem(52),
      height: rem(52),
      '&::before': {
        content: "''",
        display: 'block',
        width: rem(36),
        height: rem(36),
        background: `url(${VectorsPlay.src}) no-repeat 50% 50%/contain`,
      },
    },
    '& span': {
      position: 'absolute',
      overflow: 'hidden',
      margin: 0,
      width: '1px',
      height: '1px',
      clip: 'rect(1px, 1px, 1px, 1px)',
    },
  },
  '& div': {
    width: '100%',
    height: '100%',
  },
  '& iframe': {
    border: 0,
    aspectRatio: '1920 / 1080',
    width: '100%',
    height: 'auto',
  },
}));

const YouTubeController = ({ videoId, videoImage }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Container isDesktop={isDesktop}>
      {!isPlaying ? (
        <>
          <Image src={videoImage} width={640} height={480} unoptimized priority alt="" />
          <button type="button" onClick={handlePlay}>
            <i />
            <span>영상 재생하기</span>
          </button>
        </>
      ) : (
        <YouTubePlayer videoId={videoId} />
      )}
    </Container>
  );
};

export default YouTubeController;
