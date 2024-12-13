import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const amuseId = req.query.amuseId as string;

  try {
    const response = await fetch(amuseId, {
      method: 'HEAD',
    });

    if (response.ok) {
      res.status(200).json({ amuseId: amuseId });
    } else {
      res.status(404).json({ exists: 'false' });
    }
  } catch (error) {
    res.status(500).json({ exists: false, error: 'Server error' });
  }
}
