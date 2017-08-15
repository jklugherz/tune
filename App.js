import React from 'react';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './frontend/components/Login';
import Profile from './frontend/components/Profile';
import MyPlaylist from './frontend/components/MyPlaylist';
import SongForm from './frontend/components/SongForm';
import NewGroup from './frontend/components/NewGroup';

console.disableYellowBox = true;

const App = TabNavigator({
  Profile: { screen: Profile },
  MyPlaylist: { screen: MyPlaylist },
  SongForm: { screen: SongForm },
  NewGroup: { screen: NewGroup }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        Profile: {
          barBackgroundColor: '#ECBF3B'
        },
        MyPlaylist: {
          barBackgroundColor: '#ECBF3B'
        },
        SongForm: {
          barBackgroundColor: '#ECBF3B'
        },
        NewGroup: {
          barBackgroundColor: '#ECBF3B'
        }
      }
    }
  }
})

export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  App: {
    screen: App,
    navigationOptions: {
      header: null
    }
  }

}, {initialRouteName: 'Login'});
