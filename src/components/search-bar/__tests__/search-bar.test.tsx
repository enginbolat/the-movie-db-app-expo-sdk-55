import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SearchBar from '../search-bar'

describe('SearchBar', () => {
  const mockOnChangeText = jest.fn()

  beforeEach(() => {
    mockOnChangeText.mockClear()
  })

  it('renders without crashing', () => {
    const { toJSON } = render(<SearchBar onChangeText={mockOnChangeText} value="" />)
    expect(toJSON()).not.toBeNull()
  })

  it('renders a TextInput', () => {
    const { getByDisplayValue } = render(
      <SearchBar onChangeText={mockOnChangeText} value="hello" />,
    )
    expect(getByDisplayValue('hello')).toBeTruthy()
  })

  it('calls onChangeText when text changes', () => {
    const { getByDisplayValue } = render(
      <SearchBar onChangeText={mockOnChangeText} value="" />,
    )
    const input = getByDisplayValue('')
    fireEvent.changeText(input, 'batman')
    expect(mockOnChangeText).toHaveBeenCalledWith('batman')
  })

  it('reflects the value prop in the TextInput', () => {
    const { getByDisplayValue } = render(
      <SearchBar onChangeText={mockOnChangeText} value="avengers" />,
    )
    expect(getByDisplayValue('avengers')).toBeTruthy()
  })

  it('accepts an optional style prop without crashing', () => {
    const { toJSON } = render(
      <SearchBar onChangeText={mockOnChangeText} value="" style={{ margin: 10 }} />,
    )
    expect(toJSON()).not.toBeNull()
  })

  it('ignores unused leadingComponent and trailingComponent props without error', () => {
    const { toJSON } = render(
      <SearchBar
        onChangeText={mockOnChangeText}
        value=""
        leadingComponent={<></>}
        trailingComponent={<></>}
      />,
    )
    expect(toJSON()).not.toBeNull()
  })
})
