import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Ionicons} from '../Themed'

import Color from '../../constants/Colors'


export default class NotebookAdd extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
                <View style={localStyle.box}>
                    <Ionicons name="md-add" size={48}
                              lightColor={Color.light.secondaryText} darkColor={Color.dark.secondaryText} />
                </View>
            </TouchableOpacity>
        );
    }
}

const localStyle = StyleSheet.create({
    box: {
        flex: 1,
        width: 140,
        shadowColor: '#444',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 0
        },
        elevation: 1,
        backgroundColor: "#eee",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        marginBottom: 15
    }
});