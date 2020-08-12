import React, {Component} from 'react';
import {StyleSheet, InteractionManager, Alert} from 'react-native';
import { Text, View, Input, Button } from '../../components/Themed';

import Color from '../../constants/Colors';
import Api from '../../util/api';
import Msg from '../../util/msg';


export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            username: '',
            password: ''
        });
    }

    async login() {
        let isLoginSucc, errMsg = '账号或密码不正确';

        try {
            isLoginSucc = await Api.login(this.state.username, this.state.password);
        } catch (err) {
            errMsg = err.message;
        }

        return {
            isLoginSucc,
            errMsg
        }
    }

    _checkResult(result) {
        InteractionManager.runAfterInteractions(() => {
            if(result.isLoginSucc) {
                this.props.onLoginSucc();

            } else {
                alert(result.errMsg)
                Alert.alert(
                    result.errMsg,
                    '',
                    [
                        {text: '确定', onPress: () => {}},
                    ],
                    {cancelable: false}
                );
            }
        });
    }

    _clickLogin() {
        if(!this.state.username) {
            Msg.showMsg('请输入邮箱/手机');
            return;
        }
        if(!this.state.password) {
            Msg.showMsg('请输入密码');
            return;
        }

        this.props.setLoading(true);
        this.login().then(result => {
            this.props.setLoading(false);
            this._checkResult(result);
        });
    }

    render() {return (
        <View>
            <Text style={localStyle.title}>{'欢迎来到胶囊日记'}</Text>

            <View style={localStyle.form}>
                <Input
                    selectionColor={Color.primary}
                    underlineColorAndroid='transparent'
                    keyboardType='email-address'
                    value={this.state.username}

                    autoCorrect={false}
                    autoFocus={false}
                    autoCapitalize='none'
                    
                    placeholderTextColor={Color.inactiveText}
                    placeholder='账号邮箱'
                    returnKeyType="next"

                    onChangeText={(text) => this.setState({username: text})}
                    onSubmitEditing={() => {}}
                />

                <Input
                    selectionColor={Color.primary}
                    underlineColorAndroid='transparent'

                    value={this.state.password}
                    secureTextEntry={true}
                    selectTextOnFocus={true}
                    autoCorrect={false}
                    
                    placeholder='登录密码'
                    placeholderTextColor={Color.inactiveText}
                    returnKeyType='done'

                    onChangeText={(text) => this.setState({password: text})}
                    onSubmitEditing={this._clickLogin.bind(this)}
                />
            </View>

            <Button title={'登录'}
                onPress={this._clickLogin.bind(this)}
            />
        </View>
    );}
}

const localStyle = StyleSheet.create({
    title: {
        fontSize: 26,
        paddingBottom: 35,
        textAlign: 'center'
    },
    form: {
        paddingBottom: 20,
    }
});