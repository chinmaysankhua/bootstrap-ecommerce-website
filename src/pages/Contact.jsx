import { useCallback, useState } from 'react'

const FIREBASE_URL =
  'https://react-ecommerce-project-3fc57-default-rtdb.firebaseio.com'

const CONTACT_URL = `${FIREBASE_URL}/contacts`

function Contact() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target

    setContactForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      setIsSubmitting(true)

      try {
        const response = await fetch(
          `${CONTACT_URL}.json`,
          {
            method: 'POST',
            body: JSON.stringify(contactForm),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to submit contact form'
          )
        }

        const data = await response.json()

        console.log('Contact saved:', data)

        setContactForm({
          name: '',
          email: '',
          phone: '',
        })
      } catch (error) {
        console.error(
          'Error submitting contact form:',
          error
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [contactForm]
  )

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        Contact Us
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label fw-bold"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                >
                  Email Id
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="form-label fw-bold"
                >
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact