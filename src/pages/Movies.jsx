import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const API_URL = "https://swapi.info/api/films";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Stores the timeout ID
  const retryTimeoutRef = useRef(null);

  // Tells us whether the user cancelled retrying
  const cancelRetryRef = useRef(false);

  /*
    API function

    This function only handles the API request.
    Retry scheduling is handled separately by useEffect.
  */
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

  /*
    Fetch movies automatically when the component loads.
    If the API fails, retry every 5 seconds.
  */
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

      // API failed
      setError("Something went wrong ....Retrying");

      // Retry after 5 seconds
      retryTimeoutRef.current = setTimeout(() => {
        fetchWithRetry();
      }, 5000);
    };

    cancelRetryRef.current = false;

    fetchWithRetry();

    // Cleanup
    return () => {
      isMounted = false;
      cancelRetryRef.current = true;

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchMovies]);

  /*
    Cancel retrying
  */
  const handleCancelRetry = useCallback(() => {
    cancelRetryRef.current = true;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);

      retryTimeoutRef.current = null;
    }

    setIsLoading(false);
    setError("");
  }, []);

  /*
    Memoized movie list

    It will only be recalculated when movies changes.
  */
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
      <h1 className="text-center mb-5">Star Wars Movies</h1>

      {/* LOADING */}

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

      {/* MOVIES */}

      {!isLoading && movies.length > 0 && (
        <div className="row">{movieList}</div>
      )}
    </div>
  );
}

export default Movies;
