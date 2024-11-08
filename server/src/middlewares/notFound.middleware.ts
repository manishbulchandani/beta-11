import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("---notFoundMiddleware---");
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFoundMiddleware;


