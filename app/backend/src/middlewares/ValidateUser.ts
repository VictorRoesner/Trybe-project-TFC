import * as Joi from 'joi';
import CustomError from '../utils/customError';
import IUser from '../interfaces/IUser';

const validateUser = (login: IUser) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  });
  const { error, value } = schema.validate(login);

  if (error) throw new CustomError('ValidationError', 'All fields must be filled');
  return value;
};

export default validateUser;
