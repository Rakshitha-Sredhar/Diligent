import mongoose from '../config/db.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      index: true
    },
    brand: {
      type: String
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;

