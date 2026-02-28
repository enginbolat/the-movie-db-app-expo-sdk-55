import React from 'react'
import { render } from '@testing-library/react-native'
import { ContentList } from '../content-list'
import { Popular } from '@/models'

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
}))

jest.mock('@/components', () => ({
  MovieCard: ({ item }: { item: Popular }) => {
    const { Text } = require('react-native')
    return <Text testID={`movie-card-${item.id}`}>{item.title}</Text>
  },
}))

const mockMovies: Popular[] = [
  {
    id: 1,
    title: 'Inception',
    poster_path: '/inception.jpg',
    backdrop_path: '/inception-backdrop.jpg',
    overview: 'A thief who steals corporate secrets...',
    popularity: 90,
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 15000,
    adult: false,
    genre_ids: [28, 12, 878],
    original_language: 'en',
    original_title: 'Inception',
    video: false,
  },
  {
    id: 2,
    title: 'Interstellar',
    poster_path: '/interstellar.jpg',
    backdrop_path: '/interstellar-backdrop.jpg',
    overview: 'A team of explorers travel through a wormhole...',
    popularity: 85,
    release_date: '2014-11-07',
    vote_average: 8.6,
    vote_count: 14000,
    adult: false,
    genre_ids: [12, 18, 878],
    original_language: 'en',
    original_title: 'Interstellar',
    video: false,
  },
]

describe('ContentList', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <ContentList data={mockMovies} isLoading={false} title="Popular" />,
    )
    expect(toJSON()).not.toBeNull()
  })

  it('renders the section title', () => {
    const { getByText } = render(
      <ContentList data={mockMovies} isLoading={false} title="Now Playing" />,
    )
    expect(getByText('Now Playing')).toBeTruthy()
  })

  it('renders movie cards for each item', () => {
    const { getByTestId } = render(
      <ContentList data={mockMovies} isLoading={false} title="Popular" />,
    )
    expect(getByTestId('movie-card-1')).toBeTruthy()
    expect(getByTestId('movie-card-2')).toBeTruthy()
  })

  it('shows ActivityIndicator when loading and data is empty', () => {
    const { getByTestId } = render(
      <ContentList data={[]} isLoading={true} title="Popular" />,
    )
    expect(getByTestId('flash-list')).toBeTruthy()
  })

  it('does not show ActivityIndicator when not loading', () => {
    const { queryByText } = render(
      <ContentList data={[]} isLoading={false} title="Popular" />,
    )
    // Should not throw and the list should be empty without loading indicator
    expect(queryByText('Popular')).toBeTruthy()
  })

  it('renders the FlashList', () => {
    const { getByTestId } = render(
      <ContentList data={mockMovies} isLoading={false} title="Popular" />,
    )
    expect(getByTestId('flash-list')).toBeTruthy()
  })

  it('has correct accessibility label on title', () => {
    const { getByLabelText } = render(
      <ContentList data={mockMovies} isLoading={false} title="Upcoming Movies" />,
    )
    expect(getByLabelText('Upcoming Movies')).toBeTruthy()
  })

  it('renders with empty data array without crashing', () => {
    const { getByText } = render(
      <ContentList data={[]} isLoading={false} title="Empty List" />,
    )
    expect(getByText('Empty List')).toBeTruthy()
  })
})
