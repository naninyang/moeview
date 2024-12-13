import type { NextApiRequest, NextApiResponse } from 'next';
import { getRelationsData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const relations = req.query.relations as string;
  const type = req.query.type as string;
  try {
    const data = await getRelationsData(relations, type);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
