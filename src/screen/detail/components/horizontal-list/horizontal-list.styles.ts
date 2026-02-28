import { StyleSheet } from "react-native"
import { scale, scaleHeight, scaleWidth } from "@/utils/responsive-helper"

export const styles = StyleSheet.create({
    horizontalListContentContainer: {
        paddingHorizontal: scaleWidth(20),
    },
    castListContainer: {
        marginLeft: scaleWidth(20),
    },
    smallImage: {
        width: scale(128),
        height: scale(128),
        borderRadius: scale(8),
    },
    smallImageColor: {
        backgroundColor: 'gray',
        opacity: 0.2,
    },
    castItemContainer: {
        flexDirection: 'column',
    },
    textCol: {
        marginTop: scaleHeight(8),
        gap: scale(2),
    },
    textWidth: {
        width: scaleWidth(128),
    },
    g12: {
        gap: scale(12),
    }
})
