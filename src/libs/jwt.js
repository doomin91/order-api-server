import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
export const verify = (token, option) => jwt.verify(token, jwtSecret, option);

export const sign = (payload, option) => jwt.sign(payload, jwtSecret, {
    algorithm: 'HS256',
    expiresIn: '180m',
    ...option,
  })

export const refresh = (payload, option) => jwt.sign(payload, jwtSecret, {
  algorithm: 'HS256',
  expiresIn: '360m',
  ...option,
})
