import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Partners from './pages/Partners';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

import './index.css';

// ScrollToTop component — resets scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper with shared Header & Footer
function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductCategory />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/partners" element={<Navigate to="/about-us" replace />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
