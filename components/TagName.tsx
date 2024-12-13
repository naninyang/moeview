export const TagName = (name: string, type: string) => {
  const tags: { [key: string]: string } = {
    healing: '힐링 #치유 #감동',
    yuri: '백합 #레즈',
    queer: '퀴어 #LGBTQ+',
    isekai: '이세계',
    timeslip: '타임슬립 #타임리프 #타임루프 #회귀',
    anomalies: '이상현상 #아노말리',
    apocalypse: '아포칼립스',
    picaresca: '피카레스크 #악인전',
    horror: '공포 #호러',
    mobile: '모바일',
    strategy: '경영 #전략',
    simulation: '시뮬레이션',
    backroom: '백룸',
    relife: '전생 #전이',
  };
  const genres: { [key: string]: string } = {
    healing: '힐링, 치유, 감동',
    yuri: '백합, 레즈',
    queer: '퀴어, LGBTQ+',
    isekai: '이세계',
    timeslip: '타임슬립, 타임리프, 타임루프, 회귀',
    anomalies: '이상현상, 아노말리',
    apocalypse: '아포칼립스',
    picaresca: '피카레스크, 악인전',
    horror: '공포, 호러',
    mobile: '모바일',
    strategy: '경영, 전략',
    simulation: '시뮬레이션',
    backroom: '백룸',
    relife: '전생, 전이',
  };
  if (type === 'tag') {
    return tags[name] || '';
  } else if (type === 'genre') {
    return genres[name] || '';
  }
};
