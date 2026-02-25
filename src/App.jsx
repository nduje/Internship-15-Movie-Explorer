import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/movies/:id" element={<MovieDetail />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
