export const withMethod = (handler:any, allowedMethods = [""]) => {
    return (req:{method:string}, res:any) => {
      if (!allowedMethods.includes(req.method)) {
        res.setHeader('Allow', allowedMethods);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
      }
      return handler(req, res);
    };
  };
  