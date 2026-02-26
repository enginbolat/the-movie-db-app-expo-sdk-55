import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { Popular } from '@/models'
import { styles } from './styles'
import { JSX, ReactNode, useCallback } from 'react'

type MovieCardProps = {
  item: Popular
  onPress: (item: Popular) => void
}

export function MovieCard({ item, onPress }: MovieCardProps) {
  const imageUrl = item.poster_path
    ? `${process.env.EXPO_PUBLIC_BASE_W500_URL}${item.poster_path}`
    : null;

  const ImagePoster = useCallback(() => {
    if (!imageUrl) return <View style={styles.image} />
    return <Image
      style={styles.image}
      contentFit="cover"
      source={{ uri: imageUrl }}
      accessibilityLabel={`${item.title} poster`}
    />
  }, [imageUrl])


  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => onPress(item)}
      accessibilityLabel={item.title}
      accessibilityRole="button"
    >
      <ImagePoster />
      <Text style={styles.text} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  );
}

