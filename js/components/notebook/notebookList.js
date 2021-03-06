import React, {Component} from 'react';
import {
  InteractionManager,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Container} from "../Themed"
import Api from '../../util/api';
import Notebook from './notebook'
import NotebookAdd from './notebookAdd'
import Text from "react-native-web/dist/exports/Text";

export default class NotebookList extends Component {

  constructor(props) {
    super(props);

    this.itemsPerRow = 2;
    this.state = {
      user: props.user,

      notebooks: [],
      refreshing: false
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.refresh();
    });
  }

  createGroup(items, itemsPerRow) {
    let bucket = [];
    let groups = [];

    items.forEach(function (item) {
      if (bucket.length === itemsPerRow) {
        groups.push(bucket);
        bucket = [item];

      } else {
        bucket.push(item);
      }
    });

    if (bucket.length > 0) {
      while (bucket.length < itemsPerRow) {
        bucket.push(null);
      }

      groups.push(bucket);
    }

    return groups;
  }

  _onAddPress() {
    //todo
    // Navigation.push(this.props.componentId, {
    //     component: {
    //         name: 'NotebookEdit',
    //         passProps: {
    //
    //         }
    //     }
    // });
  }

  _onNotebookPress(notebook) {
    if (this.props.onPress) {
      this.props.onPress(notebook);
      return
    }

    //todo
    // Navigation.push(this.props.componentId, {
    //     component: {
    //         name: 'NotebookDetail',
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
    //             notebook: notebook,
    //             isMine: !this.state.user
    //         }
    //     }
    // });
  }

  refresh() {
    this.setState({refreshing: true});

    let user = this.state.user;
    (user ? Api.getUserNotebooks(user.id) : Api.getSelfNotebooks())
      .then(notebooks => {
        if (!user) {
          notebooks.unshift({id: 'new'});
        }

        if (this.props.filter) {
          notebooks = notebooks.filter(this.props.filter);
        }

        let groups = this.createGroup(notebooks, this.itemsPerRow);
        this.setState({
          notebooks: groups
        });

      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        this.setState({refreshing: false});
      });
  }

  _renderAdd() {
    return (<NotebookAdd
      key='new'
      onPress={() => this._onAddPress()}/>);
  }

  _renderPlaceHolder() {
    return <View key="placeholder" style={{width: 140}}/>;
  }

  _renderItem(notebook) {
    return notebook ? (
      <TouchableOpacity
        key={notebook.id} activeOpacity={0.7}
        onPress={() => this._onNotebookPress(notebook)}>

        <Notebook key={notebook.id} notebook={notebook}/>

      </TouchableOpacity>
    ) : null
  }

  render() {
    let hasData = this.state.notebooks && this.state.notebooks.length > 0;
    return hasData ? (
      <Container style={localStyle.container}>
        <FlatList
          style={localStyle.list}
          contentContainerStyle={localStyle.listContent}
          data={this.state.notebooks}

          keyExtractor={(item, index) => {
            return item[0].id.toString();
          }}

          renderItem={({item, index}) => {
            let row = item.map((notebook) => {
                if(!notebook) {
                    return this._renderPlaceHolder();

                } else if(notebook.id === 'new') {
                    return this._renderAdd();
                }

                return this._renderItem(notebook);
            });

            return (
                <View style={localStyle.row}>
                    {row}
                </View>
            );
          }}
          refreshing={this.state.refreshing}
          onRefresh={this.refresh.bind(this)}
        />
      </Container>
    ) : null;
  }
}

const localStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    height: '100%',
  },
  listContent: {
    padding: 10
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    marginBottom: 15
  }
});

