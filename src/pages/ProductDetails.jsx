import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap'

function ProductDetails({ products }) {
  const { productId } = useParams()

  const product = useMemo(() => {
    return products.find(
      (item) => item.id === productId
    )
  }, [products, productId])

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">
        {product.title}
      </h1>

      <Row className="mb-5">
        {product.images.map((image, index) => (
          <Col
            md={4}
            key={`${product.id}-${index}`}
            className="mb-4"
          >
            <Card>
              <Card.Img
                src={image}
                alt={`${product.title} ${index + 1}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="text-center mb-4">
        Reviews
      </h2>

      <Row className="justify-content-center">
        <Col md={8}>
          {product.reviews.map((review) => (
            <Card
              key={review.id}
              className="mb-3"
            >
              <Card.Body>
                <Card.Title>
                  {review.name}
                </Card.Title>

                <Card.Text>
                  {'⭐'.repeat(review.rating)}
                </Card.Text>

                <Card.Text>
                  {review.comment}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails