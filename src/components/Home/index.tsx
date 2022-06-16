import { Text, View, StyleSheet } from "react-native";
import { Row } from "../Row";
import { colors } from "../../styles/theme";
import React from "react";
import { DisplayResult } from "../DisplayResult";
import { DisplayInput } from "../DisplayInput";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.display}>
					<DisplayInput />
          <DisplayResult />
        </View>
        <View style={styles.buttons}>
          <Row colorSchema="light" infoToRender={["C", "+/-", "%", "÷"]} />
          <Row colorSchema="dark" infoToRender={["7", "8", "9", "x"]} />
          <Row colorSchema="dark" infoToRender={["4", "5", "6", "-"]} />
          <Row colorSchema="dark" infoToRender={["1", "2", "3", "+"]} />
          <Row colorSchema="dark" infoToRender={[".", "0", "del", "="]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		padding: 15,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 8,
    paddingVertical: 50,
		marginBottom: -30
  },
  display: {
    flex: 1,
    flexDirection: "column",
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginHorizontal: '5%'
	},
  buttons: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
