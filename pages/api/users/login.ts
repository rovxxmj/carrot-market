import { NextApiRequest, NextApiResponse } from 'next';

// 유저 로그인(login)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const user = await client.user.findUnique({where: {}})
  return res.status(200).send(req.body);
};

export default handler;
