const filterMovies = (data, search, sortBy) => {
    if (!Array.isArray(data)) return [];

    const lower = search.toLowerCase();

    let result = data.filter((movie) =>
        movie?.title?.toLowerCase().includes(lower),
    );

    switch (sortBy) {
        case "id":
            return [...result].sort((a, b) => a.id - b.id);

        case "title-asc":
            return [...result].sort((a, b) => a.title.localeCompare(b.title));

        case "title-desc":
            return [...result].sort((a, b) => b.title.localeCompare(a.title));

        case "year-asc":
            return [...result].sort((a, b) => a.year.localeCompare(b.year));

        case "year-desc":
            return [...result].sort((a, b) => b.year.localeCompare(a.year));

        case "rating-asc":
            return [...result].sort((a, b) => a.rating.localeCompare(b.rating));

        case "rating-desc":
            return [...result].sort((a, b) => b.rating.localeCompare(a.rating));

        default:
            return result;
    }
};

export default filterMovies;
