import { AppEndpoints } from '@/constants/endpoints';
import { CastRoot, MovieDetails, NowPlayingRoot, RootPopular } from '@/models/index';
import { MutlSearchRoot } from '@/models/multi-search';
import { api } from '@/store/slice/request';

type SearchContentSearchType = {
  page: number,
  searchTerm: string
}

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
    searchContent: build.query<MutlSearchRoot, SearchContentSearchType>({
      query: ({ page, searchTerm }) => ({
        url: AppEndpoints.searchContent(searchTerm, page).url,
        method: AppEndpoints.searchContent(searchTerm, page).method,
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.searchTerm,
      merge: (currentCache, newItems) => {
        if (newItems.page === 1) {
          currentCache.results = newItems.results;
        } else {
          currentCache.results.push(...newItems.results);
        }
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    })
  }),
  overrideExisting: false,
});

export const {
  useGetPopularContentQuery,
  useMovieDetailsByIdQuery,
  useMovieCastByMovieIdQuery,
  useNowPlayingMovieQuery,
  useUpcomingMovieQuery,
  useSearchContentQuery
} = movieApi;
