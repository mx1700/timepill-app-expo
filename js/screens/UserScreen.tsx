import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../types";

type Props = StackScreenProps<RootStackParamList, 'User'>;

export default function UserScreen({ route }: Props) {
    const uid = route.params.id;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Screen</Text>
            <Text>id: {uid}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="/screens/UserScreen.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
