import { Popular } from '@/models'
import { handleImageUrl } from '@/utils/image-helper'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { useCallback } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './styles'

type MovieCardProps = {
  item: Popular
  onPress: (item: Popular) => void
}

export function MovieCard({ item, onPress }: MovieCardProps) {
  const imageUrl = item.poster_path
    ? handleImageUrl(item.poster_path)
    : null;

  const ImagePoster = useCallback(() => {
    if (!imageUrl) return <View style={styles.image} />
    return <Image
      transition={1000}
      contentFit="cover"
      style={styles.image}
      contentPosition='center'
      source={{ uri: imageUrl }}
      accessibilityLabel={`${item.title} poster`}
    />
  }, [imageUrl])


  return (
    <Link href={`/movie/${item.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => onPress(item)}
        accessibilityLabel={item.title}
        accessibilityRole="button"
      >
        <Link.AppleZoom>
          <ImagePoster />
        </Link.AppleZoom>
        <Text style={styles.text} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    </Link>
  );
}

