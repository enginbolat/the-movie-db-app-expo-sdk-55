import React from 'react'
import { render } from '@testing-library/react-native'
import HorizontalList from '../horizontal-list'
import { Cast } from '@/models'

jest.mock('@/components/spacer/spacer', () => {
  const { View } = require('react-native')
  return ({ right }: { right?: number }) => <View testID={`spacer-${right ?? 0}`} />
})

const mockCastData: Cast[] = [
  {
    id: 1,
    name: 'Christian Bale',
    original_name: 'Christian Bale',
    character: 'Bruce Wayne',
    profile_path: '/bale.jpg',
    adult: false,
    gender: 2,
    known_for_department: 'Acting',
    popularity: 15.5,
    cast_id: 1,
    credit_id: 'abc123',
    order: 0,
  },
  {
    id: 2,
    name: 'Heath Ledger',
    original_name: 'Heath Ledger',
    character: 'The Joker',
    profile_path: null as unknown as string,
    adult: false,
    gender: 2,
    known_for_department: 'Acting',
    popularity: 12.3,
    cast_id: 2,
    credit_id: 'def456',
    order: 1,
  },
]

const getImagePath = (item: Cast) =>
  item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : null
const getName = (item: Cast) => item.name
const getSubtitle = (item: Cast) => item.character

describe('HorizontalList', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(toJSON()).not.toBeNull()
  })

  it('renders the section title', () => {
    const { getByText } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(getByText('Cast')).toBeTruthy()
  })

  it('renders item names', () => {
    const { getByText } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(getByText('Christian Bale')).toBeTruthy()
    expect(getByText('Heath Ledger')).toBeTruthy()
  })

  it('renders subtitles when getSubtitle is provided', () => {
    const { getByText } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
        getSubtitle={getSubtitle}
      />,
    )
    expect(getByText('Bruce Wayne')).toBeTruthy()
    expect(getByText('The Joker')).toBeTruthy()
  })

  it('renders an expo-image when image path is available', () => {
    const { getAllByTestId } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    const images = getAllByTestId('expo-image')
    expect(images.length).toBe(1) // Only Christian Bale has a profile_path
  })

  it('renders a placeholder view when image path is null', () => {
    const nullImagePath = (_item: Cast) => null
    const { queryAllByTestId } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={nullImagePath}
        getName={getName}
      />,
    )
    expect(queryAllByTestId('expo-image').length).toBe(0)
  })

  it('renders FlashList', () => {
    const { getByTestId } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(getByTestId('flash-list')).toBeTruthy()
  })

  it('renders with undefined data without crashing', () => {
    const { getByText } = render(
      <HorizontalList
        data={undefined}
        title="Empty Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(getByText('Empty Cast')).toBeTruthy()
  })

  it('renders with empty data array without crashing', () => {
    const { getByText } = render(
      <HorizontalList
        data={[]}
        title="No Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(getByText('No Cast')).toBeTruthy()
  })

  it('does not render subtitles when getSubtitle is not provided', () => {
    const { queryByText } = render(
      <HorizontalList
        data={mockCastData}
        title="Cast"
        getImagePath={getImagePath}
        getName={getName}
      />,
    )
    expect(queryByText('Bruce Wayne')).toBeNull()
    expect(queryByText('The Joker')).toBeNull()
  })
})
