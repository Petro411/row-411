// lib/withCors.ts
import Cors from 'cors';

function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) return reject(result);
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    origin: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ADMIN_URL : 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

export const withCors = (handler: any) => {
  return async (req: any, res: any) => {
    res.setHeader("Access-Control-Allow-Origin",process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ADMIN_URL : 'http://localhost:5174');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    await cors(req, res);
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    return handler(req, res);
  };
};
