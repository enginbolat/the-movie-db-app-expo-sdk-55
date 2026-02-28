import { StyleSheet } from "react-native"
import { scale, scaleWidth } from "@/utils/responsive-helper"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  centerAlignment: {
    justifyContent: "center",
    alignItems: "center",
  },
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
    flex: 1,
    flexDirection: "column",
  },
  itemSeperator: {
    width: scaleWidth(8),
  },
})
