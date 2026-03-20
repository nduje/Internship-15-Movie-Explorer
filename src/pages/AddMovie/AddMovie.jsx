import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddMovie.module.css";

const AddMovie = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        title: "",
        poster: "",
        rating: "",
        year: "",
        director: "",
        actors: [],
        plot: "",
        genres: [],
    });

    const [actorInput, setActorInput] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [allGenres, setAllGenres] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/genre")
            .then((res) => res.json())
            .then((data) => setAllGenres(data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddActor = () => {
        const value = actorInput.trim();
        if (!value) return;

        if (form.actors.includes(value)) {
            setActorInput("");
            return;
        }

        setForm((prev) => ({
            ...prev,
            actors: [...prev.actors, value],
        }));

        setActorInput("");
    };

    const handleActorKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const value = actorInput.trim();
            if (!value) return;

            if (form.actors.includes(value)) {
                setActorInput("");
                return;
            }

            setForm((prev) => ({
                ...prev,
                actors: [...prev.actors, value],
            }));

            setActorInput("");
        }
    };

    const removeActor = (index) => {
        setForm((prev) => ({
            ...prev,
            actors: prev.actors.filter((_, i) => i !== index),
        }));
    };

    const handleAddGenre = () => {
        if (!selectedGenre) return;

        const genreId = Number(selectedGenre);

        if (form.genres.includes(genreId)) {
            setSelectedGenre("");
            return;
        }

        setForm((prev) => ({
            ...prev,
            genres: [...prev.genres, genreId],
        }));

        setSelectedGenre("");
    };

    const handleRating = (e) => {
        let val = e.target.value;

        if (val === "") {
            setForm((prev) => ({ ...prev, rating: "" }));
            return;
        }

        val = Math.min(10, Math.max(0, Number(val)));

        setForm((prev) => ({
            ...prev,
            rating: val,
        }));
    };

    const removeGenre = (id) => {
        setForm((prev) => ({
            ...prev,
            genres: prev.genres.filter((g) => g !== id),
        }));
    };

    const getGenreName = (id) => {
        return allGenres.find((g) => g.id === id)?.name || "Unknown";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.genres.length === 0) {
            alert("You must add at least one genre");
            return;
        }

        if (form.actors.length === 0) {
            alert("You must add at least one actor");
            return;
        }

        setLoading(true);

        const payload = {
            ...form,
            poster: "/src/assets/images/posters/placeholder.webp",
            rating: Number(form.rating),
            year: Number(form.year),
            actors: form.actors,
        };

        try {
            const res = await fetch("http://localhost:3001/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.status === 401) {
                alert("Unauthorized");
                return;
            }

            if (!res.ok) throw new Error("Failed to create movie");

            navigate("/manage");
        } catch (err) {
            console.error(err);
            alert("Error creating movie");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add Movie</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <label className={styles.label}>Title</label>

                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Year</label>
                    <select
                        value={form.year}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                year: e.target.value,
                            }))
                        }
                        required
                        className={styles.dropdown}
                    >
                        <option value="">Select year</option>
                        {Array.from(
                            { length: new Date().getFullYear() - 1900 + 1 },
                            (_, i) => new Date().getFullYear() - i,
                        ).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Rating</label>

                    <div className={styles.stars}>
                        {Array.from({ length: 10 }, (_, i) => {
                            const value = i + 1;
                            return (
                                <span
                                    key={value}
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            rating: value,
                                        }))
                                    }
                                    style={{
                                        color:
                                            Number(form.rating) >= value
                                                ? "#deb522"
                                                : "#cccccc",
                                    }}
                                    className={styles.star}
                                >
                                    ★
                                </span>
                            );
                        })}
                    </div>

                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={form.rating}
                        onChange={(e) => handleRating(e)}
                        placeholder="e.g. 7.5"
                        className={styles.input}
                    />
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Genres</label>

                    <div className={styles.genre_input_container}>
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="">Select genre</option>
                            {allGenres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={handleAddGenre}
                            className={styles.button}
                        >
                            Add
                        </button>
                    </div>

                    <div className={styles.genres_list}>
                        {form.genres.map((genreId) => (
                            <span
                                key={genreId}
                                onClick={() => removeGenre(genreId)}
                                title="Click to remove"
                                className={styles.genre_tag}
                            >
                                {getGenreName(genreId)} ✕
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Director</label>

                    <input
                        name="director"
                        placeholder="Director"
                        value={form.director}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Actors</label>
                    <div className={styles.actor_input_container}>
                        <input
                            placeholder="Actor"
                            value={actorInput}
                            onChange={(e) => setActorInput(e.target.value)}
                            onKeyDown={handleActorKeyDown}
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={handleAddActor}
                            className={styles.button}
                        >
                            Add
                        </button>
                    </div>

                    <div className={styles.actors_list}>
                        {form.actors.map((actor, index) => (
                            <span
                                key={index}
                                onClick={() => removeActor(index)}
                                title="Click to remove"
                                className={styles.actor_tag}
                            >
                                {actor} ✕
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.input_container}>
                    <label className={styles.label}>Plot</label>

                    <textarea
                        name="plot"
                        placeholder="Plot"
                        value={form.plot}
                        onChange={handleChange}
                        required
                        className={`${styles.input} ${styles.plot}`}
                    />
                </div>

                <div className={styles.button_container}>
                    {" "}
                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.button}
                    >
                        {loading ? "Adding..." : "Add Movie"}
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className={styles.button}
                    >
                        Go back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMovie;
