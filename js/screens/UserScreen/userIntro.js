import React, {Component} from 'react';
import {StyleSheet, ScrollView, InteractionManager} from 'react-native';
import moment from 'moment';
import {View, Text, Container, Button} from '../../components/Themed';

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
            followed: 0,
            isLoading: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refresh();
        });
    }

    _onAddFollow() {
        Api.addFollow(this.state.user.id)
          .then(() => {
              this.setState({
                  followed: 1
              });

              alert('已关注');
          })
          .catch(e => {
              alert('关注失败');
          })
    }

    _onDeleteFollow() {
        Api.deleteFollow(this.state.user.id)
          .then(() => {
              this.setState({
                  followed: -1,
              });

              alert('已取消关注');
          })
          .catch(e => {
              alert('取消关注失败');
          })
    }

    refresh() {
        if (!this.props.isSelf) {
            Api.getRelation(this.state.user.id)
              .then(re => {
                  const followed = re ? 1 : -1;
                  this.setState({
                      followed: followed
                  });
              });
        }
    }

    render() {
        if(this.state.isLoading) {
            return <Loading visible={this.state.isLoading}/>;
        }

        const user = this.state.user;
        const followed = this.state.followed;

        return user ? (
          <Container style={localStyle.container}>
            <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={{alignItems: 'center'}}>
                <View style={localStyle.userIcon}>
                    <UserIcon width={90} height={90} iconUrl={user.coverUrl} />
                    {
                        followed < 0
                          ? <Button title="+ 关注"
                                    type="outline"
                                    buttonStyle={localStyle.followButton}
                                    onPress={this._onAddFollow.bind(this)}
                                    titleStyle={{fontSize: 14}}
                          />
                          : (
                            followed > 0
                              ? <Button title="取消关注"
                                        outline={true}
                                        buttonStyle={localStyle.followButton}
                                        onPress={this._onDeleteFollow.bind(this)}
                                        titleStyle={{fontSize: 15}}
                              />
                              : null
                          )
                    }
                    <Text style={localStyle.userTitle}>{user.name}</Text>
                </View>
                <View style={localStyle.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                {
                    user.intro && user.intro.length > 0
                    ? (<Text style={localStyle.introText}>{user.intro}</Text>) : null
                }
                <View style={localStyle.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
        marginTop: 50,
        marginBottom: 20,
        flex: 1,
        alignItems: 'center',
    },
    followButton: {
        width: 95,
        height: 35,
        paddingBottom: 12,
        marginTop: 30,
        marginBottom: 2,    //修复底部少1px问题
    },
    userTitle: {
        fontSize: 22,
        marginTop: 30,
        fontWeight: 'bold',
},
    introText: {
        paddingVertical: 15,
        lineHeight: 24,
        textAlign: 'center',
        width: "80%"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%"
    },
    joinTime: {
        marginBottom:35,
        padding: 15,
        color: Color.light.secondaryText,
        lineHeight: 20,
        textAlign: 'center'
    }
});