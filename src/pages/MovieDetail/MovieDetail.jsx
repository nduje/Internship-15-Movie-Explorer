import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./MovieDetail.module.css";

const MovieDetail = () => {
    const { id } = useParams();

    const { data: movie, loading, error } = useFetch(id ? id : null);

    if (!id) return <p>No movie ID provided.</p>;
    if (loading) return <p>Loading</p>;
    if (error || !movie) return <p>{error}</p>;

    return (
        <section className={styles.container}>
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
            <Link to="/movies" className={styles.link_nav}>
                ← Go back to previous page
            </Link>
        </section>
    );
};

export default MovieDetail;
