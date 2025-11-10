import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productApi.js';
import ProductCard from '../components/Product/ProductCard.jsx';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data.items);
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
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">Failed to load products: {error}</p>;
  }

  return (
    <section>
      <header className="section-header">
        <h2>Products</h2>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductListPage;

