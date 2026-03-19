import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/user/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                },
            );

            const json = await response.json();

            if (json?.token) {
                localStorage.setItem("token", json.token);
                navigate("/");
            } else {
                setError(json?.message || "Registration failed");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>
                <strong className={styles.highlight}>Register</strong> new
                Account
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
            </form>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttons_container}>
                <button
                    onClick={handleSubmit}
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <button onClick={() => navigate(-1)} className={styles.button}>
                    Go back
                </button>
            </div>
        </section>
    );
};

export default Register;
