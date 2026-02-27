import { useEffect, useState } from "react";
import movies from "../data/movies";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            setTimeout(() => {
                try {
                    setData(movies);
                    setError(null);
                } catch (err) {
                    setError("Failed to load movies");
                } finally {
                    setLoading(false);
                }
            }, 600);
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetch;
