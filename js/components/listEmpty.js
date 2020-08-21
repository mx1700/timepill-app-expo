import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Color from '../constants/Colors';
import {Text, View, Button} from "./Themed"


const ListEmptyRefreshable = (props) => {
  let text = props.error ? '出错了 :(' : props.message;

  return (
    <View style={localStyle.container}>
      <Text style={localStyle.text}>{text}</Text>
      <Button
        titleStyle={{fontSize: 14}}
        title={'刷新一下'}
        onPress={() => props.onPress ? props.onPress() : null}/>
    </View>
  );
}


const localStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  text: {
    paddingBottom: 15,
  }
});


export {
  ListEmptyRefreshable
}