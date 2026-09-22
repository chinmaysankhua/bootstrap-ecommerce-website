import { useContext } from 'react'

import {
  Offcanvas,
  Button,
  Image,
} from 'react-bootstrap'

import { CartContext } from '../context/CartContext'

function Cart({ show, handleClose }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext)

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
          cart.map((item) => (
            <div
              key={item.id}
              className="mb-4"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <Image
                    src={
                      item.images?.[0] ||
                      item.imageUrl
                    }
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

                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>

                  <span>
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    removeFromCart(item.id)
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