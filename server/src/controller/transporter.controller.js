import TransporterModel from '../models/transporter.model.js';
import {
  createTransporter,
  validatePassword,
} from '../service/transporter.service.js';
import logger from '../utils/logger.js';
import twilio from 'twilio';
import { signJwt } from '../utils/jwt.utils.js';
import { createSession } from '../service/session.service.js';
import dotenv from 'dotenv';

const isProduction = process.env.NODE_ENV === 'production';
const productionUrl = process.env.NODE_URL;

// @desc GET Transporters
// @route GET /api/transporters/list
// @access Public
export async function getTransportersHandler(req, res) {
  try {
    const { departure, destination, date } = req.query;

    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    // Extract city from departure address
    const departureCity =
      departure.split(',')?.reverse()[1]?.trim() || departure;

    // Create a base query object with the provided departure city
    const baseQuery = {
      'trajectory.departurePoint': new RegExp(departureCity, 'i'),
    };

    // Create a query object to match all three fields if destination and date are provided
    const fullQuery = {
      'trajectory.departurePoint': new RegExp(departureCity, 'i'),
      'trajectory.destinationPoint': destination,
      'trajectory.departureTime': date ? { $gte: new Date(date) } : undefined,
    };

    // Execute the search using the Transporter model
    let transporters;

    const total = await TransporterModel.countDocuments();

    if (destination && date) {
      // Search for transporters that match all three fields
      transporters = await TransporterModel.find({
        $or: [fullQuery, baseQuery],
      })
        .skip(skip)
        .limit(size);
    } else {
      // Search for transporters that match only the departure field
      transporters = await TransporterModel.find(baseQuery)
        .skip(skip)
        .limit(size);
    }

    res.send({ transporters, total, page, size });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// @desc Verify Transporter number
// @route POST /api/transporters/verify
// @access Public
export async function verifyTransporterPhoneHandler(req, res) {
  const existedTransporter = await TransporterModel.findOne({
    phone: req.body.phone,
  });

  if (existedTransporter) {
    res.status(404).json({ message: 'Ce numéro est deja enregistré' });
  } else {
    res.status(200).json({ message: 'OK' });
  }
}

// @desc Send transporter OTP
// @route GET /api/transporters/verify/:phone
// @access Public
export async function sendVerificationCode(req, res) {
  const client = new twilio(process.env.USER_SID, process.env.AUTH_SID);

  const phone = req.params.phone;

  client.verify.v2
    .services(process.env.TWILIO_SID)
    .verifications.create({ to: phone, channel: 'sms' })
    .then((verification) => {
      res.json(verification);
    })
    .catch((error) => {
      res.json(error);
    });
}

// @desc Verify transporter OTP
// @route GET /api/transporters/check/:phone/code/:code
// @access Public
export async function checkVerificationCode(req, res) {
  const client = new twilio(process.env.USER_SID, process.env.AUTH_SID);

  const to = req.params.phone;

  const code = req.params.code;

  client.verify.v2
    .services(process.env.TWILIO_SID)
    .verificationChecks.create({ to, code })
    .then((verification) => {
      res.json(verification);
    })
    .catch((error) => {
      res.json(error);
    });
}

// @desc Create new transporter
// @route POST /api/transporters/new
// @access Public
export async function createTransporterHandler(req, res) {
  try {
    const transporter = await createTransporter(req.body);

    if (transporter) {
      // Create session
      const session = await createSession(
        transporter._id,
        req.get('user-agent' || '')
      );

      // create access token
      const accessToken = signJwt(
        { ...transporter, session: session._id },
        { expiresIn: process.env.accessTokenTtl } // 15 minutes
      );

      // split access token
      const accessTokenParts = accessToken.match(/.{1,1000}/g);

      accessTokenParts.forEach((part, index) => {
        res.cookie(`accessTokenPart${index}`, part, {
          maxAge: 900000, // 15 minutes
          httpOnly: true, // Not accessible via JavaScript
          domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
          path: '/', // Cookie is valid for the entire domain path
          sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
          secure: isProduction,
        });
      });

      // create a refresh token
      const refreshToken = signJwt(
        { ...transporter, session: session._id },
        { expiresIn: process.env.refreshTokenTtl } // 15 minutes
      );

      const refreshTokenParts = refreshToken.match(/.{1,1000}/g);

      refreshTokenParts.forEach((part, index) => {
        res.cookie(`refreshTokenPart${index}`, part, {
          maxAge: 3.154e10, // 15 mins
          httpOnly: true, // Not accessible via JavaScript
          domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
          path: '/', // Cookie is valid for the entire domain path
          sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
          secure: isProduction,
        });
      });

      return res.json({ transporter, accessToken, refreshToken });
    }
  } catch (error) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// @desc Login a transporter
// @route POST /api/transporters/login
// @access Public
export async function loginTransporterHandler(req, res) {
  try {
    const transporter = await validatePassword(req.body);

    if (!transporter) {
      return res
        .status(401)
        .json({ message: 'Email ou Mot de passe invalide' });
    }

    // Create session
    const session = await createSession(
      transporter._id,
      req.get('user-agent' || '')
    );

    // create access token
    const accessToken = signJwt(
      { ...transporter, session: session._id },
      { expiresIn: process.env.accessTokenTtl } // 15 minutes
    );

    // split access token
    const accessTokenParts = accessToken.match(/.{1,1000}/g);

    accessTokenParts.forEach((part, index) => {
      res.cookie(`accessTokenPart${index}`, part, {
        maxAge: 900000, // 15 minutes
        httpOnly: true, // Not accessible via JavaScript
        domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
        path: '/', // Cookie is valid for the entire domain path
        sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
        secure: isProduction,
      });
    });

    // create a refresh token
    const refreshToken = signJwt(
      { ...transporter, session: session._id },
      { expiresIn: process.env.refreshTokenTtl } // 15 minutes
    );

    const refreshTokenParts = refreshToken.match(/.{1,1000}/g);

    refreshTokenParts.forEach((part, index) => {
      res.cookie(`refreshTokenPart${index}`, part, {
        maxAge: 3.154e10, // 15 mins
        httpOnly: true, // Not accessible via JavaScript
        domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
        path: '/', // Cookie is valid for the entire domain path
        sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
        secure: isProduction,
      });
    });

    return res.json({
      transporter,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// @desc Update a transporter
// @route PUT /api/transporters/profile/update
// @access Private
export async function updateTransporterHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const update = req.body;
  const transporter = await TransporterModel.findById(transporterId);

  if (!transporter) {
    return res.sendStatus(404);
  }

  const updatedTransporter = await TransporterModel.findOneAndUpdate(
    { _id: transporterId },
    update,
    {
      new: true,
    }
  );

  // Create session
  const session = await createSession(
    updatedTransporter._id,
    req.get('user-agent' || '')
  );

  // create access token
  const accessToken = signJwt(
    { ...updatedTransporter, session: session._id },
    { expiresIn: process.env.accessTokenTtl } // 15 minutes
  );

  // split access token
  const accessTokenParts = accessToken.match(/.{1,1000}/g);

  accessTokenParts.forEach((part, index) => {
    res.cookie(`accessTokenPart${index}`, part, {
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  // create a refresh token
  const refreshToken = signJwt(
    { ...updatedTransporter, session: session._id },
    { expiresIn: process.env.refreshTokenTtl } // 15 minutes
  );

  const refreshTokenParts = refreshToken.match(/.{1,1000}/g);

  refreshTokenParts.forEach((part, index) => {
    res.cookie(`refreshTokenPart${index}`, part, {
      maxAge: 3.154e10, // 15 mins
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  return res.json({
    transporter: updatedTransporter,
    accessToken,
    refreshToken,
  });
}

// @desc Update transporter parameters
// @route PUT /api/transporters/profile/update/parameter
// @access Private
export async function updateTransporterParameterHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const { password, newPassword, email, isActivated } = req.body;

  const transporter = await TransporterModel.findById(transporterId);

  if (!transporter) {
    return res.sendStatus(404);
  }

  const isValid = await transporter.comparePassword(password);

  if (!isValid) {
    return res.status(404).json({ message: 'Mot de passe incorrecte' });
  }

  if (newPassword) {
    transporter.password = newPassword;
  }
  transporter.email = email || transporter.email;
  transporter.isActivated = isActivated;
  await transporter.save();

  // Create session
  const session = await createSession(
    transporter._id,
    req.get('user-agent' || '')
  );

  // create access token
  const accessToken = signJwt(
    { ...transporter, session: session._id },
    { expiresIn: process.env.accessTokenTtl } // 15 minutes
  );

  // split access token
  const accessTokenParts = accessToken.match(/.{1,1000}/g);

  accessTokenParts.forEach((part, index) => {
    res.cookie(`accessTokenPart${index}`, part, {
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  // create a refresh token
  const refreshToken = signJwt(
    { ...transporter, session: session._id },
    { expiresIn: process.env.refreshTokenTtl } // 15 minutes
  );

  const refreshTokenParts = refreshToken.match(/.{1,1000}/g);

  refreshTokenParts.forEach((part, index) => {
    res.cookie(`refreshTokenPart${index}`, part, {
      maxAge: 3.154e10, // 15 mins
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  return res.json({
    transporter,
    accessToken,
    refreshToken,
  });
}

// @desc Get Logged in transporter
// @route GET /api/transporters/profile/details
// @access Private
export async function getCurrentTransporter(req, res) {
  // console.log('🚀 ~ getCurrentTransporter ~ res:', res.locals.user);

  return res.json({ transporter: res.locals.user });
}

// @desc Delete a transporter
// @route DELETE api/transporters/profile/delete
// @access private
export async function deleteTransporterHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const transporter = await TransporterModel.findById(transporterId);

  if (!transporter) {
    res.status(404).json({ message: 'Transporteur introuvable' });
  }

  const isValid = await transporter.comparePassword(req.body.password);

  if (!isValid) {
    return res.status(404).json({ message: 'Mot de passe incorrecte' });
  }

  const response = await transporter.deleteOne({ _id: transporter._id });

  if (response.acknowledged && response.deletedCount === 1) {
    res.status(200).json({ message: 'suppression effectuée avec success' });
  }
}

// @desc Create a new departures
// @route PUT api/transporters/departures/new
// @access private
export async function addTransporterDepartureHandler(req, res) {
  const transporterId = res.locals.user._doc._id;

  const departure = req.body;

  const transporter = await TransporterModel.findById(transporterId);

  if (!transporter) {
    return res.sendStatus(404);
  }

  const updatedTransporter = await TransporterModel.findOneAndUpdate(
    { _id: transporterId },
    { $push: { trajectory: departure } },
    {
      new: true,
    }
  );

  // Create session
  const session = await createSession(
    updatedTransporter._id,
    req.get('user-agent' || '')
  );

  // create access token
  const accessToken = signJwt(
    { ...updatedTransporter, session: session._id },
    { expiresIn: process.env.accessTokenTtl } // 15 minutes
  );

  // split access token
  const accessTokenParts = accessToken.match(/.{1,1000}/g);

  accessTokenParts.forEach((part, index) => {
    res.cookie(`accessTokenPart${index}`, part, {
      maxAge: 900000, // 15 minutes
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  // create a refresh token
  const refreshToken = signJwt(
    { ...updatedTransporter, session: session._id },
    { expiresIn: process.env.refreshTokenTtl } // 15 minutes
  );

  const refreshTokenParts = refreshToken.match(/.{1,1000}/g);

  refreshTokenParts.forEach((part, index) => {
    res.cookie(`refreshTokenPart${index}`, part, {
      maxAge: 3.154e10, // 15 mins
      httpOnly: true, // Not accessible via JavaScript
      domain: isProduction ? productionUrl : 'localhost', // Cookie is valid for this domain
      path: '/', // Cookie is valid for the entire domain path
      sameSite: isProduction ? 'None' : 'Lax', // Required for cross-domain cookies
      secure: isProduction,
    });
  });

  return res.json({
    transporter: updatedTransporter,
    accessToken,
    refreshToken,
  });
}
