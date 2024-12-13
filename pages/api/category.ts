import type { NextApiRequest, NextApiResponse } from 'next';
import { getCategoryData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 7;
    const categoryName = req.query.categoryName as string;
    const data = await getCategoryData(page, pageSize, categoryName);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
