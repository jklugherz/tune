import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import axios from 'axios';
import Menu from './Menu';


const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5f7ff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Basic extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      selectedItem: 'Protected',
      userName: '',
      imageURL: ''
    };
  }

  static navigationOptions = {
      title: 'SideMenu'
  };

  componentWillMount() {
    const userId = this.props.navigation.state.params.userId;
    // console.log(userId);
    axios.get('http://localhost:3000/userprofile/' + userId)
    .then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log('success!')
        this.setState({
          userName: response.data.user.username,
          imageURL: response.data.user.imageURL
        })

      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected}
    avatarURL={this.state.imageURL}
    userName={this.state.userName}/>;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to TuneBud!
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
          <Text>MENU</Text>
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
