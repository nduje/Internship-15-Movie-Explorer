import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Manage.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";
import { jwtDecode } from "jwt-decode";

const Manage = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [genre, setGenre] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const token = localStorage.getItem("token");

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

        return `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/movie?${params.toString()}`;
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?"))
            return;

        const response = await fetch(
            `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/movie/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (response.status === 401) {
            alert("You are not authorized to delete this movie.");
            return;
        }

        if (!response.ok) {
            alert("Failed to delete movie.");
            return;
        }

        refetch();
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Manage Movies</h2>
            <Link
                to="/manage/add"
                className={`${styles.add_button} ${styles.button}`}
            >
                Add New Movie
            </Link>
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
                        <div key={movie.id} className={styles.movie_card}>
                            <h1 className={styles.movie_title}>
                                {movie.title} ({movie.year})
                            </h1>
                            <div className={styles.buttons_container}>
                                <Link
                                    to={`/manage/edit/${movie.id}`}
                                    className={`${styles.edit_button} ${styles.button}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    className={`${styles.delete_button} ${styles.button}`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Manage;
