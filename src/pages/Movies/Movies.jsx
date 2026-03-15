import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Movies.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";
import filterMovies from "../../helpers/filterMovies";

const Movies = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [genre, setGenre] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        const urlSort = searchParams.get("sortBy") || "";
        const urlGenre = searchParams.get("genre") || "";

        setSearch(urlSearch);
        setSortBy(urlSort);
        setGenre(urlGenre);
    }, []);

    const url = useMemo(() => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (genre) params.append("genre", genre);

        return `http://localhost:3001/movie?${params.toString()}`;
    }, [search, sortBy, genre]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (genre) params.append("genre", genre);

        setSearchParams(params);
    }, [search, sortBy, genre]);

    const { data, loading, error, refetch } = useFetch(url);

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
                genre={genre}
                setGenre={setGenre}
                loading={loading}
            />
            {data.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <div className={styles.movies_container}>
                    {data.map((movie) => (
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
                                isFavoriteView={false}
                                refetch={refetch}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Movies;
