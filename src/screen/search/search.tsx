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

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const { data, isLoading } = useSearchContentQuery({ searchTerm, page }, { skip: !searchTerm })

    useEffect(() => {
        setPage(1)
    }, [searchTerm])


    const handleOnEndReached = () => {
        if (!isLoading && data && page < data.total_pages) {
            setPage((prev) => prev + 1)
        }
    }

    const renderItem = ({ item }: { item: MutlSearch }) => {
        return (
            <Link href={`/movie/${item.id}`} asChild>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Link.AppleZoom>
                        <Image
                            transition={60}
                            contentFit="cover"
                            style={{ height: 128, width: 100 }}
                            contentPosition="center"
                            source={{ uri: handleImageUrl(item.backdrop_path ?? "") }}
                            accessibilityLabel={`${item.title} poster`}
                        />
                    </Link.AppleZoom>
                    <Text>{item?.original_name || item?.original_title}</Text>
                </Pressable>
            </Link>
        );
    }

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
                ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
                onEndReachedThreshold={0.4}
                onEndReached={handleOnEndReached}
                ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
            />
        </SafeAreaView>
    );
}


