import React, {Component} from 'react';
import {StyleSheet, ScrollView, InteractionManager} from 'react-native';
import moment from 'moment';
import {View, Text, Container} from '../../components/Themed';

import Color from '../../constants/Colors';
import Api from '../../util/api';
import Msg from '../../util/msg';

import UserIcon from '../../components/userIcon'
import Loading from '../../components/Loading'

export default class UserIntro extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            isLoading: true
        };
    }

    componentDidMount() {
        Api.getSelfInfoByStore()
            .then(user => {
                this.selfInfo = user;

                InteractionManager.runAfterInteractions(() => {
                    this.refresh();
                });
            });
    }

    refresh() {
        let userId = this.state.user ? this.state.user.id : this.selfInfo.id;
        Api.getUserInfo(userId)
            .then(user => {
                this.setState({
                    user: user
                });
            })
            .catch(e => {
                Msg.showMsg('用户信息加载失败');
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            });
    }

    render() {
        if(this.state.isLoading) {
            return <Loading visible={this.state.isLoading}/>;
        }

        const user = this.state.user;
        return user ? (
          <Container style={localStyle.container}>
            <ScrollView automaticallyAdjustContentInsets={false}>
                <View style={localStyle.userIcon}>
                    <UserIcon width={90} height={90} iconUrl={user.coverUrl} />
                    <Text style={localStyle.userTitle}>{user.name}</Text>
                </View>

                {
                    user.intro && user.intro.length > 0
                    ? (<Text style={localStyle.introText}>{user.intro}</Text>) : null
                }
                
                <Text style={localStyle.joinTime}>
                    {moment(user.created).format('YYYY年M月D日')}加入胶囊
                </Text>

            </ScrollView>
          </Container>
        ) : null;
    }
}

const localStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    userIcon: {
        height: 230,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userTitle: {
        fontSize: 22,
        marginTop: 30,
        fontWeight: 'bold',
    },
    introText: {
        padding: 15,
        lineHeight: 24,
        textAlign: 'center'
    },
    joinTime: {
        marginTop: 30,
        marginBottom:60,
        padding: 15,
        color: Color.light.secondaryText,
        lineHeight: 20,
        textAlign: 'center'
    }
});
