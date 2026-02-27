import styles from "./MovieCard.module.css";

const MovieCard = ({
    id,
    poster,
    title,
    year,
    rating,
    isFavorite,
    onToggleFavorite,
}) => {
    const cardClassName = [styles.container, isFavorite ? styles.favorite : ""]
        .filter(Boolean)
        .join(" ");

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite?.(id);
    };

    return (
        <article className={cardClassName}>
            <div className={styles.info_container}>
                <img src={poster} alt={title} className={styles.poster} />
                <p className={styles.title}>{title}</p>
                <p className={styles.year}>({year})</p>
                <p className={styles.rating}>{rating}/10</p>
            </div>
            {onToggleFavorite && (
                <button className={styles.button} onClick={handleClick}>
                    {isFavorite ? "Unfavorite" : "Favorite"}
                </button>
            )}
        </article>
    );
};

export default MovieCard;
