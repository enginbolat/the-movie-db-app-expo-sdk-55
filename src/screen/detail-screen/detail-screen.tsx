import { useMovieCastByMovieIdQuery, useMovieDetailsByIdQuery } from '@/hooks/use-movie-request'
import { handleImageUrl } from '@/utils/image-helper'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HorizontalList } from './components'
import { styles } from './detail-screen.styles'
import { FlashList } from '@shopify/flash-list'

const LabelAndDescription = ({ label, desc }: { label?: string; desc?: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text>{desc}</Text>
  </View>
)

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data, isLoading, error } = useMovieDetailsByIdQuery(id)
  const { data: movieCast } = useMovieCastByMovieIdQuery(id)

  const castGesture = useMemo(() => Gesture.Native(), [])
  const productionGesture = useMemo(() => Gesture.Native(), [])
  castGesture.simultaneousWithExternalGesture(productionGesture)
  productionGesture.simultaneousWithExternalGesture(castGesture)

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error || !data) {
    return (
      <View style={[styles.centered, { flex: 1 }]}>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    )
  }

  const imageUrl = data.poster_path ? handleImageUrl(data.poster_path) : null

  return (
    <ScrollView style={styles.scroll}>
      {imageUrl && (
        <Image
          style={styles.poster}
          contentFit='fill'
          source={{ uri: imageUrl }}
          accessibilityLabel={`${data.title} poster`}
        />
      )}
      <SafeAreaView edges={['bottom']}>
        <View style={styles.content}>
          <Text style={styles.title}>{data.title}</Text>
          {!!data.tagline && <Text style={styles.tagline}>{data.tagline}</Text>}
          <Text style={styles.overview}>{data.overview}</Text>
          <LabelAndDescription label='Release Date:' desc={data.release_date} />
          <LabelAndDescription label='Rating:' desc={`${data.vote_average.toFixed(1)} (${data.vote_count} votes)`} />
          <LabelAndDescription label='Runtime:' desc={`${data.runtime} min`} />
          {data.genres?.length > 0 && (
            <FlashList
              ListHeaderComponent={<Text style={styles.label}>Genres:</Text>}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <LabelAndDescription desc={item.name} />}
              data={data.genres}
            />
          )}
        </View>
        <HorizontalList
          data={movieCast?.cast}
          title='Cast'
          getImagePath={(item) => item.profile_path ? handleImageUrl(item.profile_path) : null}
          getName={(item) => item.name}
          getSubtitle={(item) => `as ${item.character}`}
          gesture={castGesture}
        />
        <HorizontalList
          data={data.production_companies}
          title='Production'
          getImagePath={(item) => item.logo_path ? handleImageUrl(item.logo_path) : null}
          getName={(item) => item.name}
          getSubtitle={(item) => item.origin_country}
          imageContentFit='fill'
          gesture={productionGesture}
        />
      </SafeAreaView>
    </ScrollView>
  )
}
