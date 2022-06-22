import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';

// 새로운 유저 생성(join)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newUser = await client.user.create({ data: { ...req.body } });
  console.log(newUser);
  return res.status(201).send('ok');
};

export default withHandler('POST', handler);
