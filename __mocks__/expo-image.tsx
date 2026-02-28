import React from 'react'
import { Image as RNImage } from 'react-native'

export const Image = ({
  source,
  style,
  accessibilityLabel,
  contentFit: _contentFit,
  contentPosition: _contentPosition,
  transition: _transition,
  ...rest
}: {
  source: { uri: string } | number
  style?: object
  accessibilityLabel?: string
  contentFit?: string
  contentPosition?: string
  transition?: number
  [key: string]: unknown
}) => (
  <RNImage
    source={source as { uri: string }}
    style={style as object}
    accessibilityLabel={accessibilityLabel}
    testID="expo-image"
    {...rest}
  />
)
