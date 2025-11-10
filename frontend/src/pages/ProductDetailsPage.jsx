import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../services/productApi.js';
import useCart from '../hooks/useCart.js';

function ProductDetailsPage() {
  const { productId } = useParams();
  const { addItem, loading: cartLoading, error: cartError } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchProduct(productId)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await addItem({ productId: product._id, quantity });
      setSuccessMessage('Added to cart!');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p className="error">Failed to load product: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <section className="product-details">
      <div className="product-details__media">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="product-card__placeholder">No Image</div>
        )}
      </div>
      <div className="product-details__info">
        <h1>{product.name}</h1>
        <p className="product-details__price">${product.price?.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</p>
        <div className="product-details__actions">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
          <button className="btn btn-primary" disabled={product.stock === 0 || cartLoading} onClick={handleAddToCart}>
            {cartLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
        {successMessage && <p className="success">{successMessage}</p>}
        {cartError && <p className="error">{cartError}</p>}
      </div>
    </section>
  );
}

export default ProductDetailsPage;

