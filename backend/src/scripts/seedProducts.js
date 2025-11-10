import env from '../config/env.js';
import { connectToDatabase } from '../config/db.js';
import Product from '../models/product.model.js';

const SAMPLE_PRODUCTS = [
  {
    name: 'Minimalist Wireless Headphones',
    description: 'Lightweight Bluetooth headphones with noise reduction.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    category: 'Audio',
    brand: 'Soundscape',
    stock: 25
  },
  {
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Compact keyboard with hot-swappable switches and RGB.',
    price: 159.0,
    imageUrl: 'https://images.unsplash.com/photo-1585076809310-8e5c1e95d0d8',
    category: 'Accessories',
    brand: 'KeyVibe',
    stock: 12
  },
  {
    name: 'Smart Home Speaker',
    description: 'Voice assistant speaker for smart home control.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1512494939324-39e74ed8c51e',
    category: 'Smart Home',
    brand: 'EchoSphere',
    stock: 30
  }
];

async function seed() {
  try {
    await connectToDatabase();
    await Product.deleteMany({});
    await Product.insertMany(SAMPLE_PRODUCTS);
    console.log(`Seeded ${SAMPLE_PRODUCTS.length} products.`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    process.exit(0);
  }
}

if (env.nodeEnv !== 'production') {
  seed();
}

