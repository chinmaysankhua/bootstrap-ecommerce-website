import { Offcanvas, Button, Image } from 'react-bootstrap'

function Cart({ show, handleClose, cartElements, removeItem }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
          <strong>ITEM</strong>
          <strong>PRICE</strong>
          <strong>QUANTITY</strong>
        </div>

        {cartElements.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between mb-4"
          >
            <div className="d-flex align-items-center gap-2">
              <Image
                src={item.imageUrl}
                width={60}
                height={60}
                rounded
              />

              <div>
                <div>{item.title}</div>
                <div>₹{item.price}</div>
              </div>
            </div>

            <div>
              {item.quantity}
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={() => removeItem(index)}
            >
              REMOVE
            </Button>
          </div>
        ))}

        <hr />

        <div className="text-end">
          <h5>
            Total ₹
            {cartElements.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </h5>
        </div>

        <div className="text-center mt-4">
          <Button variant="info">
            PURCHASE
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Cart