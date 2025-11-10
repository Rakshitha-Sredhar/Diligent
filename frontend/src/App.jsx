import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

