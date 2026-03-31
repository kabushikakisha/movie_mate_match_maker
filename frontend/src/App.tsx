import {Routes, Route, Link} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App () {
    return (
        <div>
            <NavBar 
            items={[
                {label: "Home", to: "/"},
                {label: "About", to: "/about"},
            ]}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}