import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                Welcome to the{" "}
                <strong className={styles.highlight}>Movies Explorer</strong>
            </h2>
            <p className={styles.description}>
                Explore, search, and sort through a vast collection of movies.
                Discover new favorites, track your top picks, and enjoy detailed
                information for every film.
            </p>
            <div className={styles.buttons_container}>
                <Link to="/movies" className={styles.button}>
                    Movies
                </Link>
                <Link to="/favorites" className={styles.button}>
                    Favorites
                </Link>
            </div>
        </section>
    );
};

export default Home;
