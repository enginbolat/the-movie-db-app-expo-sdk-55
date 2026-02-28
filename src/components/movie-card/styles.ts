import { StyleSheet } from "react-native"
import { scale, scaleHeight, scaleWidth } from "@/utils/responsive-helper"

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        gap: scale(8),
    },
    image: {
        width: scaleWidth(160),
        height: scaleHeight(200),
        borderRadius: scale(8),
    },
    text: {
        maxWidth: scaleWidth(140),
        overflow: "hidden",
        textAlign: "center",
    }
})
