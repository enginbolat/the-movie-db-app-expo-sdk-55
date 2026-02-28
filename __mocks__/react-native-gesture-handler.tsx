import React from 'react'
import { View, ViewProps } from 'react-native'

export const GestureDetector = ({ children }: { children: React.ReactNode; gesture?: unknown }) =>
  <>{children}</>

export const Gesture = {
  Native: jest.fn(() => ({
    simultaneousWithExternalGesture: jest.fn().mockReturnThis(),
    onStart: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
  })),
  Pan: jest.fn(() => ({
    onStart: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
  })),
  Simultaneous: jest.fn((...args: unknown[]) => args),
}

export const GestureHandlerRootView = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
)

export type NativeGesture = ReturnType<typeof Gesture.Native>
