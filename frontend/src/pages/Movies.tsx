import {useEffect, useState} from "react";

type  Movie = {
    id: string;
    title: string,
    time: number,
    genre: string,
    availability: string,
}

export default function Movies() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getData()
            .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : "Failed to load movies");
            })
            .finally(() => setLoading(false));
    }, []);

    const getData = async () => {
        const response = await fetch('api/movies');

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const movieData: Movie[] = await response.json();
        setMovies(movieData);
    }

    return (
        <div>
            {loading && <h2>Loading...</h2>}
            {error && <div>Error: {error}</div>}
            {movies.map((movie) => {
                console.log(movie);
                return (
                    <div key={movie.id}>
                        {movie.title}
                    </div>
                )
            })}
        </div>
    )
}