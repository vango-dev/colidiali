import pkg from 'lodash';
import dotenv from 'dotenv';
import SessionModel from '../models/session.model.js';
import { signJwt } from '../utils/jwt.utils.js';

dotenv.config();

// Create a new Session
export async function createSession(transporterId, userAgent) {
  const session = await SessionModel.create({
    user: transporterId,
    userAgent,
  });

  return session.toJSON();
}

// ReIssue a new token
export async function reIssueAccessToken({ refreshToken }) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: process.env.accessTokenTtl, // 15minutes
    }
  );

  return accessToken;
}
