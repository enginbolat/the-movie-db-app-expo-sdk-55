import { StyleSheet } from 'react-native'
import { scale, scaleHeight, scaleWidth } from '@/utils/responsive-helper'

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: scale(8),
        borderColor: "gray",
        borderWidth: 1,
        height: scaleHeight(34),
        paddingHorizontal: scaleWidth(8),
        gap: scale(8),
    },
    iconPlaceholder: {
        backgroundColor: "blue",
        width: scale(24),
        height: scale(24),
        borderRadius: 999,
    },
    input: {
        flex: 1,
    }
})
