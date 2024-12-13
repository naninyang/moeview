import type { NextApiRequest, NextApiResponse } from 'next';
import { getSubdubData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 7;
    const subdubName = req.query.subdubName as string;
    const data = await getSubdubData(page, pageSize, subdubName);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
