import { useEffect, useState } from "react";

interface Movie {
  id: number;
  name: string | null;
  genre: string | null;
  time: number | null;
  availability: string | null;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; movies: Movie[] };

export default function RateMovies() {
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const [submitting, setSubmitting] = useState<Set<number>>(new Set());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState({ status: "error", message: "You must be logged in to rate movies." });
      return;
    }

    fetch("/api/ratings/unrated", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json() as Promise<Movie[]>;
      })
      .then((movies) => setState({ status: "ok", movies }))
      .catch((err: unknown) =>
        setState({ status: "error", message: String(err) }),
      );
  }, []);

  const rateMovie = async (movieId: number, rating: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setSubmitting((prev) => new Set(prev).add(movieId));

    try {
      const res = await fetch("/api/ratings/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, movie_id: movieId }),
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      setState((prev) =>
        prev.status === "ok"
          ? { status: "ok", movies: prev.movies.filter((m) => m.id !== movieId) }
          : prev,
      );
    } catch (err) {
      console.error("Failed to submit rating:", err);
    } finally {
      setSubmitting((prev) => {
        const next = new Set(prev);
        next.delete(movieId);
        return next;
      });
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-2xl px-4">
      <h1 className="mb-6 text-3xl font-bold text-white">Rate Movies</h1>

      {state.status === "loading" && (
        <p className="text-slate-400">Loading…</p>
      )}

      {state.status === "error" && (
        <p className="text-red-400">{state.message}</p>
      )}

      {state.status === "ok" && state.movies.length === 0 && (
        <p className="text-slate-400">You've rated all available movies!</p>
      )}

      {state.status === "ok" && state.movies.length > 0 && (
        <ul className="flex flex-col gap-3">
          {state.movies.map((movie) => (
            <li
              key={movie.id}
              className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-4"
            >
              <div className="text-lg font-semibold text-white">
                {movie.name ?? "Untitled"}
              </div>
              <div className="mt-1 flex gap-4 text-sm text-slate-400">
                {movie.genre && <span>{movie.genre}</span>}
                {movie.time && <span>{movie.time} min</span>}
                {movie.availability && <span>{movie.availability}</span>}
              </div>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    disabled={submitting.has(movie.id)}
                    onClick={() => rateMovie(movie.id, rating)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 bg-slate-700 text-sm font-medium text-slate-300 transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
