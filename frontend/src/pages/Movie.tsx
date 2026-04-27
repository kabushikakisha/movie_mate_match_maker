import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

interface IMovie {
    name: string;
    time: number;
    genre: string;
    availability: string;
}

const defaultMovie : IMovie = {name: '', time: 0, genre: 'N/A', availability: 'N/A'};
export default function Movie() {
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            setLoading(true);
            getData(id).finally(() => {
                setLoading(false);
            });
        }
    }, [id])

    const getData = async (id: number) => {
        const movieFromApi = await fetch(`/api/movie/${id}`);
        if (!movieFromApi.ok) {
            throw new Error(`Failed to fetch movie with ID ${id}`);
        }
        const movie = await movieFromApi.json();
        setName(movie.name);
        setTime(movie.time);
        setGenre(movie.genre);
        setAvailability(movie.availability);
    }

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [time, setTime] = useState(0);
    const [genre, setGenre] = useState('');
    const [availability, setAvailability] = useState('');
    const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleTimeFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(Number(e.target.value));
    }
    const handleGenreFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenre(e.target.value);
    }
    const handleAvailabilityFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvailability(e.target.value);
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', {name, time, genre, availability});

        const movieData = {name, time, genre, availability};

        if (id) {
            try {
                const response = await fetch(`/api/movie/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieData),
                });
                if (!response.ok) {
                    throw new Error('Failed to update movie');
                }
                const result = await response.json();
            } catch (error) {
                console.error('Error updating movie:', error);
            }
        } else {
            try {
                const response = await fetch('/api/movie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieData),
                });
                if (!response.ok) {
                    throw new Error('Failed to create movie');
                }
                const result = await response.json();
                console.log('Movie created:', result);
            } catch (error) {
                console.error('Error creating movie:', error);
            }
        }
    }
    
    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Movie Form</h1>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Movie Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleNameFieldChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="time">Movie Time</label>
                    <input
                        id="time"
                        type="number"
                        value={time}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleTimeFieldChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="genre">Movie Genre</label>
                    <input
                        id="genre"
                        type="text"
                        value={genre}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleGenreFieldChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="availability">Movie Availability</label>
                    <input
                        id="availability"
                        type="text"
                        value={availability}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleAvailabilityFieldChange}
                    />
                </div>
                <button
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit">
                    {id ? 'Update Movie' : 'Create Movie'}
                </button>
            </form>
        </div>
    )
}