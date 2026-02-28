const toggleFavorite = (favorites, id) => {
    return favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id];
};

export default toggleFavorite;
