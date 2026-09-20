import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function NavigationBar({ onCartClick }) {
  const { cart } = useContext(CartContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          The Generics
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              HOME
            </Nav.Link>

            <Nav.Link as={NavLink} to="/store">
              STORE
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              ABOUT
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              LOGIN
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              CONTACT US
            </Nav.Link>

            <Nav.Link as={NavLink} to="/movies">
              MOVIES
            </Nav.Link>
          </Nav>

          <Button variant="outline-info" className="ms-4" onClick={onCartClick}>
            Cart ({cartItemCount})
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
