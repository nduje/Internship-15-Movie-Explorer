import { useEffect, useState } from "react";
import movies from "../data/movies";

const useFetch = (id = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            setTimeout(() => {
                try {
                    if (!id) {
                        setData(movies);
                        setError(null);
                        return;
                    }

                    const movie = movies.find(
                        (m) => String(m.id) === String(id),
                    );

                    if (!movie) {
                        throw new Error("Movie not found");
                    }

                    setData(movie);
                    setError(null);
                } catch (err) {
                    setError(`${err}`);
                    setData(null);
                } finally {
                    setLoading(false);
                }
            }, 600);
        };

        fetchData();
    }, [id]);

    return { data, loading, error };
};

export default useFetch;
