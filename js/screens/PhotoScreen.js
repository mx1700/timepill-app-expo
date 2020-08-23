import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import ImageVIew from "../components/ImageVIew";
import {State} from "react-native-gesture-handler";

export default class Example extends Component {
  _onSingleTap = (event) => {
    console.log(this.props)
      console.log('_onSingleTap');
    if(this.props.navigation.canGoBack()) {
      this.props.navigation.pop()
    } else {
      this.props.navigation.replace("Root")
    }

  }

  _onDoubleTap = (event) => {
      console.log('_onDoubleTap');
  }

  _onLongPress = (event) => {
      console.log('_onHandlerStateChange');
  }

  render() {
    const url = this.props.route.params.url;
    return (
      <View style={styles.container}>
        <ImageVIew
          source={url}
          onSingleTap={this._onSingleTap}
          onDoubleTap={this._onDoubleTap}
          onLongPress={this._onLongPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  }
});
// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   ActivityIndicator,
//   CameraRoll,
//   Image
// } from "react-native";
// import moment from "moment";
// // import Toast from 'react-native-root-toast';
// // import RNFetchBlob from "rn-fetch-blob";
// // import ImageZoom from 'react-native-image-pan-zoom';
// // import Image from 'react-native-image-progress';
//
// import Msg from '../util/msg';
// import Api from '../util/api';
//
//
// export default class PhotoPage extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loading: true,
//
//       width: 0,
//       height: 0
//     };
//   }
//
//   static options(passProps) {
//     return {
//       topBar: {
//         visible: false,
//
//         // hide top bar for android
//         drawBehind: true,
//         animate: true
//       },
//       statusBar: {
//         backgroundColor: 'black'
//       },
//       bottomTabs: {
//         visible: false,
//
//         // hide bottom tab for android
//         drawBehind: true,
//         animate: true
//       }
//     };
//   }
//
//   close() {
//     Navigation.pop(this.props.componentId);
//   }
//
//   onLongPress() {
//     //todo
//     // ActionSheet.showActionSheetWithOptions({
//     //   options:['保存照片', '取消'],
//     //   cancelButtonIndex:1
//     //
//     // }, (index) => {
//     //   if(index == 0) {
//     //     this.savePhoto();
//     //   }
//     // });
//   }
//
//   async savePhoto() {
//     let msgOption = {
//       duration: 2000,
//       position: Toast.positions.BOTTOM,
//       shadow: false,
//       hideOnPress: true,
//     }
//
//     try {
//       if(Api.IS_ANDROID) {
//         let dirs = RNFetchBlob.fs.dirs;
//         let path = dirs.DownloadDir + '/timepill/' + moment().format('YYYYMMDD-hhmmss') + '.jpg';
//         let res = await RNFetchBlob
//           .config({path})
//           .fetch('GET', this.props.url, {});
//
//         await RNFetchBlob.fs.scanFile([{
//           path: res.path()
//         }]);
//
//       } else {
//         await CameraRoll.saveToCameraRoll(this.props.url);
//       }
//
//       Msg.showMsg('照片已保存', msgOption);
//
//     } catch (err) {
//       console.error(err);
//       Msg.showMsg('照片保存失败', msgOption);
//     }
//   }
//
//   render() {
//     return (
//       <View style={{flex: 1, backgroundColor: 'black'}}
//             onLayout={(event) => {
//               let {x, y, width, height} = event.nativeEvent.layout;
//               this.setState({
//                 width: width,
//                 height: height
//               })
//             }}
//       >
//         {/*<ImageZoom*/}
//         {/*  cropWidth={this.state.width}*/}
//         {/*  cropHeight={this.state.height}*/}
//
//         {/*  imageWidth={this.state.width}*/}
//         {/*  imageHeight={this.state.height}*/}
//
//         {/*  doubleClickInterval={250}*/}
//         {/*  onClick={() => this.close()}*/}
//         {/*  onLongPress={this.onLongPress.bind(this)}*/}
//         {/*>*/}
//         {/*  <Image style={{flex: 1, width: '100%', height: '100%'}}*/}
//         {/*         source={{uri: this.props.url,}}*/}
//         {/*         resizeMode="contain"*/}
//
//         {/*         indicator={loadingView}*/}
//         {/*         renderError={errorView}*/}
//         {/*  />*/}
//         {/*</ImageZoom>*/}
//       </View>
//     );
//   }
// }
//
// function loadingView(props) {
//   let process = Math.floor(props.progress * 100);
//   let text = process > 0 ? process + '%' : '';
//   return (
//     <>
//       <ActivityIndicator animating={true} color="#FFF"
//                          size={Api.IS_ANDROID ? 'large' : 'small'}/>
//       <Text style={{color: 'white', padding: 5, fontSize: 14}}>{text}</Text>
//     </>
//   )
// }
//
// function errorView(props) {
//   return (
//     <Text>加载失败</Text>
//   );
// }