import { useMemo } from "react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ id, poster, title, year, rating, favorites }) => {
    const isFavorite = useMemo(() => {
        return favorites.includes(id);
    }, [favorites, id]);

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
        </article>
    );
};

export default MovieCard;
