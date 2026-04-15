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

  const rateMovie = (movieId: number, rating: number) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      setState({status: "error", message: "Authentication required to rate movies."});
      return;
    }

    fetch("/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id: movieId,
        user_id: parseInt(userId),
        rating: rating,
      }),
    })
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          return res.json();
        })
        .then(() => {
          // Remove the rated movie from the list
          setState(prev => {
            if (prev.status !== "ok") return prev;
            const updatedMovies = prev.movies.filter(movie => movie.id !== movieId);
            return {status: "ok", movies: updatedMovies};
          });
        })
        .catch((err: unknown) =>
            setState({status: "error", message: String(err)}),
        );
  }

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
