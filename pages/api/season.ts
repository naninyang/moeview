import type { NextApiRequest, NextApiResponse } from 'next';
import { getSeasonData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const season = req.query.season as string;
  try {
    const data = await getSeasonData(season);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
