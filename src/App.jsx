import { Container, Row, Col, Card, Button } from 'react-bootstrap'

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

function App() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Products</h1>

      <Row>
        {productsArr.map((product) => (
          <Col md={6} lg={3} key={product.title} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.imageUrl}
                alt={product.title}
              />

              <Card.Body className="text-center">
                <Card.Title>{product.title}</Card.Title>

                <Card.Text>₹{product.price}</Card.Text>

                <Button variant="info">
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

export default App