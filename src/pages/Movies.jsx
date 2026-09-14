import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const FIREBASE_URL =
  'https://react-ecommerce-project-3fc57-default-rtdb.firebaseio.com'

const MOVIES_URL = `${FIREBASE_URL}/movies`
const SWAPI_URL = 'https://swapi.info/api/films'

function Movies() {
  const [movieForm, setMovieForm] = useState({
    title: '',
    releaseDate: '',
  })

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const retryTimeoutRef = useRef(null)
  const cancelRetryRef = useRef(false)

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target

    setMovieForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }, [])

  const fetchFirebaseMovies = useCallback(
    async () => {
      try {
        const response = await fetch(
          `${MOVIES_URL}.json`
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch Firebase movies'
          )
        }

        const data = await response.json()

        if (!data) {
          return []
        }

        return Object.entries(data).map(
          ([id, movie]) => ({
            id,
            title: movie.title,
            releaseDate: movie.releaseDate,
            source: 'firebase',
          })
        )
      } catch (error) {
        console.error(
          'Error fetching Firebase movies:',
          error
        )

        return []
      }
    },
    []
  )

  const fetchSWAPIMovies = useCallback(
    async () => {
      const response = await fetch(SWAPI_URL)

      if (!response.ok) {
        throw new Error(
          'Failed to fetch SWAPI movies'
        )
      }

      const data = await response.json()

      return data.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        source: 'api',
      }))
    },
    []
  )

  const loadMovies = useCallback(async () => {
    const [firebaseMovies, apiMovies] =
      await Promise.all([
        fetchFirebaseMovies(),
        fetchSWAPIMovies(),
      ])

    setMovies([
      ...apiMovies,
      ...firebaseMovies,
    ])
  }, [fetchFirebaseMovies, fetchSWAPIMovies])

  const handleAddMovie = useCallback(
    async (event) => {
      event.preventDefault()

      const NewMovieObj = {
        title: movieForm.title,
        releaseDate: movieForm.releaseDate,
      }

      console.log(NewMovieObj)

      try {
        const response = await fetch(
          `${MOVIES_URL}.json`,
          {
            method: 'POST',
            body: JSON.stringify(NewMovieObj),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to add movie')
        }

        const data = await response.json()

        const newMovie = {
          id: data.name,
          ...NewMovieObj,
          source: 'firebase',
        }

        setMovies((previousMovies) => [
          ...previousMovies,
          newMovie,
        ])

        setMovieForm({
          title: '',
          releaseDate: '',
        })
      } catch (error) {
        console.error(
          'Error adding movie:',
          error
        )
      }
    },
    [movieForm]
  )

  const handleDeleteMovie = useCallback(
    async (movieId) => {
      try {
        const response = await fetch(
          `${MOVIES_URL}/${movieId}.json`,
          {
            method: 'DELETE',
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to delete movie'
          )
        }

        setMovies((previousMovies) =>
          previousMovies.filter(
            (movie) => movie.id !== movieId
          )
        )
      } catch (error) {
        console.error(
          'Error deleting movie:',
          error
        )
      }
    },
    []
  )

  const handleFetchMovies = useCallback(() => {
    cancelRetryRef.current = false

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }

    const fetchWithRetry = async () => {
      if (cancelRetryRef.current) {
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const apiMovies = await fetchSWAPIMovies()

        if (cancelRetryRef.current) {
          return
        }

        setMovies((previousMovies) => {
          const firebaseMovies =
            previousMovies.filter(
              (movie) => movie.source === 'firebase'
            )

          return [
            ...apiMovies,
            ...firebaseMovies,
          ]
        })

        setIsLoading(false)
      } catch (error) {
        console.error(
          'Error fetching movies:',
          error
        )

        if (cancelRetryRef.current) {
          return
        }

        setError(
          'Something went wrong ....Retrying'
        )

        retryTimeoutRef.current = setTimeout(
          fetchWithRetry,
          5000
        )
      }
    }

    fetchWithRetry()
  }, [fetchSWAPIMovies])

  useEffect(() => {
    let isMounted = true

    const fetchInitialMovies = async () => {
      setIsLoading(true)

      try {
        const [firebaseMovies, apiMovies] =
          await Promise.all([
            fetchFirebaseMovies(),
            fetchSWAPIMovies(),
          ])

        if (!isMounted) {
          return
        }

        setMovies([
          ...apiMovies,
          ...firebaseMovies,
        ])

        setIsLoading(false)
      } catch (error) {
        console.error(
          'Error loading movies:',
          error
        )

        if (!isMounted) {
          return
        }

        setError(
          'Something went wrong ....Retrying'
        )

        setIsLoading(false)
      }
    }

    fetchInitialMovies()

    return () => {
      isMounted = false
      cancelRetryRef.current = true

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }
  }, [fetchFirebaseMovies, fetchSWAPIMovies])

  const handleCancelRetry = useCallback(() => {
    cancelRetryRef.current = true

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }

    setIsLoading(false)
    setError('')
  }, [])

  const movieList = useMemo(() => {
    return movies.map((movie) => (
      <div
        className="col-md-6 col-lg-4 mb-4"
        key={`${movie.source}-${movie.id}`}
      >
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">
              {movie.title}
            </h3>

            <p>
              <strong>Release Date:</strong>{' '}
              {movie.releaseDate}
            </p>

            {movie.source === 'firebase' && (
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDeleteMovie(movie.id)
                }
              >
                Delete Movie
              </button>
            )}
          </div>
        </div>
      </div>
    ))
  }, [movies, handleDeleteMovie])

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mb-4">
        <form onSubmit={handleAddMovie}>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label fw-bold"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={movieForm.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="form-label fw-bold"
            >
              Release Date
            </label>

            <input
              type="text"
              id="releaseDate"
              name="releaseDate"
              className="form-control"
              value={movieForm.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-5"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <div className="text-center">
          <button
            className="btn btn-primary px-5"
            onClick={handleFetchMovies}
            disabled={isLoading}
          >
            Fetch Movies
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center my-5">
          <div
            className="spinner-border text-primary"
            style={{
              width: '4rem',
              height: '4rem',
            }}
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          {error ? (
            <>
              <p className="mt-3 text-danger">
                {error}
              </p>

              <button
                className="btn btn-danger mt-2"
                onClick={handleCancelRetry}
              >
                Cancel
              </button>
            </>
          ) : (
            <p className="mt-3">
              Fetching movies...
            </p>
          )}
        </div>
      )}

      {!isLoading && movies.length > 0 && (
        <div className="row">
          {movieList}
        </div>
      )}
    </div>
  )
}

export default Movies