import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Button, Text, View} from '../components/Themed';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useRef, useState} from "react";

export default function HomeScreen(props) {
    const navigation = useNavigation();
    const [stop, setStop] = useState(false)

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            {stop ? null : <Counter/>}
            <Button title={"STOP"} onPress={()=>setStop(true)}/>
        </View>
    );
}

function Counter() {
    const [counter, setCounter] = useState(0)
    const counterRef = useRef(counter)

    useEffect(() => {
        const timer = setInterval(() => {
            counterRef.current++;
            console.log("counter:" + counterRef.current)
            setCounter(counterRef.current)
        }, 500);
        return () => {
            clearInterval(timer)
            console.log("clear timer!!!!!")
        }
    },[])

    return <Text>{counter}</Text>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});