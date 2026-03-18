import { Link } from "react-router-dom";
import styles from "./Account.module.css";

const Account = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                Manage Your{" "}
                <strong className={styles.highlight}>Account</strong>
            </h2>
            <p className={styles.description}>
                {!isLoggedIn
                    ? "Access your account to manage your favorites and explore more features. If you already have an account, log in. If not, register to get started."
                    : "If you want to log in with a different account, please log out first."}
            </p>
            <div className={styles.buttons_container}>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className={styles.button}>
                            Login
                        </Link>
                        <Link to="/register" className={styles.button}>
                            Register
                        </Link>
                    </>
                ) : (
                    <button className={styles.button}>Logout</button>
                )}
            </div>
        </section>
    );
};

export default Account;
