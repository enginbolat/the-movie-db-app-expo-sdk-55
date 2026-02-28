import { renderHook, act } from '@testing-library/react-native'
import useDebounce from '../use-debounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('does not update value before the delay expires', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    act(() => {
      jest.advanceTimersByTime(300) // less than delay
    })

    expect(result.current).toBe('initial')
  })

  it('updates value after the delay expires', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated')
  })

  it('resets the timer when value changes rapidly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    act(() => { jest.advanceTimersByTime(300) })
    rerender({ value: 'c' })
    act(() => { jest.advanceTimersByTime(300) })

    // Only 600ms total, but timer was reset on each change — should still be 'a'
    expect(result.current).toBe('a')

    act(() => { jest.advanceTimersByTime(500) })
    expect(result.current).toBe('c')
  })

  it('works with number type', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 0 },
    })

    rerender({ value: 42 })
    act(() => { jest.advanceTimersByTime(300) })

    expect(result.current).toBe(42)
  })

  it('works with object type', () => {
    const obj = { page: 1, search: 'batman' }
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: { page: 0, search: '' } },
    })

    rerender({ value: obj })
    act(() => { jest.advanceTimersByTime(400) })

    expect(result.current).toEqual(obj)
  })

  it('cleans up the timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    const { unmount } = renderHook(() => useDebounce('test', 500))

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })

  it('works with zero delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 0), {
      initialProps: { value: 'start' },
    })

    rerender({ value: 'instant' })
    act(() => { jest.advanceTimersByTime(0) })

    expect(result.current).toBe('instant')
  })
})
