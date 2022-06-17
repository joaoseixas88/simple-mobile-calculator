import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Row } from "../../components/Row";
import { colors } from "../../styles/theme";
import React, { useState } from "react";
import { DisplayInput } from "../../components/DisplayInput";
import { DisplayResult } from "../../components/DisplayResult";
import {
  calculate,
  del,
  fontSizeChanger,
  getFromStorage,
  saveToStorage,
  setInput,
  setResult,
  storage,
} from "./rules";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  const [displayInput, setDisplayInput] = React.useState<string>(`0`);
  const [displayResult, setDisplayResult] = React.useState<string>("");
  const [evalString, setEvalString] = React.useState<string>("");
  const [calculationIsDone, setCalculationIsDone] = React.useState(false);
  const [cleared, setCleared] = React.useState(false);
  const [oldData, setOldData] = React.useState([]);

  async function store() {
    const response = await getFromStorage();
    const data = response ? response : [];
    data.reverse();
    setOldData(data);
  }

  React.useEffect(() => {
    store();
  }, []);

  

  async function clear() {
    if (cleared) {
      setCleared(false);
      await AsyncStorage.setItem(storage, JSON.stringify([]));
      setOldData([]);
    }
    setDisplayInput("0");
    setDisplayResult("");
    setEvalString("");
    setCalculationIsDone(false);
    setCleared(true);
  }

  function handleSetInput(value: string) {
    setCleared(false);
    const operators = ["-", "+", "x", "÷"];
    const isOperator = operators.some((element) => element === value);
    const lastLetter = evalString.length - 1;
    const isLastLetterAnOperator = operators.some(
      (element) => element === evalString[lastLetter]
    );
    if (isOperator && displayInput === "0") {
      return;
    }
    if (calculationIsDone) {
			if(isOperator){
				return
			}
      setCalculationIsDone(!calculationIsDone);
      setDisplayInput(value);
      setEvalString(value);
			setDisplayResult(value)
      return;
    }

    setDisplayInput((prevState) => setInput(prevState, value));
    if (isOperator) {
      if (isLastLetterAnOperator) {
        setEvalString((prevState) => `${prevState}`);
      } else {
        setEvalString((prevState) => `${prevState}${value}`);
      }
    } else {
      setEvalString((prevState) => `${prevState}${value}`);
      setDisplayResult(`${setResult(evalString, value)}`);
    }
  }

  function handleCalculate() {
		if(calculationIsDone){
			return
		}
    const operators = ["-", "+", "x", "÷"];
    const lastLetter = displayInput.length - 1;
    const isLastLetterAnOperator = operators.some(
      (element) => element === displayInput[lastLetter]
    );
    if (isLastLetterAnOperator) {
      return;
    }
    setDisplayResult(calculate(displayInput));
    setCalculationIsDone(true);
    saveToStorage({
      calculation: displayInput,
      result: displayResult,
    });
    setOldData((prevState) => [
      ...prevState,
      {
        calculation: displayInput,
        result: `= ${displayResult}`,
      },
    ]);
    setEvalString("");
  }

  const firstLine = [
    () => {
      clear();
    },
    () => {},
    () => {},
    () => {
      handleSetInput("÷");
    },
  ];
  const secondLine = [
    () => {
      handleSetInput("7");
    },
    () => {
      handleSetInput("8");
    },
    () => {
      handleSetInput("9");
    },
    () => {
      handleSetInput("x");
    },
  ];
  const thirdLine = [
    () => {
      handleSetInput("4");
    },
    () => {
      handleSetInput("5");
    },
    () => {
      handleSetInput("6");
    },
    () => {
      handleSetInput("-");
    },
  ];
  const fourthLine = [
    () => {
      handleSetInput("1");
    },
    () => {
      handleSetInput("2");
    },
    () => {
      handleSetInput("3");
    },
    () => {
      handleSetInput("+");
    },
  ];
  const fifthLine = [
    () => {},
    () => {
      handleSetInput("0");
    },
    () => setDisplayInput(del(displayInput)),
    () => {
      handleCalculate();
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.display}>
          <>
            <ScrollView
              key={Math.random()}
              style={{ flexDirection: "column-reverse" }}
              showsVerticalScrollIndicator={false}
            >
              {oldData.map((e) => {
                return (
                  <>
                    <Text style={styles.oldDataText}>{e.calculation}</Text>
                    <Text style={styles.oldDataText}>{e.result}</Text>
                  </>
                );
              })}
            </ScrollView>
            <Text
              ellipsizeMode="head"
              numberOfLines={1}
              style={{
                fontSize: calculationIsDone
                  ? 30
                  : displayInput.length <= 15
                  ? fontSizeChanger[displayInput.length]
                  : 35,
                color: colors.shape,
              }}
            >
              {displayInput}
            </Text>
            {displayResult.length !== 0 && (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: calculationIsDone ? 50 : 35,
                  color: colors.primaryGrey,
                }}
              >
                = {displayResult}
              </Text>
            )}
          </>
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
  oldDataText: {
    color: colors.oldDataColor,
    fontSize: 15,
		textAlign: 'right'
  },
});
