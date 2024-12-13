import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMetadata } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string;
  try {
    const data = await fetchMetadata(url);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
