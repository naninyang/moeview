export const BadgeLang = (name: string, country: string) => {
  const names: { [key: string]: string } = {
    subtitle: '자막',
    unofficial: '비공식 한글',
    dubbing: '더빙',
    cc: country === '한국' ? 'CC' : 'SDH',
    description: 'AD',
  };
  return names[name] || '';
};
