import TransporterModel from '../models/transporter.model.js';

export async function createTransporter(input) {
  try {
    const transporter = await TransporterModel.create(input);

    return transporter;
  } catch (error) {
    throw new Error(error);
  }
}

export async function validatePassword({ phone, password }) {
  const transporter = await TransporterModel.findOne({ phone });

  if (!transporter) {
    return false;
  }

  const isValid = await transporter.comparePassword(password);

  if (!isValid) return false;

  return transporter;
}
