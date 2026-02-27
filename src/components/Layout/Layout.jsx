import { Link, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.link}>
                    <h1 className={styles.title}>Movies Explorer</h1>
                </Link>
                <nav className={styles.nav}>
                    <NavLink to="/" className={styles.navLink}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={styles.navLink}>
                        Movies
                    </NavLink>
                    <NavLink to="/favorites" className={styles.navLink}>
                        Favorites
                    </NavLink>
                </nav>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
