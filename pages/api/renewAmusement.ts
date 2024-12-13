import type { NextApiRequest, NextApiResponse } from 'next';
import { getRenewAmusement } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const amusementId = req.query.amusementId as string;
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 50;
    const data = await getRenewAmusement(page, pageSize, amusementId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
