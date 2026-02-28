import React from 'react'
import { render } from '@testing-library/react-native'
import Spacer from '../spacer'

describe('Spacer', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Spacer />)
    expect(toJSON()).not.toBeNull()
  })

  it('applies width and height props', () => {
    const { toJSON } = render(<Spacer width={20} height={30} />)
    const tree = toJSON() as { props: { style: object[] } }
    const style = tree.props.style
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style
    expect(flatStyle).toMatchObject({ width: 20, height: 30 })
  })

  it('applies margin props', () => {
    const { toJSON } = render(<Spacer top={8} bottom={12} left={4} right={6} />)
    const tree = toJSON() as { props: { style: object[] } }
    const style = tree.props.style
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style
    expect(flatStyle).toMatchObject({
      marginTop: 8,
      marginBottom: 12,
      marginLeft: 4,
      marginRight: 6,
    })
  })

  it('applies horizontal and vertical margin props', () => {
    const { toJSON } = render(<Spacer horizontal={16} vertical={24} />)
    const tree = toJSON() as { props: { style: object[] } }
    const style = tree.props.style
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style
    expect(flatStyle).toMatchObject({ marginHorizontal: 16, marginVertical: 24 })
  })

  it('renders a View with no styles when no props given', () => {
    const { toJSON } = render(<Spacer />)
    const tree = toJSON() as { type: string; props: { style: object[] } }
    expect(tree.type).toBe('View')
  })

  it('accepts combined margin and size props simultaneously', () => {
    const { toJSON } = render(<Spacer width={10} height={10} top={5} bottom={5} />)
    const tree = toJSON() as { props: { style: object[] } }
    const style = tree.props.style
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style
    expect(flatStyle).toMatchObject({ width: 10, height: 10, marginTop: 5, marginBottom: 5 })
  })
})
