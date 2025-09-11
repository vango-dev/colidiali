// import get from 'lodash-es';
import { verifyJwt } from '../utils/jwt.utils.js';
import { reIssueAccessToken } from '../service/session.service.js';

const deserializeUser = async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const productionUrl = process.env.NODE_URL;

  const accessTokenParts = [];
  let index = 0;

  while (req.cookies[`accessTokenPart${index}`]) {
    accessTokenParts.push(req.cookies[`accessTokenPart${index}`]);
    index++;
  }
  const accessToken = accessTokenParts.join('');

  const refreshTokenParts = [];
  let index2 = 0;

  while (req.cookies[`refreshTokenPart${index2}`]) {
    refreshTokenParts.push(req.cookies[`refreshTokenPart${index2}`]);
    index2++;
  }

  const refreshToken = refreshTokenParts.join('');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      const newAccessTokenParts = newAccessToken.match(/.{1,1000}/g);

      newAccessTokenParts.forEach((part, index) => {
        res.cookie(`accessTokenPart${index}`, part, {
          maxAge: 900000, // 15 minutes
          httpOnly: true, // Not accessible via JavaScript
          domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
          path: '/', // Cookie is valid for the entire domain path
          sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
          secure: isProduction,
        });
      });
    }

    res.setHeader('x-access-token', newAccessToken);

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default deserializeUser;
