import {Routes, Route, Link} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import About from "./pages/About";
import Movie from "./pages/Movie";

export default function App () {
    return (
        <div>
            <NavBar 
            items={[
                {label: "Home", to: "/"},
                {label: "About", to: "/about"},
                {label: "Movies", to: "/movies"}
            ]}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<Movie />} />
            </Routes>
        </div>
    )
}