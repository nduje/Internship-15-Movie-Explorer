import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Movies.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

const Movies = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [favorites, setFavorites] = useState([]);
    const searchRef = useRef(null);

    const { data, loading, error } = useFetch();

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const visibleMovies = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const lower = search.toLowerCase();

        let result = data.filter((movie) =>
            movie?.title?.toLowerCase().includes(lower),
        );

        switch (sortBy) {
            case "id":
                result = [...result].sort((a, b) => a.id - b.id);
                break;

            case "title-asc":
                result = [...result].sort((a, b) =>
                    a.title.localeCompare(b.title),
                );
                break;

            case "title-desc":
                result = [...result].sort((a, b) =>
                    b.title.localeCompare(a.title),
                );
                break;

            case "year-asc":
                result = [...result].sort((a, b) =>
                    a.year.localeCompare(b.year),
                );
                break;

            case "year-desc":
                result = [...result].sort((a, b) =>
                    b.year.localeCompare(a.year),
                );
                break;

            case "rating-asc":
                result = [...result].sort((a, b) =>
                    a.rating.localeCompare(b.rating),
                );
                break;

            case "rating-desc":
                result = [...result].sort((a, b) =>
                    b.rating.localeCompare(a.rating),
                );
                break;

            default:
                break;
        }

        return result;
    }, [data, search, sortBy]);

    const handleToggleFavorite = useCallback((id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id],
        );
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Movies List</h2>

            <div className={styles.filter_container}>
                <input
                    type="search"
                    ref={searchRef}
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchbar}
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.dropdown}
                >
                    <option value="id">Default</option>
                    <option value="title-asc">Title (Asc)</option>
                    <option value="title-desc">Title (Desc)</option>
                    <option value="year-asc">Year (Asc)</option>
                    <option value="year-desc">Year (Desc)</option>
                    <option value="rating-asc">Rating (Asc)</option>
                    <option value="rating-desc">Rating (Desc)</option>
                </select>
            </div>

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
                            isFavorite={favorites.includes(movie.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Movies;
