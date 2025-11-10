import PropTypes from 'prop-types';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;

