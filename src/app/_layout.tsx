import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '../i18n/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <NativeTabs>
            <NativeTabs.Trigger name="index">
              <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
              <NativeTabs.Trigger.Icon
                src={require('@/assets/images/tabIcons/home.png')}
                renderingMode="template"
              />
            </NativeTabs.Trigger>
          </NativeTabs>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
