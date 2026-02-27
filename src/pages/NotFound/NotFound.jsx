import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>
                404
                <br />
                ERROR
            </h1>
            <div className={styles.quote}>
                <h2 className={styles.quote_text}>
                    Always remember, Frodo, the page is trying to get back to
                    its master. It wants to be found.
                </h2>
                <p className={styles.quote_signature}>
                    Gandalf,{" "}
                    <NavLink to="/movies/11" className={styles.quote_link}>
                        The Lord of the Rings: The Fellowship of the Ring (2001)
                    </NavLink>
                </p>
            </div>
            <NavLink to="/" className={styles.button}>
                Go to the homepage
            </NavLink>
        </section>
    );
};

export default NotFound;
