import { useContext } from 'react'

import {
  Offcanvas,
  Button,
  Image,
} from 'react-bootstrap'

import { CartContext } from '../context/CartContext'

function Cart({ show, handleClose }) {
  const { cart, removeFromCart } = useContext(CartContext)

  const total = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          CART
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>

        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
          <strong>ITEM</strong>
          <strong>PRICE</strong>
          <strong>QUANTITY</strong>
        </div>

        {cart.length === 0 ? (
          <p className="text-center">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={item.title}
              className="mb-4"
            >
              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">

                  <Image
                    src={item.imageUrl}
                    width={60}
                    height={60}
                    rounded
                  />

                  <div>
                    <div>
                      {item.title}
                    </div>

                    <div>
                      ₹{item.price}
                    </div>
                  </div>

                </div>

                <div>
                  {item.quantity}
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    removeFromCart(index)
                  }
                >
                  REMOVE
                </Button>

              </div>
            </div>
          ))
        )}

        <hr />

        <div className="text-end">
          <h5>
            Total ₹{total}
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