import { StyleSheet } from 'react-native'
import { scaleWidth } from '@/utils/responsive-helper'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ph20: {
    paddingHorizontal: scaleWidth(20),
  },
  mh20: {
    marginHorizontal: scaleWidth(20),
  },
});
