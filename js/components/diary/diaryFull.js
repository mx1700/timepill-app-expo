import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {View, Text, Button} from '../Themed';
import Color from '../../constants/Colors';
import UserIcon from '../userIcon';
import Photo from '../photo';

import CommentList from '../comment/commentList';
import DiaryIconOkB from './diaryIconOkB';


export default class DiaryFull extends Component {

  constructor(props) {
    super(props);

    this.state = {
      diary: props.diary,
      selfInfo: props.selfInfo,

      isMine: props.isMine || false,
      expired: props.expired || false
    }

    this.showField = ['userIcon', 'userName', 'subject', 'createdTime'];
    if (props.showField && props.showField.length > 0) {
      this.showField = props.showField
    }
  }

  show(field) {
    return this.showField.indexOf(field) >= 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      diary: nextProps.diary,
      selfInfo: nextProps.selfInfo,

      isMine: nextProps.isMine || false,
      expired: nextProps.expired || false
    });
  }

  async refreshComment() {
    await this.commentList.refresh();
  }

  _onUserIconPress() {
    const user = this.state.diary.user
    this.props.navigation.push("User", {
      id: user.id,
      name: user.name,
    })
  }

  _onPhotoPress(photoUrl) {
    this.navigation.push("Photo", {
      url: photoUrl
    })
  }


  render() {
    let diary = this.state.diary;
    if (!diary) {
      return null;
    }

    let user = diary.user;

    return (
      <View>
        <View style={localStyle.box}>
          {user && user.iconUrl && this.show('userIcon')
            ? <UserIcon iconUrl={user.iconUrl} style={localStyle.userIcon}
                        onPress={this._onUserIconPress.bind(this)}/> : null}

          <View style={localStyle.body}>
            <View style={localStyle.title}>
              {user && user.name && this.show('userName')
                ? (<Text style={localStyle.titleName} numberOfLines={1}>
                    {user.name}
                  </Text>
                ) : null}

              <Text style={[localStyle.titleText, {flex: 1}]} numberOfLines={1}>
                《{diary.notebook_subject}》
              </Text>
              <Text style={localStyle.titleText}>
                {moment(diary.created).format('H:mm')}
              </Text>
            </View>

            <Text style={localStyle.content} selectable={true} selectionColor={Color.textSelect}>
              {diary.content.trim()}
            </Text>

            <Photo uri={diary.photoThumbUrl} onPress={() => this._onPhotoPress(diary.photoUrl)}/>

            <View style={localStyle.actionBar}>
              <DiaryIconOkB
                diaryId={diary.id}
                            count={diary.like_count}
                            active={diary.liked}
                            clickable={!this.state.expired}
              />
            </View>
          </View>
        </View>

        <CommentList ref={(r) => this.commentList = r}
                     {...this.props}
                     diaryId={diary.id}
                     isMine={this.state.isMine}
                     expired={this.state.expired}
        />

      </View>
    );
  }
}


const localStyle = StyleSheet.create({
  box: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  body: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 2,
    paddingBottom: 5
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingRight: 9,
    paddingBottom: 5
  },
  titleName: {
    fontWeight: 'bold',
    // color: Color.text,
    fontSize: 14
  },
  titleText: {
    fontSize: 12,
    // color: Color.inactiveText
  },
  content: {
    flexGrow: 1,
    lineHeight: 24,
    // color: Color.text,
    fontSize: 15,
    paddingRight: 5,
    textAlignVertical: 'bottom'
  },
  actionBar: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    marginTop: 15,
    justifyContent: 'flex-end'
  },
  userIcon: {
    marginTop: 3,
    marginRight: 8,
  }
});
