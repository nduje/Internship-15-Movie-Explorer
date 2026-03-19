import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Manage from "./pages/Manage/Manage.jsx";
import Account from "./pages/Account/Account.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/movies/:id" element={<MovieDetail />}></Route>
                <Route path="/favorites" element={<Favorites />}></Route>
                <Route path="/manage" element={<Manage />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
