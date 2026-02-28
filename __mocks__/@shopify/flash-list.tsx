import React from 'react'
import { FlatList, FlatListProps } from 'react-native'

export const FlashList = <T,>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ItemSeparatorComponent,
  horizontal,
  contentContainerStyle,
  onEndReached,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  style,
  ...rest
}: FlatListProps<T> & { estimatedItemSize?: number }) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    ListEmptyComponent={ListEmptyComponent}
    ItemSeparatorComponent={ItemSeparatorComponent}
    horizontal={horizontal}
    contentContainerStyle={contentContainerStyle}
    onEndReached={onEndReached}
    showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    style={style}
    testID="flash-list"
    {...rest}
  />
)
