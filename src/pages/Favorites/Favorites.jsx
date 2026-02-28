import { useCallback, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Favorites.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";
import filterMovies from "../../helpers/filterMovies";
import toggleFavorite from "../../helpers/toggleFavorite";

const Favorites = ({ favorites, setFavorites }) => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("id");

    const { data, loading, error } = useFetch();

    const visibleMovies = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const favoriteMovies = data.filter((movie) =>
            favorites.includes(movie.id),
        );

        return filterMovies(favoriteMovies, search, sortBy);
    }, [data, favorites, search, sortBy]);

    const handleToggleFavorite = useCallback(
        (id) => {
            setFavorites((prev) => toggleFavorite(prev, id));
        },
        [setFavorites],
    );

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite?.(id);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Favorites List</h2>

            <Filter
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
            />

            <div className={styles.movies_container}>
                {visibleMovies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/movies/${movie.id}`}
                        className={styles.movie_link}
                    >
                        <MovieCard
                            id={movie.id}
                            poster={movie.poster}
                            title={movie.title}
                            year={movie.year}
                            rating={movie.rating}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            isFavoriteView={true}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Favorites;
