import { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.css";
import useFetch from "../../hooks/useFetch";

const Filter = ({
    search,
    setSearch,
    sortBy,
    setSortBy,
    genre,
    setGenre,
    loading,
}) => {
    const searchRef = useRef(null);
    const [localSearch, setLocalSearch] = useState(search);

    const {
        data,
        loading: genresLoading,
        error: genresError,
    } = useFetch(
        `http://localhost:${import.meta.env.VITE_API_PORT || 3000}/genre`,
    );

    const genres = Array.isArray(data) ? data : [];

    useEffect(() => {
        if (!loading) {
            searchRef.current?.focus();
        }
    }, [loading]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(localSearch);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [localSearch, setSearch]);

    return (
        <div className={styles.container}>
            <input
                type="search"
                ref={searchRef}
                placeholder="Search movies..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={styles.searchbar}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.dropdown}
            >
                <option value="">Default</option>
                <option value="title-asc">Title (Asc)</option>
                <option value="title-desc">Title (Desc)</option>
                <option value="year-asc">Year (Asc)</option>
                <option value="year-desc">Year (Desc)</option>
                <option value="rating-asc">Rating (Asc)</option>
                <option value="rating-desc">Rating (Desc)</option>
            </select>

            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={styles.dropdown}
                disabled={genresLoading || !!genresError}
            >
                <option value="">All Genres</option>
                {genres.map((g) => (
                    <option key={g.name} value={g.name}>
                        {g.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
