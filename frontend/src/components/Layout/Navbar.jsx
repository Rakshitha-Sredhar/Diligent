import { Link, NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart.js';

function Navbar() {
  const { cart } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          Diligent Shop
        </Link>
      </div>
      <nav className="navbar__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart ({cart?.totals?.quantity ?? 0})</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;

