import { useCallback, RefObject } from 'react';
import { Text, View, ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { Popular } from '@/models';
import { MovieCard } from '@/components';
import { styles } from './content-list.styles';

type Props = {
  data: Popular[],
  isLoading: boolean
  title: string
}

export function ContentList({ data, isLoading, title }: Props) {

  const renderItem = useCallback(({ item }: { item: Popular }) => (
    <MovieCard item={item} onPress={(movie) => router.push(`/movie/${movie.id}`)} />
  ), []);

  return (
    <>
      <Text
        style={[styles.ph20, styles.title]}
        accessibilityLabel={title}
      >
        {title}
      </Text>
      <GestureDetector gesture={Gesture.Native()}>
        <FlashList
          accessibilityLabel="Item List"
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : undefined}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ph20}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        />
      </GestureDetector>
    </>
  );
}

