import { Text, View, StyleSheet } from "react-native";
import { Row } from "../../components/Row";
import { colors } from "../../styles/theme";
import React from "react";
import { DisplayResult } from "../../components/DisplayResult";
import { DisplayInput } from "../../components/DisplayInput";
import { del } from "./rules";

export function Home() {
	const [displayResult, setDisplayResult] = React.useState('')
	const [displayInput, setDisplayInput] = React.useState('')
	const [calculationIsDone, setCalculationIsDone] = React.useState(false)
	
	function sum(value: string){
		const values = value.split('+')
		console.log(values)
		setDisplayInput((Number(values[0]) + Number(values[1])).toString())
		setCalculationIsDone(!calculationIsDone)
	}
  
	const firstLine = [
		() => {return (setDisplayResult(''), setDisplayInput(''))},
		() => {return setDisplayResult(`${displayResult}+/-`)},
		() => {return setDisplayResult(`${displayResult}%`)},
		() => {return setDisplayResult(`${displayResult}÷`)},
	]
	const secondLine = [
		() => {return setDisplayResult(`${displayResult}7`)},
		() => {return setDisplayResult(`${displayResult}8`)},
		() => {return setDisplayResult(`${displayResult}9`)},
		() => {return setDisplayResult(`${displayResult}x`)},
	]
	const thirdLine = [
		() => {return setDisplayResult(`${displayResult}4`)},
		() => {return setDisplayResult(`${displayResult}5`)},
		() => {return setDisplayResult(`${displayResult}6`)},
		() => {return setDisplayResult(`${displayResult}-`)},
	]
	const fourthLine = [
		() => {return setDisplayResult(`${displayResult}1`)},
		() => {return setDisplayResult(`${displayResult}2`)},
		() => {return setDisplayResult(`${displayResult}3`)},
		() => {return setDisplayResult(`${displayResult}+`)},
	]
	const fifthLine = [
		() => {return setDisplayResult(`${displayResult}.`)},
		() => {return setDisplayResult(`${displayResult}0`)},
		() => {return setDisplayResult(del(displayResult))},
		() => {return sum(displayResult)},
	]

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.display}>
          <DisplayInput value={displayInput}/>
          <DisplayResult value={displayResult}/>
        </View>
        <View style={styles.buttons}>
          <Row
            colorSchema="light"
            infoToRender={["C", "+/-", "%", "÷"]}
            functions={firstLine}
          />
           <Row
            colorSchema="dark"
            infoToRender={["7", "8", "9", "x"]}
            functions={secondLine}
          />
          <Row
            colorSchema="dark"
            infoToRender={["4", "5", "6", "-"]}
            functions={thirdLine}
						/>
          <Row
            colorSchema="dark"
            infoToRender={["1", "2", "3", "+"]}
            functions={fourthLine}
						/>
          <Row
            colorSchema="dark"
            infoToRender={[".", "0", "del", "="]}
            functions={fifthLine}
          />
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
    marginBottom: -30,
  },
  display: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginHorizontal: "5%",
  },
  buttons: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
