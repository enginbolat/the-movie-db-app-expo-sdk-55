import { StyleSheet } from 'react-native';
import { scale, scaleHeight, scaleWidth } from '@/utils/responsive-helper';

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  poster: {
    width: '100%',
    height: scaleHeight(560),
    backgroundColor: 'white',
  },
  content: {
    padding: scale(20),
    gap: scale(12),
  },
  title: {
    fontSize: scale(24),
    fontWeight: '700',
  },
  tagline: {
    fontSize: scale(15),
    fontStyle: 'italic',
    color: '#888',
  },
  overview: {
    fontSize: scale(14),
    lineHeight: scaleHeight(22),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: scale(4),
  },
  label: {
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignmentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
