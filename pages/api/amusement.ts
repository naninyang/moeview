import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const amusementId = req.query.amusementId as string;
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/amusement-jejeups/${amusementId}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch amusement data');
    }
    const amusementData = await response.json();

    const amuseId = `https://cdn.dev1stud.io/semoview/id/id-${amusementData.data.id}.webp`;
    const logoResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/amuseId?amuseId=${encodeURIComponent(amuseId)}`,
    );
    const logoData = await logoResponse.json();
    const logoImage = logoData.amuseId;

    const amusementsData = {
      ...amusementData,
      logoImage,
    };
    res.status(200).json(amusementsData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
