import SessionModel from '../models/session.model.js';
import dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const productionUrl = process.env.NODE_URL;

// @desc Delete a Session
// @route DELETE /api/sessions/
// @access Private
export async function deleteSessionsHandler(req, res) {
  const sessionId = res.locals.user.session;

  let index = 0;

  while (req.cookies[`accessTokenPart${index}`]) {
    res.clearCookie(`accessTokenPart${index}`, {
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
    index++;
  }

  let index2 = 0;

  while (req.cookies[`refreshTokenPart${index2}`]) {
    res.clearCookie(`refreshTokenPart${index2}`, {
      maxAge: 3.154e10, // 15 mins
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
    index2++;
  }

  await SessionModel.deleteOne({ _id: sessionId });

  return res.send({ accessToken: null, refreshToken: null });
}
