import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  poster: {
    width: '100%',
    height: 560,
    backgroundColor: 'white'
  },
  content: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  tagline: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#888',
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
