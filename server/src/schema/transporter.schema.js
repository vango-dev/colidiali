import { array, date, number, object, string } from 'zod';

export const createTransporterSchema = object({
  body: object({
    fName: string({ required: 'fName is required' }),
    lName: string({ required_error: 'lName is required' }),
    type: string(),
    companyName: string(),
    email: string(),
    phone: string(),
    avatarUrl: string(),
    country: string(),
    trajectory: object({
      departurePoint: string(),
      departureCoordinates: array(number()),
      departureTime: string(),
      destinationPoint: string(),
      destinationCoordinates: array(number()),
      destinationTime: string(),
      checkPoints: array(
        object({
          city: string(),
          time: string(),
          coordinates: array(number()),
        })
      ),
    }),
  }),
});
