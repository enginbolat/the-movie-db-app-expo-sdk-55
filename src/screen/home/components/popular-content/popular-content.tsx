import { useCallback } from 'react';
import { Text, View, ActivityIndicator } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { Popular } from '@/models';
import { MovieCard } from '@/components';
import { styles } from './popular-content.styles';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Popular[],
  isLoading: boolean
}

export function PopularContent({ data, isLoading }: Props) {
  const { t } = useTranslation();

  const renderItem = useCallback(({ item }: { item: Popular }) => <MovieCard item={item} onPress={() => { }} />, [],);

  return (
    <>
      <Text
        style={[styles.ph20, styles.title]}
        accessibilityLabel={t('home.popular_content')}
      >
        {t('home.popular_content')}
      </Text>
      <FlashList
        accessibilityLabel="Item List"
        style={styles.list}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={isLoading ? <ActivityIndicator /> : undefined}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ph20}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      />
    </>
  );
}

