import React from 'react'
import { Stack } from 'expo-router'
import RootProvider from '@/providers/RootProvider'

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack screenOptions={{ headerBackTitle: '', headerTitle: '' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ title: '', headerTransparent: true }} />
        <Stack.Screen name="search" options={{ title: '', headerTransparent: true }} />
      </Stack>
    </RootProvider>
  )
}
