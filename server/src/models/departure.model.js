import mongoose from 'mongoose';
import { geocoder } from '../utils/geocoder.js';

const departureSchema = mongoose.Schema(
  {
    transporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transporter',
    },

    departurePoint: {
      type: String,
    },

    departureCoordinates: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      formattedAddress: String,
      city: String,
      country: String,
    },

    departureTime: { type: Date },

    destinationPoint: {
      type: String,
    },

    destinationCoordinates: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      formattedAddress: String,
      city: String,
      country: String,
    },

    destinationTime: { type: Date },

    checkPoints: [String],
    checkPointsCoordinates: [
      {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        },
        formattedAddress: String,
        city: String,
        country: String,
      },
    ],

    departureObservation: { type: String },
  },

  { timestamps: true }
);

departureSchema.index({ departureCoordinates: '2dsphere' });
departureSchema.index({ destinationCoordinates: '2dsphere' });
departureSchema.index({ 'checkPointsCoordinates.coordinates': '2dsphere' });

departureSchema.pre('save', async function (next) {
  // Geocode departure point
  const departure = await geocoder.geocode(this.departurePoint);
  this.departureCoordinates = {
    type: 'Point',
    coordinates: [departure[0].longitude, departure[0].latitude],
    formattedAddress: departure[0].formattedAddress,
    city: departure[0].city,
    country: departure[0].country,
  };

  // Geocode destination point
  const destination = await geocoder.geocode(this.destinationPoint);
  this.destinationCoordinates = {
    type: 'Point',
    coordinates: [destination[0].longitude, destination[0].latitude],
    formattedAddress: destination[0].formattedAddress,
    city: destination[0].city,
    country: destination[0].country,
  };

  // Geocode each checkpoint
  this.checkPointsCoordinates = [];
  if (this.checkPoints && this.checkPoints.length > 0) {
    for (let i = 0; i < this.checkPoints.length; i++) {
      const checkpoint = await geocoder.geocode(this.checkPoints[i]);
      this.checkPointsCoordinates.push({
        type: 'Point',
        coordinates: [checkpoint[0].longitude, checkpoint[0].latitude],
        formattedAddress: checkpoint[0].formattedAddress,
        city: checkpoint[0].city,
        country: checkpoint[0].country,
      });
    }
  }

  // Do not save addresses
  this.departurePoint = undefined;
  this.destinationPoint = undefined;
  this.checkPoints = undefined;
  next();
});

const DepartureModel = mongoose.model('Departure', departureSchema);

export default DepartureModel;
