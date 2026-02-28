export const AppEndpoints = {
    popular: {
        url: '/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc',
        method: 'GET',
    },
    movieDetailsById: (id: string) => ({
        url: `/3/movie/${id}?language=en-US`,
        method: 'GET',
    }),
    movieCastByMovieId: (movieId: string) => ({
        url: `/3/movie/${movieId}/credits`,
        method: 'GET',
    }),
    nowPlayingMovie: (page: number = 1) => ({
        url: `/3/movie/now_playing?language=en-US&page=${page}`,
        method: 'GET',
    }),
    upcomingMovie: (page: number = 1) => ({
        url: `/3/movie/upcoming?language=en-US&page=${page}`,
        method: 'GET',
    }),
    searchContent: (query: string, page: number = 1) => ({
        url: `/3/search/multi?query=${query}&include_adult=true&language=en-US&page=${page}`,
        method: 'GET',
    }),
}
