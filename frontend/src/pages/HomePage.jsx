import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1>Welcome to Diligent Shop</h1>
        <p>Discover curated products with a seamless shopping experience.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    </section>
  );
}

export default HomePage;

