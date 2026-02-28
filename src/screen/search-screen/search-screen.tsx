import { useState, useEffect, useCallback } from "react"
import { ActivityIndicator, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FlashList } from "@shopify/flash-list"
import { useSearchContentQuery } from "@/hooks/use-search-request"
import useDebounce from "@/hooks/use-debounce"
import { Spacer, SearchBar } from '@/components'
import { MutlSearch } from "@/models/multi-search"
import { styles } from "./search-screen.styles"
import HorizontalMovieCard from "./components/horizontal-movie-card/horizontal-movie-card"


export default function SearchScreen() {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [page, setPage] = useState(1)
    const { data, isLoading } = useSearchContentQuery({ searchTerm: debouncedSearchTerm, page }, { skip: !debouncedSearchTerm })

    useEffect(() => {
        setPage(1)
    }, [debouncedSearchTerm])


    const handleOnEndReached = () => {
        if (!isLoading && data && page < data.total_pages) {
            setPage((prev) => prev + 1)
        }
    }

    const renderItem = useCallback(({ item }: { item: MutlSearch }) => <HorizontalMovieCard item={item} />, [])

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                onChangeText={setSearchTerm}
                value={searchTerm}
                style={[styles.mh20, styles.mb12]}
            />
            <FlashList
                contentContainerStyle={styles.mh20}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                data={data?.results}
                renderItem={renderItem}
                ListEmptyComponent={() => <Text>Bir Sonuç Bulunamadı</Text>}
                ItemSeparatorComponent={() => <Spacer vertical={4} />}
                onEndReachedThreshold={0.4}
                onEndReached={handleOnEndReached}
                ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
            />
        </SafeAreaView>
    )
}


