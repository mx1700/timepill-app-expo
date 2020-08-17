import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import { View, Text, Ionicons, Fontisto } from "../Themed";
import Color from '../../constants/Colors';

export default class DiaryIconComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: props.count || 0
        }
    }


    render() {
        return (
            <View style={localStyle.wrap}>
                <Fontisto name="comment"
                          size={14}
                          lightColor={Color.light.secondaryText}
                          darkColor={Color.dark.secondaryText}
                          style={localStyle.icon} />
                <Text style={localStyle.text}
                      lightColor={Color.light.secondaryText}
                      darkColor={Color.dark.secondaryText}
                >
                    {this.state.count > 0 ? this.state.count : ''}
                </Text>
            </View>
        );
    }
}

const localStyle = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        marginRight: 6,
        marginTop: -1
    },
    icon: {
        marginLeft: 2,
        marginRight: 4,
        marginTop: 2,
    },
    text: {
        fontSize: 15,
    }
});
