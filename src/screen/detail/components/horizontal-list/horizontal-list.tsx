import { FlashList } from '@shopify/flash-list';
import { Image, ImageContentFit } from 'expo-image';
import { Gesture, GestureDetector, NativeGesture } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { styles } from './horizontal-list.styles';

type Props<T> = {
  data: T[] | undefined;
  title: string;
  getImagePath: (item: T) => string | null;
  getName: (item: T) => string;
  getSubtitle?: (item: T) => string;
  imageContentFit?: ImageContentFit;
  gesture?: NativeGesture;
}

export default function HorizontalList<T>({
  data,
  title,
  getImagePath,
  getName,
  getSubtitle,
  imageContentFit,
  gesture,
}: Props<T>) {
  const renderItem = ({ item }: { item: T }) => {
    const imageSource = getImagePath(item);

    return (
      <View style={styles.castItemContainer}>
        {imageSource
          ? <Image
              transition={500}
              contentFit={imageContentFit ?? 'cover'}
              style={styles.smallImage}
              contentPosition='center'
              source={{ uri: imageSource }}
              accessibilityLabel={getName(item)}
            />
          : <View style={[styles.smallImage, styles.smallImageColor]} />
        }
        <View style={{ marginTop: 8, gap: 2 }}>
          <Text style={{ width: 128 }}>{getName(item)}</Text>
          {getSubtitle && <Text style={{ width: 128 }}>{getSubtitle(item)}</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={{ gap: 12 }}>
      <View style={styles.castListContainer}>
        <Text>{title}</Text>
      </View>
      <GestureDetector gesture={gesture ?? Gesture.Native()}>
        <FlashList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.horizontalListContentContainer}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
        />
      </GestureDetector>
    </View>
  );
}
