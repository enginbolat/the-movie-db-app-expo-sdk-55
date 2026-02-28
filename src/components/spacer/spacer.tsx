import { View } from "react-native"
import { SpacerProps } from "./spacer.types"
import { useSpacerStyle } from "./spacer.style"

export default function Spacer(props: SpacerProps) {
  const styles = useSpacerStyle(props)
  return (
    <View
      style={styles.container}
    />
  )
}

