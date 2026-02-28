import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
    const [favorites, setFavorites] = useState([]);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/movies"
                    element={
                        <Movies
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                ></Route>
                <Route
                    path="/movies/:id"
                    element={
                        <MovieDetail
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                ></Route>
                <Route
                    path="/favorites"
                    element={
                        <Favorites
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    }
                ></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
