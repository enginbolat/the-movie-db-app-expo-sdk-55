import React, { PropsWithChildren } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { store } from '@/store'

import '../i18n/index'

export default function RootProvider({ children }:PropsWithChildren) {
  const colorScheme = useColorScheme()
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {children}
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
