import { Router } from 'express';
import cartRoutes from './cart.routes.js';
import productRoutes from './product.routes.js';

const router = Router();

router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

export default router;

