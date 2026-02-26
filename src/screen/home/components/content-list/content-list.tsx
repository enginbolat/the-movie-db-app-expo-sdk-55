import { useCallback, RefObject } from 'react';
import { Text, View, ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Popular } from '@/models';
import { MovieCard } from '@/components';
import { styles } from './content-list.styles';

type Props = {
  data: Popular[],
  isLoading: boolean
  title: string
  handlerRef?: RefObject<NativeViewGestureHandler | null>
  simultaneousHandlers?: RefObject<NativeViewGestureHandler | null>[]
}

export function ContentList({ data, isLoading, title, handlerRef, simultaneousHandlers }: Props) {

  const renderItem = useCallback(({ item }: { item: Popular }) => <MovieCard item={item} onPress={() => { }} />, [],);

  return (
    <>
      <Text
        style={[styles.ph20, styles.title]}
        accessibilityLabel={title}
      >
        {title}
      </Text>
      <NativeViewGestureHandler ref={handlerRef} simultaneousHandlers={simultaneousHandlers}>
        <FlashList
          accessibilityLabel="Item List"
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={isLoading ? <ActivityIndicator /> : undefined}
          horizontal
          estimatedItemSize={160}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ph20}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        />
      </NativeViewGestureHandler>
    </>
  );
}

