import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 8,
        borderColor: "gray",
        borderWidth: 1,
        height: 34,
        paddingHorizontal: 8,
        gap: 8
    },
    iconPlaceholder: {
        backgroundColor: "blue",
        width: 24,
        height: 24,
        borderRadius: 999,
    },
    input: {
        flex: 1,
    }
})