import styles from "./MovieCard.module.css";

const MovieCard = ({
    id,
    poster,
    title,
    year,
    rating,
    favorite,
    isFavoriteView,
    refetch,
}) => {
    const token = localStorage.getItem("token");

    const isFavorite = !!favorite;

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await fetch(
                `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/favorite`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ movieId: id }),
                },
            );

            if (!response.ok) throw new Error("Failed to remove favorite");

            refetch();
        } catch (err) {
            console.error(err);
            alert("Could not remove favorite");
        }
    };

    const cardClassName = [styles.container, isFavorite ? styles.favorite : ""]
        .filter(Boolean)
        .join(" ");

    const starClassName = [
        styles.favorite_icon,
        isFavorite ? "" : styles.hidden,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <article className={cardClassName}>
            <div className={styles.info_container}>
                <img src={poster} alt={title} className={styles.poster} />
                <p className={styles.title}>{title}</p>
                <p className={styles.year}>({year})</p>
                <p className={styles.rating}>{rating}/10</p>
            </div>
            <img
                src="/src/assets/icons/star.svg"
                alt="favorite"
                className={starClassName}
            />
            {isFavoriteView && (
                <button className={styles.button} onClick={handleClick}>
                    Unfavorite
                </button>
            )}
        </article>
    );
};

export default MovieCard;
