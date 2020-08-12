import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    Animated,
    LayoutAnimation,
    InteractionManager,
    Linking
} from 'react-native';
import { Text, View } from '../../components/Themed';

import Api from '../../util/api';

import Loading from '../../components/Loading';
import LoginForm from './loginForm';
import RegisterEmailForm from './registerEmailForm';
import RegisterMobileForm from './registerMobileForm';
import AuthContext from "../../util/AuthContext";


export default class App extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = ({
            page: App.pageLogin,
            
            isLoading: false,
            paddingAnim: new Animated.Value(100)

        });
    }

    componentDidMount() {
        // this.keyboardDidShowListener =
        //     Keyboard.addListener(Api.IS_IOS ? 'keyboardWillShow' : 'keyboardDidShow', this._keyboardDidShow);
        // this.keyboardDidHideListener =
        //     Keyboard.addListener(Api.IS_IOS ? 'keyboardWillHide' : 'keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        Animated.timing(
            this.state.paddingAnim,
            {
                toValue: Api.IS_IOS ? 65 : 35,
                duration: 250
            }
        ).start();
    };

    _keyboardDidHide = () => {
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(
                this.state.paddingAnim,
                {toValue: 100, duration: 250 }
            ).start();
        });
    };

    static pageLogin = 1;
    static pageRegisterMobile = 2;
    static pageRegisterEmail = 3;

    _setLoading(value) {
        this.setState({isLoading: value});
    }

    _onSucc() {
        this.context.setLogin(true)
    }

    render() {
        return (
          <View style={localStyle.wrap}>
            <Loading visible={this.state.isLoading} />
            <Animated.View style={[localStyle.content, {paddingTop: this.state.paddingAnim}]}>
                {this.renderForm()}
                
                <View style={localStyle.bottom}>
                    <TouchableOpacity onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        if(this.state.page === App.pageLogin) {
                            this.setState({page: App.pageRegisterMobile});
                        } else {
                            this.setState({page: App.pageLogin});
                        }
                    }}>
                        <Text style={localStyle.bottomText}>
                            {this.state.page === App.pageLogin ? '没有账号？注册一个' : '已有账号？马上登录'}
                        </Text>
                    </TouchableOpacity>

                    {this.renderActionLink()}

                </View>
            </Animated.View>
          </View>
        );
    }

    renderForm() {
        if(this.state.page === App.pageLogin) {
            return (
                <LoginForm
                    setLoading={this._setLoading.bind(this)}
                    onLoginSucc={this._onSucc.bind(this)}
                />
            );

        } else if(this.state.page === App.pageRegisterMobile) {
            return (
                <RegisterMobileForm
                    setLoading={this._setLoading.bind(this)}
                    onRegisterSucc={this._onSucc.bind(this)}
                />
            );

        } else if(this.state.page === App.pageRegisterEmail) {
            return (
                <RegisterEmailForm
                    setLoading={this._setLoading.bind(this)}
                    onRegisterSucc={this._onSucc.bind(this)}
                />
            );
        }

        return null;
    }

    renderActionLink() {
        if(this.state.page === App.pageLogin) {
            return (
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://timepill.net/home/forgot_password").done();
                }}>
                    <Text style={localStyle.bottomText}>
                        忘记密码？
                    </Text>
                </TouchableOpacity>
            );
        }

        return null;
    }
}

const localStyle = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 15
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 22,
        paddingHorizontal: 5
    },
    bottomText: {
        fontSize: 14,
        // color: Color.primary,
        padding: 10
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
});
