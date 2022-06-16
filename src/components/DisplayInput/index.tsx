import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/theme";

type DisplayInputProps = {
	value?: string
}

export function DisplayInput({value = '100+20'}: DisplayInputProps){
	return(
		<View>
			<Text style={styles.text}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		
	},
	text:{
		fontSize: 45,
		color: colors.primaryGrey
	}
})