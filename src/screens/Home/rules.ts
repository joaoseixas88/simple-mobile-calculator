import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const storage = '@storage:calculator:'

export function del(text: string) {
 
  return text.substring(0, text.length - 1);
}

function replaceString(toFormatString: string, obj: object){
	for (var x in obj){
		toFormatString = toFormatString.replace(new RegExp(x, 'g'),obj[x])
	}
	return toFormatString
}


export function calculate(operation: string) {
	
	const formattedString = replaceString(operation,{'÷':'/','x':'*','=':''})
	return `${eval(formattedString)}`
}


export function setResult(prevState: string, value: string){
	const operators = ['-','+','x','÷']
	const isOperator = operators.some(element => element === value)
	const operatorAlreadyExists = operators.some(element => prevState.includes(element))
	const lastLetter = prevState.length - 1
	const isTheSameOperator = prevState[lastLetter] === value
	const isLastLetterAnOperator = operators.some(element => element === prevState[lastLetter])


	return calculate(`${prevState}${value}`)
	
} 

export function setInput(prevState: string, value: string){
	const operators = ['-','+','x','÷']
	const isOperator = operators.some(element => element === value)
	const lastLetter = prevState.length - 1
	const isTheSameOperator = prevState[lastLetter] === value
	const isLastLetterAnOperator = operators.some(element => element === prevState[lastLetter])
	
	if(isOperator && !isTheSameOperator && isLastLetterAnOperator ){
		return `${prevState.slice(0,-1)}${value}`
	}

	if(isOperator && isLastLetterAnOperator && isTheSameOperator){
		return prevState
	}

	if(prevState === '0'){
		return value
	}
	
	return `${prevState}${value}`
	
} 


export const fontSizeChanger = {
	1: 70,
	2: 70,
	3: 70,
	4: 70,
	5: 70,
	6: 70,
	7: 70,
	8: 60,
	9: 60,
	10: 55,
	11: 50,
	12: 45,
	13: 40,
	14: 35,
	15: 35
}


export async function saveToStorage(value){
	const oldData = await getFromStorage()
	oldData.push(value)
	const jsonData = JSON.stringify(oldData)
	try {
		await AsyncStorage.setItem(storage,jsonData)
	} catch (error) {
		
	}
	
}

export async function getFromStorage(){
	
	try {
		const data = await AsyncStorage.getItem(storage)
		if(!data){
			return []
		}
		return JSON.parse(data)
	} catch (error) {
		
	}

	
}