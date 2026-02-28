import React from 'react'
import { Pressable } from 'react-native'

const MockLinkAppleZoom = ({ children }: { children: React.ReactNode }) => <>{children}</>

const MockLink = ({ children, asChild, href, ...rest }: {
  children: React.ReactNode
  asChild?: boolean
  href?: string
  [key: string]: unknown
}) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ testID?: string }>, {
      testID: `link-${href ?? 'unknown'}`,
    })
  }
  return (
    <Pressable testID={`link-${href ?? 'unknown'}`} {...rest}>
      {children}
    </Pressable>
  )
}

MockLink.AppleZoom = MockLinkAppleZoom

export const Link = MockLink

export const router = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  navigate: jest.fn(),
}

export const useLocalSearchParams = jest.fn(() => ({ id: '1' }))
export const useRouter = jest.fn(() => router)
export const useSegments = jest.fn(() => [])
export const usePathname = jest.fn(() => '/')
export const Stack = {
  Screen: jest.fn(() => null),
}
export const Tabs = {
  Screen: jest.fn(() => null),
}
