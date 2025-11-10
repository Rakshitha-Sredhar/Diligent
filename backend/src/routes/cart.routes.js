import { Router } from 'express';
import { addCartItem, getCart, removeCartItem } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', getCart);
router.post('/', addCartItem);
router.delete('/:itemId', removeCartItem);

export default router;

