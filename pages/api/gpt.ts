import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

type Amusements = {
  titleKorean: string;
  title: string;
  release: string;
  country: string;
  genre: string;
  ott: string;
  idx: string;
};

type Data = {
  answer: string;
  idxList: string[];
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const fieldName = req.query.fieldName as string;
  const fieldValue = req.query.fieldValue as string;
  const question = req.query.question as string;

  if (req.method === 'GET') {
    try {
      const amusementsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/amusements?fieldName=${fieldName}&fieldValue=${fieldValue}`,
        {
          method: 'GET',
        },
      );
      const amusementsData: Amusements[] = await amusementsResponse.json();

      const gptData = amusementsData.map(({ idx, ...rest }) => rest);
      const idxList = amusementsData.map(({ idx }) => idx);

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Ensure to include an introduction and a conclusion in your response.',
          },
          {
            role: 'user',
            content: `${question}: ${JSON.stringify(gptData)}`,
          },
        ],
      });

      const answer = completion.choices[0].message?.content || '';
      res.status(200).json({ answer, idxList });
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      res.status(500).json({ answer: 'Error occurred while fetching data from OpenAI.', idxList: [] });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
