import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetPopularContentQuery } from '@/hooks/use-movie-request';
import { styles } from './home.styles';
import { PopularContent } from './components/popular-content/popular-content';

export default function HomeScreen() {
    const { data, isLoading, error } = useGetPopularContentQuery()

    if (error) {
        return <Text accessibilityLabel='Error message'>{JSON.stringify(error)}</Text>
    }

    if (!data?.results) {
        return <Text accessibilityLabel='No results found'>Empty</Text>
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.col}>
                    <PopularContent data={data.results} isLoading={isLoading} />
                </View>
            </SafeAreaView>
        </View>
    );
}
