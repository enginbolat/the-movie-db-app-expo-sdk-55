import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { useGetPopularContentQuery, useNowPlayingMovieQuery, useUpcomingMovieQuery } from '@/hooks/use-movie-request'
import { styles } from './home-screen.styles'
import { ContentList } from './components/content-list/content-list'

export default function HomeScreen() {
  const { t } = useTranslation()

  const { data: popularContentData, isLoading: popularLoading, error: popularError } = useGetPopularContentQuery()
  const { data: nowPlayingContentData, isLoading: nowPlayingLoading, error: nowError } = useNowPlayingMovieQuery(1)
  const { data: upcomingMovies, isLoading: upcomingMovieLoading, error: upcomingError } = useUpcomingMovieQuery(1)

  const errorMessage = popularError || nowError || upcomingError
  const isLoading = popularLoading || nowPlayingLoading || upcomingMovieLoading

  if (popularError || nowError || upcomingError) {
    return (
      <Text accessibilityLabel="Error message">
        {JSON.stringify(errorMessage)}
      </Text>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
    >
      <SafeAreaView style={styles.centerAlignment}>
        <View style={styles.col}>
          <ContentList
            title={t("home.popular_content")}
            data={popularContentData?.results ?? []}
            isLoading={isLoading}
          />
          <ContentList
            title={t("home.now_playing_content")}
            data={nowPlayingContentData?.results ?? []}
            isLoading={isLoading}
          />
          <ContentList
            title={t("home.upcoming_movies")}
            data={upcomingMovies?.results ?? []}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
