export const OriginalName = (org: string) => {
  const names: { [key: string]: string } = {
    anime: '애니메이션',
    cartoon: '만화',
    drama: '드라마',
    film: '영화',
    novel: '소설',
    lightNovel: '라이트노벨',
    webtoon: '웹툰',
    game: '게임',
    fairytale: '동화',
    memoirs: '회고록',
    music: '노래',
  };
  return names[org] || '';
};
