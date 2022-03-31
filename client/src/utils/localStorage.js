export const getSavedAnimeIds = () => {
    const savedAnimeIds = localStorage.getItem('saved_animes')
    ? JSON.parse(localStorage.getItem('saved_animes'))
    : [];

    return savedAnimeIds;
};

export const saveAnimeIds = (animeIdArr) => {
    if (animeIdArr.length) {
        localStorage.setItem('saved_animes', JSON.stringify(animeIdArr));
    } else {
        localStorage.removeItem('saved_animes');
    }
};

export const removeAnimeId = (animeId) => {
    const savedAnimeIds = localStorage.getItem('saved_animes')
        ? JSON.parse(localStorage.getItem('saved_animes'))
        : null;

    if (!savedAnimeIds) {
        return false;
    }

    const updatedSavedAnimeIds = savedAnimeIds?.filter((savedAnimeId) => savedAnimeId !== animeId);
    localStorage.setItem('saved_animes', JSON.stringify(updatedSavedAnimeIds));

    return true;
};