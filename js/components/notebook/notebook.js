import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {View as TView, Text, useThemeColor} from '../Themed'
import Api from '../../util/api';
import Color from '../../constants/Colors'
import {MonoText} from '../StyledText'

export default function Notebook (props) {
    const {notebook} = props;
    const border = useThemeColor({light: '#eee', dark: '#333'}, 'borderColor')
    return (
      <TView
        style={Api.IS_ANDROID ? localStyle.androidBox : localStyle.iosBox}
        lightColor={"#fff"}
        darkColor={"#202020"}
      >
          <ImageBackground key={notebook.id}
                           style={localStyle.cover} imageStyle={{resizeMode: 'cover'}}
                           source={{uri: notebook.coverUrl}}>

              <Label isPublic={notebook.isPublic}/>
          </ImageBackground>

          <View style={[localStyle.banner, {borderColor: border}]}>
              <View style={localStyle.subject}>
                  <Text allowFontScaling={false}>{notebook.subject}</Text>
              </View>
              <Text style={localStyle.desc} allowFontScaling={false}>
                  {notebook.isExpired ? '已过期' : '未过期'}
              </Text>
              <MonoText style={localStyle.desc} allowFontScaling={false}>{notebook.created} 创建</MonoText>
              <MonoText style={localStyle.desc} allowFontScaling={false}>{notebook.expired} 过期</MonoText>
          </View>
      </TView>
    );
}

function Label(props) {
    return props.isPublic ? null : (
      <Text style={localStyle.privateLabel}>私密</Text>
    );
}

const localStyle = StyleSheet.create({
    androidBox: {
        width: 140,
        elevation: 1,
        alignItems: 'center',
        margin: 3,
        marginBottom: 15
    },
    iosBox: {
        width: 140,
        shadowColor: '#444',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 0},
        alignItems: 'center',
        margin: 3,
        marginBottom: 15
    },
    privateLabel: {
        position: 'absolute',
        top: 0,
        right: 7,
        fontSize: 11,
        padding: 3,
        backgroundColor: 'red',
        color: 'white',
        opacity: 0.75
    },
    cover: {
        width: 140,
        height: 105,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    banner: {
        alignItems:'center',
        width: 140,
        borderWidth: StyleSheet.hairlineWidth,
        borderTopWidth: 0,
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    subject: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        height: 55,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Color.light.text,
        fontSize: 14
    },
    desc: {
        fontSize: 10,
        color: Color.light.secondaryText
    }
});