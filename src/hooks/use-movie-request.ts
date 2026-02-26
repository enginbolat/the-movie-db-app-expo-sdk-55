
import { AppEndpoints } from '../constants/endpoints';
import { CastRoot, MovieDetails, NowPlayingRoot, RootPopular } from '../models/index';
import { api } from '../store/slice/request';

export const movieApi = api.injectEndpoints({
  endpoints: build => ({
    getPopularContent: build.query<RootPopular, void>({
      query: () => ({
        url: AppEndpoints.popular.url,
        method: AppEndpoints.popular.method,
      }),
    }),
    movieDetailsById: build.query<MovieDetails, string>({
      query: id => ({
        url: AppEndpoints.movieDetailsById(id).url,
        method: AppEndpoints.movieDetailsById(id).method,
      }),
    }),
    movieCastByMovieId: build.query<CastRoot, string>({
      query: movieId => ({
        url: AppEndpoints.movieCastByMovieId(movieId).url,
        method: AppEndpoints.movieCastByMovieId(movieId).method,
      }),
    }),
    nowPlayingMovie: build.query<NowPlayingRoot, number>({
      query: page => ({
        url: AppEndpoints.nowPlayingMovie(page).url,
        method: AppEndpoints.nowPlayingMovie(page).method,
      }),
    }),
    upcomingMovie: build.query<NowPlayingRoot, number>({
      query: page => ({
        url: AppEndpoints.upcomingMovie(page).url,
        method: AppEndpoints.upcomingMovie(page).method,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPopularContentQuery,
  useMovieDetailsByIdQuery,
  useMovieCastByMovieIdQuery,
  useNowPlayingMovieQuery,
  useUpcomingMovieQuery,
} = movieApi;
