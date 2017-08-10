import React from 'react';
import { Text, View, TouchableOpacity, Linking, Image, Button, TouchableHighlight } from 'react-native';
import { WebBrowser, Constants } from 'expo';
import styles from '../styles/loginPageStyle';
import Protected from './Protected';
let url = process.env.EXPO_URI

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: url
    };
  }

  static navigationOptions = {
      title: 'Login'
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/icons/app-icon.png')}
            style={{width: 100, height: 100}}
          />
        </View>
        <TouchableHighlight onPress={() => {this._openWebBrowserAsync()}}>
          <Image
            source={require('../../assets/icons/log_in-mobile.png')}
            style={{width: 200, resizeMode: 'contain', height: 200}}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _openWebBrowserAsync = async () => {
    Linking.addEventListener('url', this._handleRedirect);
    let result = await WebBrowser.openBrowserAsync(
      `http://localhost:3000/auth/login`
    );
    console.log('result', result);
    Linking.removeEventListener('url', this._handleRedirect);
  }

  _handleRedirect = (event) => {
    WebBrowser.dismissBrowser();
    console.log('event', event);
    this.setState({event: event.url});
    if (this.state.event[this.state.event.length-1] === '+') {
      const { navigate } = this.props.navigation;
      navigate('Protected')
    }
  }
};
