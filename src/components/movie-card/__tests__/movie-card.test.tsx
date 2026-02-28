import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { MovieCard } from '../movie-card'
import { Popular } from '@/models'

jest.mock('@/utils/image-helper', () => ({
  handleImageUrl: (path: string) => `https://image.tmdb.org/t/p/w500${path}`,
}))

const mockMovie: Popular = {
  id: 1,
  title: 'The Dark Knight',
  poster_path: '/dark-knight.jpg',
  backdrop_path: '/dark-knight-backdrop.jpg',
  overview: 'When the menace known as the Joker wreaks havoc...',
  popularity: 95.5,
  release_date: '2008-07-18',
  vote_average: 9.0,
  vote_count: 20000,
  adult: false,
  genre_ids: [28, 80, 18],
  original_language: 'en',
  original_title: 'The Dark Knight',
  video: false,
}

const mockMovieNoPoster: Popular = {
  ...mockMovie,
  id: 2,
  title: 'No Poster Movie',
  poster_path: '',
}

describe('MovieCard', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    mockOnPress.mockClear()
  })

  it('renders without crashing', () => {
    const { toJSON } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    expect(toJSON()).not.toBeNull()
  })

  it('renders the movie title', () => {
    const { getByText } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    expect(getByText('The Dark Knight')).toBeTruthy()
  })

  it('renders an image when poster_path is provided', () => {
    const { getByTestId } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    expect(getByTestId('expo-image')).toBeTruthy()
  })

  it('renders a placeholder view when poster_path is empty', () => {
    const { queryByTestId } = render(<MovieCard item={mockMovieNoPoster} onPress={mockOnPress} />)
    expect(queryByTestId('expo-image')).toBeNull()
  })

  it('calls onPress when the card is pressed', () => {
    const { getByRole } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    const button = getByRole('button')
    fireEvent.press(button)
    expect(mockOnPress).toHaveBeenCalledWith(mockMovie)
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility label on the button', () => {
    const { getByRole } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    const button = getByRole('button')
    expect(button.props.accessibilityLabel).toBe('View The Dark Knight details')
  })

  it('has correct accessibility label on the image', () => {
    const { getByLabelText } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    expect(getByLabelText('The Dark Knight poster')).toBeTruthy()
  })

  it('renders a link with the correct movie id', () => {
    const { getByTestId } = render(<MovieCard item={mockMovie} onPress={mockOnPress} />)
    expect(getByTestId('link-/movie/1')).toBeTruthy()
  })
})
