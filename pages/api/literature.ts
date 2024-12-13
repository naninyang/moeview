import type { NextApiRequest, NextApiResponse } from 'next';
import { getLiteratureData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/literature-semoviews/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch article data');
    }
    const semoviewResponse = await response.json();
    const amusementData = await getLiteratureData(1, 21, Number(id), semoviewResponse.data.attributes.type);
    const semoview = {
      ...semoviewResponse.data,
      amusementData,
    };
    res.status(200).json(semoview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
