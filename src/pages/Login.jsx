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
  InputGroup,
} from 'react-bootstrap'

import AuthContext from '../context/AuthContext'

const API_KEY =
  'AIzaSyAXhOcSSSkvtZgGp-L0Fg_6nN5JP4iyM-k'

const LOGIN_URL =
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

const SIGNUP_URL =
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

function Login() {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      setError('')

      if (!isLogin && password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }

      setIsLoading(true)

      const url = isLogin
        ? LOGIN_URL
        : SIGNUP_URL

      try {
        const response = await fetch(url, {
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
            data.error?.message || 'Authentication failed'
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
        } else if (
          error.message === 'EMAIL_EXISTS'
        ) {
          setError(
            'An account with this email already exists'
          )
        } else if (
          error.message ===
          'WEAK_PASSWORD : Password should be at least 6 characters'
        ) {
          setError(
            'Password must be at least 6 characters'
          )
        } else {
          setError(
            'Something went wrong. Please try again.'
          )
        }
      } finally {
        setIsLoading(false)
      }
    },
    [
      email,
      password,
      confirmPassword,
      isLogin,
      authCtx,
      navigate,
    ]
  )

  const handleModeChange = () => {
    setIsLogin((previousMode) => !previousMode)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">
                {isLogin ? 'Login' : 'Create Account'}
              </h2>

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
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
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Password
                  </Form.Label>

                  <InputGroup>
                    <Form.Control
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="Enter your password"
                      minLength={6}
                      required
                    />

                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {!isLogin && (
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Confirm Password
                    </Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={
                          showConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(
                            event.target.value
                          )
                        }
                        placeholder="Confirm your password"
                        minLength={6}
                        required
                      />

                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) => !previous
                          )
                        }
                      >
                        {showConfirmPassword
                          ? '🙈'
                          : '👁️'}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                )}

                {isLogin && (
                  <div className="mb-4" />
                )}

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? isLogin
                        ? 'Logging in...'
                        : 'Creating account...'
                      : isLogin
                      ? 'Login'
                      : 'Sign Up'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <span>
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </span>

                <Button
                  variant="link"
                  className="p-0 ms-2"
                  onClick={handleModeChange}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login