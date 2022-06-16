import { ReactNode } from "react";
import { Alert, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { colors } from "../../styles/theme";

type ButtonProps = {
  valueToRender?: string;
  children?: any
  color: string;
	onPress: () => void
};

export function Button({ valueToRender, color, children, onPress }: ButtonProps) {
  return (
    <RectButton style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
      {children ? <View>{children}</View>: <Text style={styles.text}>{valueToRender}</Text>}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
		height: 72,
		width: 72,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25
		
	},
	text: {
		color: colors.shape,
		fontSize: 20
	}
});
