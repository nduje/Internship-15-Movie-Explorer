import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Movies.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";
import filterMovies from "../../helpers/filterMovies";

const Movies = ({ favorites }) => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("id");

    const { data, loading, error } = useFetch();

    const visibleMovies = useMemo(() => {
        return filterMovies(data, search, sortBy);
    }, [data, search, sortBy]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Movies List</h2>
            <Filter
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
            />
            {visibleMovies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
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
                                isFavoriteView={false}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Movies;
