export const SupportLang = (name: string) => {
  const names: { [key: string]: string } = {
    subtitle: '자막',
    unofficial: '비공식 한글 지원',
    dubbing: '더빙',
    cc: '청각 장애인용 자막',
    description: '화면 해설',
  };
  return names[name] || '';
};
