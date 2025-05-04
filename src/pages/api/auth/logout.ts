import { withMethod } from '@/lib/middlewares/withMethod';
import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

function handler(req:NextApiRequest, res:NextApiResponse) {
  destroyCookie({ res }, 'token', {
    path: '/',
  });
  res.send({success:true})
}

export default withMethod(handler, ['GET']);
