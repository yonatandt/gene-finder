import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an asynchronous express request handler function with an error handler.
 * @param func - an asynchronous request handler function.
 */
export const wrapAsync = (func: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
  func(req, res, next).catch(next);
};
