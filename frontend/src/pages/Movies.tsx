import {useEffect, useState} from "react";

type  Movie = {
    id: string;
    name: string,
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
        const response = await fetch('api/movie');

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const movieData: Movie[] = await response.json();
        setMovies(movieData);
    }

    return (
        <div>
            {loading && <h2 className="text-xl">Loading...</h2>}
            {error && <div className="text-red-500">Error: {error}</div>}
            {!loading && !error && (
                <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm bg-gray-700 p-2 rounded">
                        <h3 className="col-span-1 text-center text-white">Name</h3>
                        <h3 className="col-span-1 text-center text-white">Time</h3>
                        <h3 className="col-span-1 text-center text-white">Genre</h3>
                        <h3 className="col-span-1 text-center text-white">Availability</h3>
                    </div>
                    {movies.map((movie) => {
                        console.log(movie);
                        return (
                            <div key={movie.id} className="grid grid-cols-4 gap-x-4 gap-y-2 p-2 border-b border-gray-600 items-center">
                                <div className="text-center">{movie.name}</div>
                                <div className="text-center">{movie.time}</div>
                                <div className="text-center">{movie.genre}</div>
                                <div className="text-center">{movie.availability}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}