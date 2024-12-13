import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchMetadata, getAmusementData, getMoeviewData } from '@/lib/apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const page = Number(req.query.page) || 1;
  const main = req.query.main as string;
  const both = req.query.both as string;

  if (!id && !main) {
    if (both) {
      try {
        const data = await getMoeviewData(page, 12, 'false', 'isBoth');
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else if (!id && main) {
    try {
      const data = await getMoeviewData(1, 4);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    try {
      const response = await fetch(`${process.env.STRAPI_URL}/api/moeview-videos/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article data');
      }
      const moeviewResponse = await response.json();

      const amusementSource = moeviewResponse.data.attributes.isAmusements
        ? moeviewResponse.data.attributes.amusements
        : moeviewResponse.data.attributes.title;
      const amusementTitles: string[] = amusementSource
        .split(',')
        .map((title: string) => title.trim().replace(/'/g, ''));
      const amusementMap = amusementTitles.map((title) => getAmusementData(title));
      const amusementData = await Promise.all(amusementMap);

      const reviewData = await fetchMetadata(moeviewResponse.data.attributes.video);

      const moeviews = {
        ...moeviewResponse.data,
        amusementData,
        reviewData,
      };

      res.status(200).json(moeviews);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
