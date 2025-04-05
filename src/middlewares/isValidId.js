import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = createHttpError(400, 'Invalid ID format');
    return next(error);
  }
  next();
};

export default isValidId;
