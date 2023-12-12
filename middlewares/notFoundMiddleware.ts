import { Handler } from 'express';

const notFoundMiddleware: Handler = (req, res) => {
  res.status(404).json({ message: 'Route does not exist' });
};

export default notFoundMiddleware;
