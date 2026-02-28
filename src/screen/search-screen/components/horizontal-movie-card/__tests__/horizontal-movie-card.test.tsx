import React from 'react'
import { render } from '@testing-library/react-native'
import HorizontalMovieCard from '../horizontal-movie-card'
import { MutlSearch } from '@/models/multi-search'

jest.mock('@/utils/image-helper', () => ({
  handleImageUrl: (path: string) => `https://image.tmdb.org/t/p/w500${path}`,
}))

const mockMovieItem: MutlSearch = {
  id: 100,
  title: 'Avengers',
  original_title: 'Avengers: Endgame',
  original_name: undefined,
  backdrop_path: '/avengers-backdrop.jpg',
  poster_path: '/avengers-poster.jpg',
  overview: 'After the devastating events of Infinity War...',
  adult: false,
  original_language: 'en',
  genre_ids: [28, 12, 878],
  popularity: 99.9,
  release_date: '2019-04-26',
  vote_average: 8.4,
  vote_count: 22000,
  media_type: 'movie',
  video: false,
}

const mockTVItem: MutlSearch = {
  id: 200,
  name: 'Breaking Bad',
  original_name: 'Breaking Bad',
  original_title: undefined,
  title: undefined,
  backdrop_path: '/breaking-bad-backdrop.jpg',
  poster_path: '/breaking-bad-poster.jpg',
  overview: "A chemistry teacher's transformation...",
  adult: false,
  original_language: 'en',
  genre_ids: [18, 80],
  popularity: 88.5,
  vote_average: 9.5,
  vote_count: 18000,
  media_type: 'tv',
  first_air_date: '2008-01-20',
  origin_country: ['US'],
}

const mockNoImageItem: MutlSearch = {
  ...mockMovieItem,
  id: 300,
  backdrop_path: undefined,
}

describe('HorizontalMovieCard', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(toJSON()).not.toBeNull()
  })

  it('renders the movie title via original_title', () => {
    const { getByText } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(getByText('Avengers: Endgame')).toBeTruthy()
  })

  it('renders the TV show name via original_name', () => {
    const { getByText } = render(<HorizontalMovieCard item={mockTVItem} />)
    expect(getByText('Breaking Bad')).toBeTruthy()
  })

  it('renders an image when backdrop_path is provided', () => {
    const { getByTestId } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(getByTestId('expo-image')).toBeTruthy()
  })

  it('renders a placeholder view when backdrop_path is missing', () => {
    const { queryByTestId } = render(<HorizontalMovieCard item={mockNoImageItem} />)
    expect(queryByTestId('expo-image')).toBeNull()
  })

  it('has correct accessibility role on the pressable', () => {
    const { getByRole } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(getByRole('button')).toBeTruthy()
  })

  it('has correct accessibility label on the pressable', () => {
    const { getByRole } = render(<HorizontalMovieCard item={mockMovieItem} />)
    const button = getByRole('button')
    expect(button.props.accessibilityLabel).toBe('View Avengers: Endgame details')
  })

  it('renders a link to the correct movie id', () => {
    const { getByTestId } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(getByTestId('link-/movie/100')).toBeTruthy()
  })

  it('has image accessibility label', () => {
    const { getByLabelText } = render(<HorizontalMovieCard item={mockMovieItem} />)
    expect(getByLabelText('Avengers poster')).toBeTruthy()
  })
})
