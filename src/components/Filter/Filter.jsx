import { useEffect, useRef } from "react";
import styles from "./Filter.module.css";

const Filter = ({ search, setSearch, sortBy, setSortBy, loading }) => {
    const searchRef = useRef(null);

    useEffect(() => {
        if (!loading) {
            searchRef.current?.focus();
        }
    }, [loading]);

    return (
        <div className={styles.container}>
            <input
                type="search"
                ref={searchRef}
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchbar}
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.dropdown}
            >
                <option value="id">Default</option>
                <option value="title-asc">Title (Asc)</option>
                <option value="title-desc">Title (Desc)</option>
                <option value="year-asc">Year (Asc)</option>
                <option value="year-desc">Year (Desc)</option>
                <option value="rating-asc">Rating (Asc)</option>
                <option value="rating-desc">Rating (Desc)</option>
            </select>
        </div>
    );
};

export default Filter;
