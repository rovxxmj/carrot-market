import { NextApiRequest, NextApiResponse } from 'next';

const withHandler = (
  method: 'GET' | 'POST' | 'DELETE',
  handlerFn: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handlerFn(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  };
};

export default withHandler;
