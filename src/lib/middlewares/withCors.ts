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
    origin: process.env.NODE_ENV === "production" ? 'https://admin-panel-eta-murex.vercel.app' : 'http://localhost:5173', // Change to your admin panel domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

export const withCors = (handler: any) => {
  return async (req: any, res: any) => {
    await cors(req, res);
    return handler(req, res);
  };
};
