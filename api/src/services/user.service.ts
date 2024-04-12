import { User } from '../models/user'

export const getUserByEmail = async (email: string): Promise<User|null> => {
  return User.findOne({ where: { email } });
};

export const checkUserPassword = (password: string, user: User): boolean => {
  return user.password === password
};
