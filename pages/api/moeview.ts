import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMetaItemdata } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;
  try {
    const data = await fetchMetaItemdata(url);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
