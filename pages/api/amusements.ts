import { formatDate } from '@/lib/apis';
import type { NextApiRequest, NextApiResponse } from 'next';

async function fetchAmusementData(fieldName: string, fieldValue: string) {
  let response = await fetch(
    `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=100&filters[${fieldName}][$contains]=${fieldValue}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  let data = await response.json();
  const pageCount = data.meta.pagination.pageCount;
  let amusementData = [];
  for (let page = 1; page <= pageCount; page++) {
    response = await fetch(
      `${process.env.STRAPI_URL}/api/amusement-jejeups?sort[0]=id:desc&pagination[page]=${page}&pagination[pageSize]=100&filters[${fieldName}][$contains]=${fieldValue}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      },
    );
    data = await response.json();
    amusementData.push(...data.data);
  }

  return amusementData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fieldName = req.query.fieldName as string;
  const fieldValue = req.query.fieldValue as string;
  try {
    const amusementData = await fetchAmusementData(fieldName, fieldValue);

    const amusementDataProcessed = amusementData.map((amusementItem: any) => ({
      titleKorean: amusementItem.attributes.titleKorean,
      title: amusementItem.attributes.title,
      release: amusementItem.attributes.release,
      country: amusementItem.attributes.country,
      genre: amusementItem.attributes.genre,
      idx: `/amusement/${formatDate(amusementItem.attributes.createdAt)}${amusementItem.id}`,
    }));

    res.status(200).send(amusementDataProcessed);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
