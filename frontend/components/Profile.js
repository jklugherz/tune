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
  RefreshControl,
  Modal
} from 'react-native';
import axios from 'axios';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';


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
  searchStyle: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
  searchTitle: {
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 10
  }
})


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      user: {},
      groupsOwned: [],
      groupsMember: [],
      song: '',
      chosenGroup: {},
      songResult: {},
      refreshing: false
    }
  }

  static navigationOptions = {
    tabBarLabel: 'My Profile',
    tabBarIcon: () => (<Icon size={24} color="white" name="account-circle" />)
  };

  fetchData = () => {
    //get current user profile
    axios.get(`http://localhost:3000/userprofile/${this.props.navigation.state.params.userId}`)
    .then((response) => {
      this.setState({
        user: response.data.user
      })
      return axios.get(`http://localhost:3000/groups/member/${this.props.navigation.state.params.userId}`)
    })
    //get groups that current user is a member of
    .then((response) => {
      this.setState({
        groupsMember: response
      })
      return axios.get(`http://localhost:3000/groups/${this.props.navigation.state.params.userId}`)
    })
    //get groups that current user owns
    .then((response) => {
      this.setState({
        groupsOwned: response.data.groups
      })
    })
    //
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

  // getMemberProfile = (group) => {
  //   return group.members.map((memberId) => {
  //     axios.get(`http://localhost:3000/userprofile/${memberId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       return <Text>{response.data.user.username}</Text>
  //     })
  //     .catch((err) => {
  //       console.log('error', err)
  //     })
  //   })
  // }


  displayGroupsOwned = () => {
    if (this.state.groupsOwned.length > 0) {
      return this.state.groupsOwned.map((group) => {
        return <TouchableOpacity key={group._id}><Text>
          {group.name}: {group.members}
        </Text></TouchableOpacity>
      })
    } else {
      return;
    }
  }
  //
  displayOtherGroups = () => {
    if (this.state.groupsOwned.length > 0) {
      return this.state.groupsMember.map((group) => {
        return <TouchableOpacity key={group._id}><Text>
          {group.name}: {group.owner}(owner), {group.members}
        </Text></TouchableOpacity>
      })
    } else {
      return;
    }
  }

  onFormSubmit = () => {
    this.setState({
      modalVisible: true
    })
  }

  handleChangeText = (song) => {
    const songTitle = song.replace(' ', '%20')
    this.setState({
      song: songTitle
    })
  }

  onModalSubmit = () => {
    // this.setState({
    //   modalVisible: false
    // })
    var options = {
      headers: {
        'Authorization': 'Bearer ' + this.state.user.accessToken,
      }
    };

    axios.get(`https://api.spotify.com/v1/search?q=${this.state.song}&type=song`, options)
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log('error', err)
    })


  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'My TuneBud Profile'} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight onPress={() => {
                this.onModalSubmit()
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
          <Text style={styles.titleText}>Send a song </Text>
          <View style={styles.innerContainer}>
            <Text style={styles.searchTitle}>1. Search for a song: </Text>
            <SearchBar
              round={true}
              lightTheme
              containerStyle={styles.searchStyle}
              onChangeText={(text) => this.handleChangeText(text)}
              placeholder='Search by song title...' />
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.searchTitle}>2. Pick a group: </Text>
            <Text>Groups I own: </Text>
            {this.displayGroupsOwned()}
            <Text>Groups I'm a part of: </Text>
            {/* {this.displayOtherGroups()} */}
          </View>
          <Button
            raised
            title='Submit'
            backgroundColor='#648f00'
            buttonStyle={{ marginTop: 10, width: Dimensions.get('window').width * .4, alignSelf: 'center' }}
            onPress={() => this.onModalSubmit()}
          />
        </ScrollView>
      </View>

    )
  }
}
