import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap'

import { CartContext } from '../context/CartContext'
import productsArr from '../data/products'

function Store() {
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">
        MUSIC
      </h2>

      <Row>
        {productsArr.map((product) => (
          <Col
            md={6}
            lg={3}
            key={product.id}
            className="mb-4"
          >
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.images[0]}
                alt={product.title}
                onClick={() =>
                  handleProductClick(product.id)
                }
                style={{ cursor: 'pointer' }}
              />

              <Card.Body className="text-center">
                <Card.Title
                  onClick={() =>
                    handleProductClick(product.id)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {product.title}
                </Card.Title>

                <Card.Text>
                  ₹{product.price}
                </Card.Text>

                <Button
                  variant="info"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  ADD TO CART
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Store