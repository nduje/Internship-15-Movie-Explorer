import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./MovieDetail.module.css";
import { jwtDecode } from "jwt-decode";

const MovieDetail = () => {
    const id = Number(useParams().id);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const isLoggedIn = !!token;

    const currentUserId = token ? jwtDecode(token).id : null;

    const {
        data: movie,
        loading,
        error,
        refetch,
    } = useFetch(
        `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/movie/${id}`,
    );

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const method = movie?.favorite.some(
                (fav) => fav.userId === currentUserId,
            )
                ? "DELETE"
                : "POST";

            const response = await fetch(
                `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/favorite`,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ movieId: id }),
                },
            );

            if (!response.ok) {
                throw new Error(
                    movie?.favorite
                        ? "Failed to remove favorite"
                        : "Failed to add favorite",
                );
            }

            refetch();
        } catch (err) {
            console.error(err);
            alert("Could not update favorite");
        }
    };

    if (!id) return <p>No movie ID provided.</p>;
    if (loading) return <p>Loading...</p>;
    if (error || !movie) return <p>{error || "Movie not found"}</p>;

    const isFavorite = movie.favorite.some(
        (fav) => fav.userId === currentUserId,
    );

    return (
        <section className={styles.container}>
            {isLoggedIn && (
                <button className={styles.button} onClick={handleClick}>
                    {isFavorite ? "Unfavorite" : "Favorite"}
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
                    <strong>Genre:</strong>{" "}
                    {movie.genres?.map((g) => g.name).join(", ")}
                </p>
                <p className={styles.detail}>
                    <strong>Director:</strong> {movie.director}
                </p>
                <p className={styles.detail}>
                    <strong>Actors:</strong> {movie.actors?.join(", ")}
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
