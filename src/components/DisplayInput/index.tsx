import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/theme";

type DisplayResultProps = {
	value?: string
}

export function DisplayInput({value = '0'}: DisplayResultProps){
	return(
		<View style={styles.container}>
			<Text 
			numberOfLines={1}
			style={styles.text}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	text:{
		fontSize: 55,
		color: colors.shape,
		// textAlign: 'right',
		flexWrap: 'wrap'

	}
})