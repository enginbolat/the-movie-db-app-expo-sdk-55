import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 902

export const scaleWidth = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH
  return PixelRatio.roundToNearestPixel(size * scale)
}

export const scaleHeight = (size: number): number => {
  const scale = SCREEN_HEIGHT / DESIGN_HEIGHT
  return PixelRatio.roundToNearestPixel(size * scale)
}

export const scale = (size: number): number => {
  const scaleFactor = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, SCREEN_HEIGHT / DESIGN_HEIGHT)
  return PixelRatio.roundToNearestPixel(size * scaleFactor)
}