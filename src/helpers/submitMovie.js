export const handleChangeInput = (e, form, setForm) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value,
    });
};

export const addActor = (actorInput, actors) => {
    const value = actorInput.trim();
    if (!value || actors.includes(value)) return actors;
    return [...actors, value];
};

export const handleActorKeyDown = (e, actorInput, actors) => {
    if (e.key !== "Enter") return actors;
    e.preventDefault();
    return addActor(actorInput, actors);
};

export const removeActorByIndex = (index, actors) => {
    return actors.filter((_, i) => i !== index);
};

export const addGenre = (selectedGenre, genres) => {
    const genreId = Number(selectedGenre);
    if (!genreId || genres.includes(genreId)) return genres;
    return [...genres, genreId];
};

export const removeGenreById = (id, genres) => {
    return genres.filter((g) => g !== id);
};

export const getGenreName = (id, allGenres) => {
    return allGenres.find((g) => g.id === id)?.name || "Unknown";
};

export const handleRatingChange = (value) => {
    if (value === "") return "";
    return Math.min(10, Math.max(0, Number(value)));
};

export const validateBeforeSubmit = (form) => {
    if (form.genres.length === 0) {
        alert("You must add at least one genre");
        return false;
    }
    if (form.actors.length === 0) {
        alert("You must add at least one actor");
        return false;
    }
    return true;
};
