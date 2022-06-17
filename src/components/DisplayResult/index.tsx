import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/theme";


export function DisplayResult({ value } ) {
	
 
  return (
    <View>
      <Text
			numberOfLines={1}			
        style={
          isNaN(value)
            ? { fontSize: 30, color: colors.primaryGrey }
            : styles.text
        }
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row'
	},
  text: {
    color: colors.primaryGrey,
    fontSize: 45,
		textAlign: 'left'
  },
});
