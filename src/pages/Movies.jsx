import { useState } from 'react'

function Movies() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'https://swapi.info/api/films'
      )

      const data = await response.json()

      setMovies(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-5">

      <h1 className="text-center mb-4">
        Star Wars Movies
      </h1>

      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={fetchMovies}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get Movies'}
        </button>
      </div>

      {/* LOADER */}

      {isLoading && (
        <div className="text-center my-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3">
            Fetching movies...
          </p>
        </div>
      )}

      {/* MOVIES */}

      {!isLoading && movies.length > 0 && (
        <div className="row">
          {movies.map((movie) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              key={movie.episode_id}
            >
              <div className="card h-100">

                <div className="card-body">

                  <h3 className="card-title">
                    {movie.title}
                  </h3>

                  <p>
                    <strong>Episode:</strong>{' '}
                    {movie.episode_id}
                  </p>

                  <p>
                    <strong>Director:</strong>{' '}
                    {movie.director}
                  </p>

                  <p>
                    <strong>Producer:</strong>{' '}
                    {movie.producer}
                  </p>

                  <p>
                    <strong>Release Date:</strong>{' '}
                    {movie.release_date}
                  </p>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Movies