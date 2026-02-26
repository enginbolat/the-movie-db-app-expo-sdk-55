import { Pressable, Text } from 'react-native'
import { Image } from 'expo-image'
import { Popular } from '@/models'
import { styles } from './styles'

type MovieCardProps = {
    item: Popular
    onPress: (item: Popular) => void
}

export function MovieCard({ item, onPress }: MovieCardProps) {
    const imageUrl = process.env.EXPO_PUBLIC_BASE_W500_URL + item.poster_path

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
        <Image
          style={styles.image}
          contentFit="cover"
          source={{ uri: imageUrl }}
          accessibilityLabel={`${item.title} poster`}
        />
        <Text style={styles.text} numberOfLines={2}>
          {item.title}
        </Text>
      </Pressable>
    );
}

