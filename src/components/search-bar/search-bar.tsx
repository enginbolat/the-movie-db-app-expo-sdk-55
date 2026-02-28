import { View, TextInput, StyleProp, ViewStyle } from "react-native"
import { styles } from "./search-bar.styles"
import { JSX } from "react"

type Props = {
  leadingComponent?: JSX.Element;
  trailingComponent?: JSX.Element;
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  style?: StyleProp<ViewStyle>;
};

export default function SearchBar({
  leadingComponent: _leadingComponent,
  trailingComponent: _trailingComponent,
  placeholder: _placeholder,
  onChangeText,
  value,
  style,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconPlaceholder} />
      {/* {leadingComponent} */}
      <TextInput
        placeholder="Search..."
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
      />
      <View style={styles.iconPlaceholder} />
      {/* {trailingComponent} */}
    </View>
  )
}