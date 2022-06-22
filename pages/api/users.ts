import type { NextApiRequest, NextApiResponse } from 'next'
import client from "@libs/client"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   const newUser = await client.user.create({
     data : {
       email: "go_nuu@gmail.com",
       nickname: "go_nuu"
     }
   })

  return res.json(newUser)
}

export default handler;


