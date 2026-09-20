import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap'

import AuthContext from '../context/AuthContext'

const API_KEY =
  'AIzaSyAXhOcSSSkvtZgGp-L0Fg_6nN5JP4iyM-k'

const LOGIN_URL =
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

function Login() {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()

      setError('')
      setIsLoading(true)

      try {
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error?.message || 'Login failed'
          )
        }

        authCtx.login(
          data.idToken,
          data.localId,
          data.email
        )

        navigate('/store')
      } catch (error) {
        if (
          error.message === 'EMAIL_NOT_FOUND' ||
          error.message === 'INVALID_PASSWORD' ||
          error.message === 'INVALID_LOGIN_CREDENTIALS'
        ) {
          setError('Invalid email or password')
        } else {
          setError(
            'Something went wrong. Please try again.'
          )
        }
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, authCtx, navigate]
  )

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">
                Login
              </h2>

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email
                  </Form.Label>

                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Logging in...'
                      : 'Login'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login