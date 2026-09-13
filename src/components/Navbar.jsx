import {
  Container,
  Nav,
  Navbar,
  Button,
} from 'react-bootstrap'

import { NavLink } from 'react-router-dom'
import { useContext } from 'react'

import { CartContext } from '../context/CartContext'

function NavigationBar({ onCartClick }) {
  const { cart } = useContext(CartContext)

  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="mx-auto">

          <Nav.Link as={NavLink} to="/" end>
            HOME
          </Nav.Link>

          <Nav.Link as={NavLink} to="/store">
            STORE
          </Nav.Link>

          <Nav.Link as={NavLink} to="/about">
            ABOUT
          </Nav.Link>
            <Nav.Link as={NavLink} to="/movies">
  MOVIES
</Nav.Link>
          <Button
            variant="outline-info"
            className="ms-4"
            onClick={onCartClick}
          >
            Cart ({cartItemCount})
          </Button>

        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar