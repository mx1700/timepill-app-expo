import React, {Component} from 'react';
import {
  InteractionManager,
  StyleSheet,
  FlatList,
} from 'react-native';
import {View, Divider, Text} from '../Themed';

import {
  ListFooterLoading,
  ListFooterEnd,
  ListFooterFailed
} from '../listFooter';
import {ListEmptyRefreshable} from '../listEmpty';
import DiaryBrief from './diaryBrief';
import {useNavigation} from "@react-navigation/core";


class DiaryList extends Component {

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

    this.isMine = props.isMine || false;
    this.dataSource = props.dataSource;

    this.state = {
      mounting: true,
      diaries: [],

      refreshing: false,
      refreshFailed: false,

      hasMore: true,
      loadingMore: false,
      loadFailed: false
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  _onUserIconPress(diary) {
    this.navigation.push("User", {
      id: diary.user.id,
      name: diary.user.name,
    })
  }

  _onDiaryPress(index, diary) {
    //todo
    // Navigation.push(this.props.componentId, {
    //     component: {
    //         name: 'DiaryDetail',
    //         options: {
    //             bottomTabs: {
    //                 visible: false,
    //
    //                 // hide bottom tab for android
    //                 drawBehind: true,
    //                 animate: true
    //             }
    //         },
    //         passProps: {
    //             diary: diary,
    //             user: diary.user,
    //
    //             showField: this.props.showField,
    //             refreshBack: this.refreshOne.bind(this, index)
    //         }
    //     }
    // });
    this.navigation.push("Diary", {
      diary: diary,
      user: diary.user,
      showField: this.props.showField,
      refreshBack: this.refreshOne.bind(this, index)
    })
  }

  _onPhotoPress = (photoUrl) => {
    this.navigation.push("Photo", {
      url: photoUrl
    })
  }

  refreshOne(index, diary) {
    if (diary) {
      let list = this.state.diaries;
      diary.user = list[index].user;
      list[index] = diary;

      this.setState({
        diaries: list
      });
    }
  }

  async refresh() {
    if (this.state.refreshing) {
      return;
    }

    if (this.props.refreshHeader) {
      this.props.refreshHeader();
    }

    this.setState({refreshing: true, refreshFailed: false});
    this.dataSource.refresh()
      .then(result => {
        if (!result) {
          throw {
            message: 'refresh diary no result'
          }

        } else {
          this.setState({
            diaries: result.list ? result.list : [],
            hasMore: result.more,
            refreshFailed: false
          });
        }

      }).catch(e => {
      this.setState({
        refreshFailed: true
      });

    }).finally(() => {
      this.setState({
        mounting: false,
        refreshing: false
      });
    });
  }

  async loadMore() {
    if (this.state.loadingMore) {
      return;
    }

    this.setState({loadingMore: true, loadFailed: false});
    this.dataSource.refresh(true)
      .then(result => {
        if (!result) {
          throw {
            message: 'loadMore diary no result'
          }

        } else {
          this.setState({
            diaries: result.list ? result.list : [],
            hasMore: result.more,
            loadFailed: false
          });
        }

      }).catch(e => {
      this.setState({
        hasMore: false,
        loadFailed: true
      });

    }).finally(() => {
      this.setState({
        loadingMore: false
      });
    });
  }

  render() {
    if (!this.state.mounting && (!this.state.diaries || this.state.diaries.length === 0)) {
      let message = this.isMine
        ? '今天还没有写日记，马上写一篇吧'
        : '今天还没有人写日记';
      return (
        <ListEmptyRefreshable
          error={this.state.refreshFailed}
          message={message}
          onPress={this.refresh.bind(this)}

        />
      );
    }

    return (
      <View style={localStyle.container}>
        <FlatList
          ref={this.props.scrollRef}
          style={localStyle.list}

          data={this.state.diaries}

          keyExtractor={(item, index) => {
            return item.id + item.updated + item.comment_count + item.like_count;
          }}

          renderItem={({item, index}) => {
            return (
              <DiaryBrief
                {...this.props}
                diary={item}
                showField={this.props.showField}

                onDiaryPress={this._onDiaryPress.bind(this, index)}
                onUserIconPress={() => this._onUserIconPress(item)}
                onPhotoPress={() => this._onPhotoPress(item.photoUrl)}

                refreshBack={this.refreshOne.bind(this, index)}
              />
            )
          }}

          ItemSeparatorComponent={({highlighted}) => <Divider style={{height: StyleSheet.hairlineWidth}}/>}

          ListHeaderComponent={this.props.listHeader}

          ListFooterComponent={() => {
            if (this.state.refreshing || this.state.diaries.length === 0) {
              return null;
            }

            if (this.state.loadFailed) {
              return <ListFooterFailed refresh={this.loadMore.bind(this)}/>;
            }

            if (!this.state.hasMore) {
              return <ListFooterEnd/>;
            }

            return <ListFooterLoading/>;
          }}

          refreshing={this.state.refreshing}
          onRefresh={this.refresh.bind(this)}

          onEndReachedThreshold={0.2}
          onEndReached={this.state.hasMore ? this.loadMore.bind(this) : null}

          onScroll={(event) => {
            this.scrollY = event.nativeEvent.contentOffset.y;
          }}
        >
        </FlatList>
      </View>
    );
  }
}

export default React.memo(function DiaryListWarp(props) {
  const navigation = useNavigation();
  return <DiaryList {...props} navigation={navigation}/>;
});

const localStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    height: '100%'
  }
});