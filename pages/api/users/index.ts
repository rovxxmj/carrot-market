import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/client';

// 새로운 유저 생성(join)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newUser = await client.user.create({ data: { ...req.body } });
  return res.status(201).send('ok');
};

export default handler;
