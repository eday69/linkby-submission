import { User } from '../models/user'

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserByEmail = async (email: string): Promise<User|null> => {
  return User.findOne({ where: { email } });
};

/**
 * Check password
 * @param {string} password
 * @param {User} user
 * @returns {boolean}
 */
export const checkUserPassword = (password: string, user: User): boolean => {
  return user.password === password
};
