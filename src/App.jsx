import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap'

import Cart from './Cart'

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
]

const cartElements = [
  {
    title: 'Colors',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  },
]

function App() {
  const [showCart, setShowCart] = useState(false)

  const [cart, setCart] = useState(cartElements)

  const handleCloseCart = () => {
    setShowCart(false)
  }

  const handleShowCart = () => {
    setShowCart(true)
  }

  const removeItem = (indexToRemove) => {
    setCart((previousCart) =>
      previousCart.filter((item, index) => index !== indexToRemove)
    )
  }

  return (
    <>
      {/* NAVBAR */}

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>The Generics</Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link href="#">HOME</Nav.Link>
            <Nav.Link href="#">STORE</Nav.Link>
            <Nav.Link href="#">ABOUT</Nav.Link>

            <Button
              variant="outline-info"
              onClick={handleShowCart}
              className="ms-3"
            >
              Cart
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* PRODUCTS */}

      <Container className="py-5">
        <h2 className="text-center mb-5">
          MUSIC
        </h2>

        <Row>
          {productsArr.map((product) => (
            <Col
              md={6}
              lg={3}
              key={product.title}
              className="mb-4"
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt={product.title}
                />

                <Card.Body className="text-center">
                  <Card.Title>
                    {product.title}
                  </Card.Title>

                  <Card.Text>
                    ₹{product.price}
                  </Card.Text>

                  <Button variant="info">
                    ADD TO CART
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CART */}

      <Cart
        show={showCart}
        handleClose={handleCloseCart}
        cartElements={cart}
        removeItem={removeItem}
      />
    </>
  )
}

export default App