import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from "../constants/Colors";
import {StackNavigationProp, StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList, TabOneParamList} from "../types";
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type ProfileScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabOneParamList, 'TabOneScreen'>,
    StackNavigationProp<RootStackParamList>
    >;

export default function TabOneScreen({ navigation }: { navigation: ProfileScreenNavigationProp}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One 你好</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate("User", { id: "1" })}}>
          <Text lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
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
