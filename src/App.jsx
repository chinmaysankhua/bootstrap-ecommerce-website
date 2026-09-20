import { lazy, Suspense, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import NavigationBar from './components/Navbar'
import Cart from './components/Cart'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import productsArr from './data/products'

const Home = lazy(() => import('./pages/Home'))
const Store = lazy(() => import('./pages/Store'))
const About = lazy(() => import('./pages/About'))
const Movies = lazy(() => import('./pages/Movies'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const ProductDetails = lazy(() =>
  import('./pages/ProductDetails')
)

function App() {
  const [showCart, setShowCart] = useState(false)

  return (
    <BrowserRouter>
      <NavigationBar
        onCartClick={() => setShowCart(true)}
      />

      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/movies"
            element={<Movies />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute>
                <ProductDetails
                  products={productsArr}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      <Footer />

      <Cart
        show={showCart}
        handleClose={() => setShowCart(false)}
      />
    </BrowserRouter>
  )
}

export default App