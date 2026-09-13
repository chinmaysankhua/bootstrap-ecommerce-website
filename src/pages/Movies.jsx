import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const API_URL = "https://swapi.info/api/films";

function Movies() {
  // -----------------------------
  // Add Movie Form State
  // -----------------------------
  const [movieForm, setMovieForm] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  // -----------------------------
  // Movies API State
  // -----------------------------
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Retry Management
  // -----------------------------
  const retryTimeoutRef = useRef(null);
  const cancelRetryRef = useRef(false);

  // -----------------------------
  // Form Input Handler
  // -----------------------------
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    setMovieForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }, []);

  // -----------------------------
  // Add Movie Handler
  // -----------------------------
  const handleAddMovie = useCallback(
    (event) => {
      event.preventDefault();

      const NewMovieObj = {
        title: movieForm.title,
        openingText: movieForm.openingText,
        releaseDate: movieForm.releaseDate,
      };

      console.log(NewMovieObj);

      // Clear form after adding
      setMovieForm({
        title: "",
        openingText: "",
        releaseDate: "",
      });
    },
    [movieForm],
  );

  // -----------------------------
  // API Request
  // -----------------------------
  const fetchMovies = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      setMovies(data);
      setIsLoading(false);

      return true;
    } catch (error) {
      console.error("Error fetching movies:", error);

      return false;
    }
  }, []);

  // -----------------------------
  // Fetch + Retry Logic
  // -----------------------------
  useEffect(() => {
    let isMounted = true;

    const fetchWithRetry = async () => {
      if (!isMounted || cancelRetryRef.current) {
        return;
      }

      setIsLoading(true);

      const success = await fetchMovies();

      if (!isMounted || cancelRetryRef.current) {
        return;
      }

      if (success) {
        setError("");
        setIsLoading(false);
        return;
      }

      setError("Something went wrong ....Retrying");

      retryTimeoutRef.current = setTimeout(() => {
        fetchWithRetry();
      }, 5000);
    };

    cancelRetryRef.current = false;

    fetchWithRetry();

    return () => {
      isMounted = false;
      cancelRetryRef.current = true;

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [fetchMovies]);

  // -----------------------------
  // Fetch Movies Button
  // -----------------------------
  const handleFetchMovies = useCallback(() => {
    cancelRetryRef.current = false;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    const fetchAgain = async () => {
      setIsLoading(true);
      setError("");

      const success = await fetchMovies();

      if (!success && !cancelRetryRef.current) {
        setError("Something went wrong ....Retrying");

        retryTimeoutRef.current = setTimeout(() => {
          fetchAgain();
        }, 5000);
      }
    };

    fetchAgain();
  }, [fetchMovies]);

  // -----------------------------
  // Cancel Retry
  // -----------------------------
  const handleCancelRetry = useCallback(() => {
    cancelRetryRef.current = true;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setIsLoading(false);
    setError("");
  }, []);

  // -----------------------------
  // Memoized Movie List
  // -----------------------------
  const movieList = useMemo(() => {
    return movies.map((movie) => (
      <div className="col-md-6 col-lg-4 mb-4" key={movie.episode_id}>
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">{movie.title}</h3>

            <p>
              <strong>Episode:</strong> {movie.episode_id}
            </p>

            <p>
              <strong>Director:</strong> {movie.director}
            </p>

            <p>
              <strong>Producer:</strong> {movie.producer}
            </p>

            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>

            <p>
              <strong>Opening Crawl:</strong>
            </p>

            <p className="text-muted">{movie.opening_crawl}</p>
          </div>
        </div>
      </div>
    ));
  }, [movies]);

  return (
    <div className="container py-5">
      {/* =================================
          ADD MOVIE FORM
      ================================= */}
      <div className="card shadow-sm p-4 mb-4">
        <form onSubmit={handleAddMovie}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={movieForm.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Opening Text */}
          <div className="mb-3">
            <label htmlFor="openingText" className="form-label fw-bold">
              Opening Text
            </label>

            <textarea
              id="openingText"
              name="openingText"
              className="form-control"
              rows="5"
              value={movieForm.openingText}
              onChange={handleInputChange}
            />
          </div>

          {/* Release Date */}
          <div className="mb-4">
            <label htmlFor="releaseDate" className="form-label fw-bold">
              Release Date
            </label>

            <input
              type="text"
              id="releaseDate"
              name="releaseDate"
              className="form-control"
              value={movieForm.releaseDate}
              onChange={handleInputChange}
            />
          </div>

          {/* Add Movie Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
              Add Movie
            </button>
          </div>
        </form>
      </div>

      {/* =================================
          FETCH MOVIES BUTTON
      ================================= */}
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

      {/* =================================
          LOADING / ERROR
      ================================= */}
      {isLoading && (
        <div className="text-center my-5">
          <div
            className="spinner-border text-primary"
            style={{
              width: "4rem",
              height: "4rem",
            }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>

          {error ? (
            <>
              <p className="mt-3 text-danger">{error}</p>

              <button
                className="btn btn-danger mt-2"
                onClick={handleCancelRetry}
              >
                Cancel
              </button>
            </>
          ) : (
            <p className="mt-3">Fetching movies...</p>
          )}
        </div>
      )}

      {/* =================================
          MOVIES
      ================================= */}
      {!isLoading && movies.length > 0 && (
        <div className="row">{movieList}</div>
      )}
    </div>
  );
}

export default Movies;
