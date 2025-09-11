import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Define the paths to the key files

const __dirname = path.resolve();

const privateKeyPath = path.join(__dirname, './private_key.pem');
const publicKeyPath = path.join(__dirname, './public_key.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

if (!privateKey || !publicKey) {
  throw new Error(
    'Private and/or public key is missing in environment variables'
  );
}

export function signJwt(object, options) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    console.error(error);
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
