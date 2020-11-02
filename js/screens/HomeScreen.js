import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Animated,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import {View, Text, Button} from '../components/Themed';
//todo
// import ActionSheet from 'react-native-actionsheet-api';

import Color from '../constants/Colors'
import Api from '../util/api';
//todo
// import Update from '../util/update';
import Event from '../util/event'
import HomeDiaryData from '../dataLoader/homeDiaryData';

import DiaryList from '../components/diary/diaryList';
import {useScrollToTop} from "@react-navigation/native";
import JPush from 'jpush-react-native';

export default function HomePage() {
    const ref = React.useRef(null);
    useScrollToTop(ref);
    return <_HomePage scrollRef={ref}/>
}

export class _HomePage extends Component {

    constructor(props) {
        super(props);
        this.dataSource = new HomeDiaryData();

        let splash = props.splash;
        this.state = {
            hasSplash: !!splash,

            showSplash: true,
            fadeInOpacity: new Animated.Value(0),

            splashTime: 3,
            splashImage: splash ? splash.image_url : null,
            splashLink: splash ? splash.link : null,

            topic: null
        }
    }

    componentDidMount() {
        if (this.state.hasSplash) {
            this.openSplash();
        } else {
            this.closeSplash();
        }

        if (Api.IS_ANDROID) {
            setTimeout(() => {
                //todo
                //Update.updateAndroid();
            }, 2000);
        }

        JPush.init();
        JPush.setLoggerEnable(true);
        //连接状态
        this.connectListener = result => {
            console.log("connectListener:" + JSON.stringify(result))
        };
        JPush.addConnectEventListener(this.connectListener);
        //通知回调
        this.notificationListener = result => {
            console.log("notificationListener:" + JSON.stringify(result))
        };
        JPush.addNotificationListener(this.notificationListener);
        //本地通知回调
        this.localNotificationListener = result => {
            console.log("localNotificationListener:" + JSON.stringify(result))
        };
        JPush.addLocalNotificationListener(this.localNotificationListener);
        //自定义消息回调
        this.customMessageListener = result => {
            console.log("customMessageListener:" + JSON.stringify(result))
        };
        JPush.addCustomMessagegListener(this.customMessageListener);
        //tag alias事件回调
        this.tagAliasListener = result => {
            console.log("tagAliasListener:" + JSON.stringify(result))
        };
        JPush.addTagAliasListener(this.tagAliasListener);
        //手机号码事件回调
        this.mobileNumberListener = result => {
            console.log("mobileNumberListener:" + JSON.stringify(result))
        };
        JPush.addMobileNumberListener(this.mobileNumberListener);

        JPush.setAlias({ sequence: 1, alias: "12" });

        JPush.getRegistrationID(result => console.log("registrationID:" + JSON.stringify(result)))
    }

    startTimer() {
        this.timer = setInterval(() => {
            let newTime = this.state.splashTime - 1;
            this.setState({
                splashTime: newTime
            });

            if (newTime === 0) {
                this.closeSplash();
            }

        }, 1000);
    }

    openSplash() {
        Animated.timing(
          this.state.fadeInOpacity,
          {
              toValue: 1,
              duration: 1000,
          }
        ).start(() => {
            this.startTimer();
        });
    }

    closeSplash() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        Animated.timing(
          this.state.fadeInOpacity,
          {
              toValue: 0,
              duration: 500,
          }
        ).start(() => {

            // Navigation.mergeOptions(this.props.componentId, {
            //     topBar: {
            //         visible: true,
            //         title: {
            //             text: '首页'
            //         }
            //     },
            //     bottomTabs: {
            //         visible: true,
            //
            //         drawBehind: false,
            //         animate: false
            //     }
            // });

            this.setState({
                showSplash: false
            })

        });
    }

    onSplashPress() {
        if (this.state.splashLink) {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    visible: true,
                    title: {
                        text: '首页'
                    }
                },
                bottomTabs: {
                    visible: true
                }
            });

            Navigation.push(this.props.componentId, {
                component: {
                    name: 'WebView',
                    options: {
                        bottomTabs: {
                            visible: false,

                            // hide bottom tab for android
                            drawBehind: true,
                            animate: true
                        }
                    },
                    passProps: this.state.splashLink.passProps
                }
            }).then(() => {

                this.setState({
                    showSplash: false,
                    fadeInOpacity: new Animated.Value(0)
                });
            });
        }
    }

    refreshTopic() {
        Api.getTodayTopic()
          .then(topic => {
              if (topic) {
                  this.setState({topic});
              }
          })
          .catch((err) => console.log(err))
    }

    openTopicPage() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'Topic',
                options: {
                    bottomTabs: {
                        visible: false,

                        // hide bottom tab for android
                        drawBehind: true,
                        animate: true
                    }
                },
                passProps: {
                    topic: this.state.topic,
                    title: '话题：' + this.state.topic.title
                }
            }
        });
    }


    render() {
        return (
          <View style={localStyle.wrap}>
              <DiaryList scrollRef={this.props.scrollRef}
                         dataSource={this.dataSource}
                         listHeader={this.renderHeader.bind(this)}
                         refreshHeader={this.refreshTopic.bind(this)}
                         {...this.props}
              />
          </View>
        );
        //todo: Splash
        // return (
        //   <View style={localStyle.wrap}>
        //       {
        //           this.state.showSplash ? this.renderModal() : (
        //             <DiaryList ref={(r) => this.diaryList = r}
        //                        dataSource={this.dataSource}
        //                        listHeader={this.renderHeader.bind(this)}
        //                        refreshHeader={this.refreshTopic.bind(this)}
        //                        {...this.props}
        //             />
        //           )
        //       }
        //       {/*<ActionSheet/>*/}
        //   </View>
        // );
    }

    renderHeader() {
        return this.state.topic ? (
          <View style={localStyle.topic}>
              <TouchableOpacity onPress={this.openTopicPage.bind(this)} activeOpacity={0.7}>
                  <ImageBackground
                    style={localStyle.topicBox} imageStyle={{borderRadius: 8}}
                    source={{uri: this.state.topic.imageUrl}}>
                      <Text style={localStyle.topicTitle} allowFontScaling={false}># {this.state.topic.title}</Text>
                      <Text style={localStyle.topicIntro} allowFontScaling={false}>{this.state.topic.intro}</Text>
                  </ImageBackground>
              </TouchableOpacity>
          </View>
        ) : null;
    }

    renderModal() {
        return (
          <Modal visible={this.state.hasSplash}
                 onShow={() => {
                 }}
                 onRequestClose={() => {
                 }}
          >
              <Animated.View style={{flex: 1, opacity: this.state.fadeInOpacity}}>
                  <TouchableWithoutFeedback style={{flex: 1}} onPress={this.onSplashPress.bind(this)}>
                      <ImageBackground
                        style={{flex: 1, width: '100%', height: '100%'}}
                        source={{uri: this.state.splashImage}}
                      >

                          <View style={localStyle.closeButtonWrap}>
                              <View style={localStyle.closeButtonContainer}>
                                  <Button
                                    buttonStyle={localStyle.closeButton}
                                    title={'关闭 ' + this.state.splashTime}
                                    onPress={this.closeSplash.bind(this)}
                                    textStyle={localStyle.closeButtonText}
                                  />
                              </View>
                          </View>
                      </ImageBackground>
                  </TouchableWithoutFeedback>
              </Animated.View>
          </Modal>
        );
    }
}

const localStyle = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    topic: {
        paddingTop: 0
    },
    topicBox: {
        flex: 1,
        height: 240,
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: Color.spaceBackground,
        borderRadius: 8
    },
    topicTitle: {
        fontSize: 24,
        color: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        shadowOpacity: 0.2
    },
    topicIntro: {
        fontSize: 16,
        color: '#FFF',
        paddingHorizontal: 22,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        shadowOpacity: 0.5
    },

    closeButtonWrap: {
        flexDirection: 'row-reverse',
        marginTop: Api.IS_IOS ? (Api.IS_IPHONEX ? 50 : 30) : 20
    },
    closeButtonContainer: {
        width: 80,
        backgroundColor: 'black',
        opacity: 0.75,
        borderRadius: 40,
        marginRight: 15
    },
    closeButton: {
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 0,
        backgroundColor: 'black'
    },
    closeButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        fontFamily: 'Helvetica'
    }
});
