import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../Button";
import { colors } from "../../styles/theme";

type RowProps = {
  colorSchema: "light" | "dark";
  infoToRender: string[];
  functions: {
    0: () => void;
    1: () => void;
    2: () => void;
    3: () => void;
  };
};

export function Row({ colorSchema, infoToRender, functions }: RowProps) {
  const rowColorDefault = {
    "1": colorSchema === "dark" ? colors.secondaryGrey : colors.primaryGrey,
    "2": colorSchema === "dark" ? colors.secondaryGrey : colors.primaryGrey,
    "3": colorSchema === "dark" ? colors.secondaryGrey : colors.primaryGrey,
    "4": colors.primaryBlue,
  };

  return (
    <View style={styles.container}>
      <Button
        valueToRender={infoToRender[0]}
        onPress={functions[0]}
        color={rowColorDefault[1]}
      />
      <Button
        valueToRender={infoToRender[1]}
        onPress={functions[1]}
        color={rowColorDefault[2]}
      />
      <Button
        valueToRender={infoToRender[2]}
        onPress={functions[2]}
        color={rowColorDefault[3]}
      />
      <Button
        valueToRender={infoToRender[3]}
        onPress={functions[3]}
        color={rowColorDefault[4]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
