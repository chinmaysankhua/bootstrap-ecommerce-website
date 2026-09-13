import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Movies from './pages/Movies'
import NavigationBar from './components/Navbar'
import Cart from './components/Cart'
import Footer from './components/Footer'

import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'

function App() {
  const [showCart, setShowCart] = useState(false)

  return (
    <BrowserRouter>

      <NavigationBar
        onCartClick={() => setShowCart(true)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
         <Route path="/movies" element={<Movies />} />
      </Routes>

      <Footer />

      <Cart
        show={showCart}
        handleClose={() => setShowCart(false)}
      />

    </BrowserRouter>
  )
}

export default App