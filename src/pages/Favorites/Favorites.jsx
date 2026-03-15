import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Favorites.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const Favorites = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [genre, setGenre] = useState("");

    const { data, loading, error, refetch } = useFetch(
        "http://localhost:3001/favorite",
    );

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
                genre={genre}
                setGenre={setGenre}
                loading={loading}
            />
            {data.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <div className={styles.movies_container}>
                    {data.map((fav) => {
                        const movie = fav.movie;
                        return (
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
                                    favorite={movie.favorite}
                                    isFavoriteView={true}
                                    refetch={refetch}
                                />
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Favorites;
