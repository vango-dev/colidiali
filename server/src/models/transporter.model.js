import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const transporterSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      // required: true,
      min: 2,
      max: 50,
    },
    lName: {
      type: String,
      // required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },

    address: {
      type: String,
    },
    country: {
      type: String,
    },
    transporterPhoto: {
      type: String,
    },

    // Company Informations
    transportType: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyActivity: {
      type: String,
    },

    companyAddress: {
      type: String,
    },
    companyCountry: {
      type: String,
    },

    companyObservation: {
      type: String,
    },

    // Company Social Accounts
    transporterFacebook: {
      type: String,
    },

    transporterInstagram: {
      type: String,
    },

    transporterWhatsApp: {
      type: String,
    },

    transporterWebsite: {
      type: String,
    },

    avatarUrl: {
      type: String,
    },
    images: {
      type: [String],
    },

    isActivated: {
      type: Boolean,
    },

    isVerifiedByAdmin: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

transporterSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(Number(process.env.saltWorkFactor));
  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

transporterSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
};

const TransporterModel = mongoose.model('Transporter', transporterSchema);

export default TransporterModel;
