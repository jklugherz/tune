import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import axios from 'axios';

import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#e5f7ff',
  },
  innerContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: Dimensions.get('window').width * .9,
    margin: 10
  },
  avatarContainer: {
    margin: 10,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    left: 20,
    top: 10,
    fontSize: 20,
    fontWeight: '400',
  },
  titleText: [

  ]
})


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      groupsOwned: [],
      groupsMember: [],
      refreshing: false
    }
  }

  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: () => (<Icon size={24} color="white" name="account-circle" />)
  };



  fetchData = () => {
    axios.get(`http://localhost:3000/userprofile/${this.props.navigation.state.params.userId}`)
    .then((response) => {
      this.setState({
        user: response.data.user
      })
      return axios.get('http://localhost:3000/groups/allGroups')
    })
    .then((response) => {
      const groupsMember = [];
      response.data.groups.forEach((group) => {
        console.log('group', group.members)
        if (group.members.includes(this.props.navigation.state.params.userId)) {
          groupsMember.push(group);
        }
      })
      this.setState({
        groupsMember: groupsMember
      })
      return axios.get(`http://localhost:3000/groups/${this.props.navigation.state.params.userId}`)
    })
    .then((response) => {
      this.setState({
        groupsOwned: response.data.groups
      })
    })
    .catch((err) => {
      console.log('error', err)
    })
  }

  componentWillMount = () => {
    this.fetchData();
  }

  _onRefresh() {
   this.setState({refreshing: true});
   this.fetchData().then(() => {
     this.setState({refreshing: false});
   });
 }

  displayGroupsOwned = () => {
    //axios request to get username from the people ?
    return (
      <View style={styles.innerContainer}>
        {this.state.groupsOwned.map((group) => {

          // axios.get(`http://localhost:3000/userprofile/${}`)

          return <Text>{group.name}: {group.members}</Text>
        })}
      </View>
    )
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Header title={'My TuneBud Profile'} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <View style={styles.innerContainer}>
            <View
              style={styles.avatarContainer}
              >
              <Image
                style={styles.avatar}
                source={{uri: this.state.user.imageURL}}
              />
              <Text style={styles.name}>{this.state.user.username}</Text>
            </View>
          </View>
          <Text style={styles.titleText}>Groups I own: </Text>
        </ScrollView>
      </View>

    )
  }
}
