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
            } catch (error) {
                console.error('Error creating movie:', error);
            }
        }
    }
    
    return (
        <div>
            <h1>Movie Form</h1>
            <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                value={name}
                onChange={handleNameFieldChange}
            />
            <input
                type="number"
                value={time}
                onChange={handleTimeFieldChange}
            />
            <input
                type="text"
                value={genre}
                onChange={handleGenreFieldChange}
            />
            <input
                type="text"
                value={availability}
                onChange={handleAvailabilityFieldChange}
            />
            <button type="submit">
                {id ? 'Update Movie' : 'Create Movie'}
            </button>
            </form>
        </div>
    )
}