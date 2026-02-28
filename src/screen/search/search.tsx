import { useState, useEffect } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image'
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSearchContentQuery } from "@/hooks/use-movie-request";
import SearchBar from "@/components/search-bar/search-bar";
import { MutlSearch } from "@/models/multi-search";
import { handleImageUrl } from "@/utils/image-helper";
import { styles } from "./search.styles";
import HorizontalMovieCard from "./components/horizontal-movie-card/horizontal-movie-card";
import Spacer from "@/components/spacer/spacer";
import useDebounce from "@/hooks/use-debounce";

export default function Search() {
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

    const renderItem = ({ item }: { item: MutlSearch }) => (
      <HorizontalMovieCard item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                onChangeText={setSearchTerm}
                value={searchTerm}
                style={styles.mh20}
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
    );
}


