import { StyleSheet } from 'react-native'
import { scale, scaleHeight, scaleWidth } from '@/utils/responsive-helper'

export const styles = StyleSheet.create({
    title: {
        fontSize: scale(24),
        fontWeight: '600',
    },
    col: {
        flexDirection: "column",
        gap: scale(12),
    },
    ph20: {
        paddingHorizontal: scaleWidth(20),
    },
    list: {
        height: scaleHeight(240),
    },
    itemSeperator: {
        width: scaleWidth(8),
    },
});
