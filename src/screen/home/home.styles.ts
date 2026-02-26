import { StyleSheet } from "react-native";

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
    fontSize: 24,
    fontWeight: '600'
  },
  col: {
    flexDirection: "column",
    gap: 12
  },
  ph20: {
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    flexDirection: "column",
  },
  itemSeperator: {
    width: 8,
  },
});
