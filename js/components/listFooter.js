import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import {Text, View, ActivityIndicator} from "./Themed"

import Color from '../constants/Colors';
import Api from '../util/api';


const localStyle = StyleSheet.create({
    footer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    }
});

const ListFooterLoading = () => {
    return (
        <View style={localStyle.footer}>
            <ActivityIndicator animating={true}
                size={Api.IS_ANDROID ? 'large' : 'small'} />
        </View>
    );
}

const ListFooterEnd = () => {
    return (
        <View style={localStyle.footer}>
            <Text style={{fontSize: 12}}>
                ——  THE END  ——
            </Text>
        </View>
    );
}

const ListFooterFailed = (props) => {
    let isRefreshable = props.refresh ? true : false;

    return (
        <View style={localStyle.footer}>
            <TouchableOpacity style={{marginTop: 15}}
                onPress={() => {
                    if(isRefreshable) {
                        props.refresh();
                    }
                }}
            >
                <Text lightColor={Color.light.primary} darkColor={Color.dark.primary}>
                    加载失败{isRefreshable ? '，请点击重试' : ''}
                </Text>
            </TouchableOpacity>
        </View>
    );
}


export {
    ListFooterLoading,
    ListFooterEnd,
    ListFooterFailed
}

