import type { NextApiRequest, NextApiResponse } from 'next';
import { getNoticeData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    try {
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const data = await getNoticeData(page, pageSize);
      res.status(200).json(data);
    } catch (error) {
      console.log('Unsupported method');
    }
  } else {
    try {
      const response = await fetch(`${process.env.STRAPI_URL}/api/notice-nol2trs/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article data');
      }
      const articleData = await response.json();
      res.status(200).json(articleData);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
