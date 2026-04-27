import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Movie from "./pages/Movie";
import RateMovies from "./pages/RateMovies";
import ChooseMovies from "./pages/ChooseMovies";
import Movies from "./pages/Movies";

export default function App() {
    return (
        <div>
            <NavBar
            items={[
                {label: "Home", to: "/"},
                {label: "See All Movies", to: "/movies"},
                {label: "Enter Movie", to: "/movie"},
                {label: "Rate Movies", to: "/rate"},
                {label: "Choose Movies", to: "/choose"},
                {label: "About", to: "/about"},
            ]}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/rate" element={<RateMovies />} />
                <Route path="/choose" element={<ChooseMovies />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}