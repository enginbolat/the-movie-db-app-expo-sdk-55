import { StyleSheet } from "react-native";
import { SpacerProps } from "./spacer.types";

export const useSpacerStyle = ({
  width,
  height,
  horizontal,
  vertical,
  right,
  left,
  bottom,
  top,
}: SpacerProps) =>
  StyleSheet.create({
    container: {
      width,
      height,
      marginRight: right,
      marginLeft: left,
      marginTop: top,
      marginBottom: bottom,
      marginHorizontal: horizontal,
      marginVertical: vertical,
    },
  });