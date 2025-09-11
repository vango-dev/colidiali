import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    transporterId: {
      type: mongoose.Schema.Types.ObjectId,
      reg: 'Transporter',
    },
    name: {
      type: String,
    },
    value: { type: Number },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;
