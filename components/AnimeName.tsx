export const AnimeName = (org: string) => {
  const names: { [key: string]: string } = {
    tva: 'TVA',
    ova: 'OVA',
    film: '극장판',
  };
  return names[org] || '';
};
