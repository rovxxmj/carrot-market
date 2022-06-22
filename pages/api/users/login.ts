import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@libs/server/withHandler';

// 유저 로그인(login)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).send(req.body);
};

export default withHandler('POST', handler);
