import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    image: {
        width: 160,
        height: 200,
        borderRadius: 8
    },
    text: {
        maxWidth: 140,
        overflow: "hidden",
        textAlign: "center"
    }
})