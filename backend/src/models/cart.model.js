import mongoose from '../config/db.js';

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    priceSnapshot: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    _id: true,
    timestamps: true
  }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sessionId: {
      type: String,
      index: true,
      sparse: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ORDERED', 'ABANDONED'],
      default: 'ACTIVE',
      index: true
    },
    items: [cartItemSchema]
  },
  {
    timestamps: true
  }
);

cartSchema.index({ userId: 1, status: 1 }, { unique: true, partialFilterExpression: { userId: { $exists: true } } });
cartSchema.index({ sessionId: 1, status: 1 }, { unique: true, partialFilterExpression: { sessionId: { $exists: true } } });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

