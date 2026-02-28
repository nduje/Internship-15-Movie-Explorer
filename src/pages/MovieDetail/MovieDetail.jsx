import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./MovieDetail.module.css";

const MovieDetail = ({ favorites, setFavorites }) => {
    const id = Number(useParams().id);
    const navigate = useNavigate();

    const { data: movie, loading, error } = useFetch(id ? id : null);

    const handleToggleFavorite = useCallback((id) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((favId) => favId !== id)
                : [...prev, id],
        );
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite?.(id);
    };

    if (!id) return <p>No movie ID provided.</p>;
    if (loading) return <p>Loading...</p>;
    if (error || !movie) return <p>{error}</p>;

    return (
        <section className={styles.container}>
            {handleToggleFavorite && (
                <button className={styles.button} onClick={handleClick}>
                    {favorites.includes(id) ? "Unfavorite" : "Favorite"}
                </button>
            )}
            <div className={styles.poster_container}>
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className={styles.poster}
                />
            </div>
            <div className={styles.info_container}>
                <h2 className={styles.title}>
                    {movie.title} ({movie.year})
                </h2>
                <p className={styles.detail}>
                    <strong>Rating:</strong> {movie.rating}/10
                </p>
                <p className={styles.detail}>
                    <strong>Genre:</strong> {movie.genre}
                </p>
                <p className={styles.detail}>
                    <strong>Director:</strong> {movie.director}
                </p>
                <p className={styles.detail}>
                    <strong>Actors:</strong> {movie.actors}
                </p>
                <p className={styles.detail}>
                    <strong>Plot:</strong> {movie.plot}
                </p>
            </div>
            <div onClick={() => navigate(-1)} className={styles.link_nav}>
                ← Go back to previous page
            </div>
        </section>
    );
};

export default MovieDetail;
