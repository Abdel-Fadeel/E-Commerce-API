import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.BAD_REQUEST,
    message: err.message || 'Something went wrong, please try again',
  };
  if (err.name === 'ValidationError') {
    customError.message = (Object.values(err.errors) as { message: string }[])
      .map((item) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
