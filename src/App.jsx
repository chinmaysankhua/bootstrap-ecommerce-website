import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import NavigationBar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import productsArr from "./data/products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <BrowserRouter>
      <NavigationBar onCartClick={() => setShowCart(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails products={productsArr} />}
        />
      </Routes>

      <Footer />

      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </BrowserRouter>
  );
}

export default App;
