import { StyleSheet } from "react-native"
import { scale, scaleHeight, scaleWidth } from "@/utils/responsive-helper"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  image: {
    height: scaleHeight(128),
    width: scaleWidth(100),
  },
  imageBgColor: {
    backgroundColor: 'gray',
    opacity: 0.7,
  }
});
