import { useContext } from 'react'
import {
  Navbar,
  Nav,
  Container,
  Button,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import AuthContext from '../context/AuthContext'

function NavigationBar({ onCartClick }) {
  const { cart } = useContext(CartContext)
  const authCtx = useContext(AuthContext)

  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const handleLogout = () => {
    authCtx.logout()
  }

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-3"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          The Generics
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              HOME
            </Nav.Link>

            <Nav.Link as={NavLink} to="/store">
              STORE
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              ABOUT
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              CONTACT US
            </Nav.Link>

            <Nav.Link as={NavLink} to="/movies">
              MOVIES
            </Nav.Link>

            {!authCtx.isLoggedIn && (
              <Nav.Link as={NavLink} to="/login">
                LOGIN
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {authCtx.isLoggedIn && (
              <Button
                variant="outline-light"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            )}

            <Button
              variant="outline-info"
              onClick={onCartClick}
            >
              Cart ({cartItemCount})
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar