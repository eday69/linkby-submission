import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as process from 'process';
import { checkUserPassword, getUserByEmail } from '../services/user.service';

interface tokenPayload {
  email: string
  password: string
}

function generateAccessToken(payload: tokenPayload): string {
  const secret = process.env.TOKEN_SECRET || '';
  return jwt.sign(payload, secret, { expiresIn: '1800s' });
}

export async function loginHandler(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({
      type: 'error',
      message: "User not found",
    });
  }
  if (user && !checkUserPassword(password, user)) {
    return res.status(401).send({
      message: "Invalid email or password. Try Again",
    });
  }

  const payload: tokenPayload = {
    email,
    password
  };

  const token = generateAccessToken(payload);

  res.json({
    accessToken: token,
    id: user.id,
    name: user.name
  });
}
