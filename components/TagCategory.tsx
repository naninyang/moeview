export const TagCategoryName = (org: string) => {
  const names: { [key: string]: string } = {
    film: '영화',
    ott_film: '영화',
    anime: '애니메이션',
    ott_anime: '애니메이션',
    anime_film: '애니메이션 #영화',
    ott_anime_film: '애니메이션 #영화',
  };
  return names[org] || '';
};
