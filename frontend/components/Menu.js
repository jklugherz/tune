import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');
//const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  item: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 10,

  },
});

export default function Menu({ onItemSelected, avatarURL, userName }) {

  onLogoutPress = () => {
  }

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: avatarURL}}
        />
        <Text style={styles.name}>{userName}</Text>
      </View>

      <Text
        onPress={() => onItemSelected('Protected')}
        style={styles.item}
      >
        My Groups
      </Text>

      <Text
        onPress={() => onItemSelected('Protected2')}
        style={styles.item}
      >
        My Playlist
      </Text>
      <Text
        onPress={() => onItemSelected('Protected2')}
        style={styles.item}
      >
        Send a Song
      </Text>
      <TouchableOpacity
        onPress={() => this.onLogoutPress()}
      ><Text style={styles.item}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  avatarURL: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};
