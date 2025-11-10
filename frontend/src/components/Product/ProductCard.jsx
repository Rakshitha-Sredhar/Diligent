import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <div className="product-card__image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
          ) : (
            <div className="product-card__placeholder">No Image</div>
          )}
        </div>
        <div className="product-card__body">
          <h3>{product.name}</h3>
          <p className="product-card__price">${product.price?.toFixed(2)}</p>
          <p className="product-card__stock">{product.stock > 0 ? 'In stock' : 'Out of stock'}</p>
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    stock: PropTypes.number
  }).isRequired
};

export default ProductCard;

