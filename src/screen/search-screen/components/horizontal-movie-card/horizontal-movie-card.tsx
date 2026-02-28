import { Pressable, Text, View } from "react-native"
import { Link } from "expo-router"
import { Image } from 'expo-image'
import { handleImageUrl } from "@/utils/image-helper"
import { MutlSearch } from "@/models/multi-search"
import { styles } from "./horizontal-movie-card.styles"

export default function HorizontalMovieCard({ item }: { item: MutlSearch }) {
  const imageUrl = item.backdrop_path ? handleImageUrl(item.backdrop_path) : ""

  return (
    <Link href={`/movie/${item.id}`} asChild>
      <Pressable
        style={styles.container}
        accessibilityLabel={`View ${item.original_name ?? item.original_title} details`}
        accessibilityRole="button"
      >
        {imageUrl ? (
          <Link.AppleZoom>
            <Image
              transition={60}
              contentFit="cover"
              style={styles.image}
              contentPosition="center"
              source={{ uri: imageUrl }}
              accessibilityLabel={`${item.title} poster`}
            />
          </Link.AppleZoom>
        ) : (
          <View
            style={[styles.image, styles.imageBgColor]}
            accessibilityLabel={`${item.title} poster`}
          />
        )}
        <Text>{item?.original_name || item?.original_title}</Text>
      </Pressable>
    </Link>
  )
}