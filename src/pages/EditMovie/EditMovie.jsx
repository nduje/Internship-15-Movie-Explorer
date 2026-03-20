import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditMovie.module.css";
import {
    handleChangeInput,
    addActor,
    handleActorKeyDown,
    removeActorByIndex,
    addGenre,
    removeGenreById,
    handleRatingChange,
    validateBeforeSubmit,
    getGenreName,
} from "../../helpers/submitMovie";

const EditMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

        fetch(`http://localhost:3001/movie/${id}`)
            .then((res) => res.json())
            .then((movie) => {
                setForm({
                    title: movie.title || "",
                    poster: movie.poster || "",
                    rating: movie.rating || "",
                    year: movie.year || "",
                    director: movie.director || "",
                    actors: movie.actors || [],
                    plot: movie.plot || "",
                    genres: movie.genres?.map((g) => g.id) || [],
                });
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => handleChangeInput(e, form, setForm);

    const handleAddActorClick = () => {
        setForm((prev) => ({
            ...prev,
            actors: addActor(actorInput, prev.actors),
        }));
        setActorInput("");
    };

    const handleActorKey = (e) => {
        setForm((prev) => ({
            ...prev,
            actors: handleActorKeyDown(e, actorInput, prev.actors),
        }));
        if (e.key === "Enter") setActorInput("");
    };

    const removeActor = (index) =>
        setForm((prev) => ({
            ...prev,
            actors: removeActorByIndex(index, prev.actors),
        }));

    const handleAddGenreClick = () => {
        setForm((prev) => ({
            ...prev,
            genres: addGenre(selectedGenre, prev.genres),
        }));
        setSelectedGenre("");
    };

    const removeGenre = (id) =>
        setForm((prev) => ({
            ...prev,
            genres: removeGenreById(id, prev.genres),
        }));

    const handleRating = (e) =>
        setForm((prev) => ({
            ...prev,
            rating: handleRatingChange(e.target.value),
        }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateBeforeSubmit(form)) return;
        submitMovie();
    };

    const submitMovie = async () => {
        setLoading(true);

        const payload = {
            ...form,
            poster:
                form.poster || "/src/assets/images/posters/placeholder.webp",
            rating: Number(form.rating),
            year: Number(form.year),
            actors: form.actors,
        };

        try {
            const res = await fetch(`http://localhost:3001/movie/${id}`, {
                method: "PATCH",
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

            if (!res.ok) throw new Error("Failed to update movie");

            navigate("/manage");
        } catch (err) {
            console.error(err);
            alert("Error updating movie");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit Movie</h2>

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
                        onChange={handleRating}
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
                            onClick={handleAddGenreClick}
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
                                {getGenreName(genreId, allGenres)} ✕
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
                            onKeyDown={handleActorKey}
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={handleAddActorClick}
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
                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.button}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
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

export default EditMovie;
