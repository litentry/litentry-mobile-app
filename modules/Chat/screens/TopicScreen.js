import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import TinodeAPI from '../TinodeAPI';
import { makeImageUrl } from '../lib/blob-helpers';
import MessageNode from '../components/MessageNode';
import Images from '../../../commons/Images';
import { Ionicons } from '@expo/vector-icons';
import {topicsAction} from "../actions/topicsAction";

class TopicScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screensList.TopicInfo.label, {
            topicId: navigation.getParam('topicId', null),
            title: navigation.getParam('title', null),
          })
        }
        color="black"
        style={styles.dotContainer}>
        <Entypo
          name="dots-three-horizontal"
          size={AppStyle.fontMiddle}
          style={styles.dot}
          color={AppStyle.lightGrey}
        />
      </TouchableOpacity>
    ),
    headerBackTitle: '',
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    topicsMap: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    subscribedChatId: PropTypes.string,
    connected: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired,
    updateUserInput: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { navigation, userId, subscribedChatId, connected } = this.props;
    const topicId = navigation.getParam('topicId', null);
    if (connected && subscribedChatId !== topicId) {
      if (subscribedChatId !== null) TinodeAPI.unsubscribe(subscribedChatId);
      TinodeAPI.subscribe(topicId, userId);
    }
  }

  renderMessageNode(message, topic) {
    const { userId, avatar, userInfo } = this.props;
    let messageOwnerName;
    let messageOwnerAvatar;
    if (message.from === userId) {
      messageOwnerAvatar = { uri: avatar };
      messageOwnerName = userInfo.name;
    } else {
      const messageOwner = _.find(topic.subs, { user: message.from });
      if (messageOwner && messageOwner.public.photo) {
        messageOwnerAvatar = { uri: makeImageUrl(messageOwner.public.photo) };
        messageOwnerName = messageOwner.public.fn;
      } else {
        //EXPO compile the the image as a number in image tree
        messageOwnerAvatar = Images.blankProfile;
        messageOwnerName = message.from;
      }
    }
    return (
      <MessageNode
        message={message}
        imageSource={messageOwnerAvatar}
        senderName={messageOwnerName}
      />
    );
  }

  render() {
    const { topicsMap, navigation, updateUserInput } = this.props;
    const topicId = navigation.getParam('topicId', null);
    const topic = _.get(topicsMap, topicId);
    if (!topic) return null;
    const { messages } = topic;
    if (!messages) return null;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          data={messages}
          keyExtractor={message => message.seq.toString()}
          renderItem={({ item }) => this.renderMessageNode(item, topic)}
        />
        <View style={styles.actionBar}>
            <TextInput onChangeText={(userInput)=>{updateUserInput(topicId, userInput)}} value={topic.userInput} style={styles.input}/>
            <Ionicons
              name="md-add-circle-outline"
              size={AppStyle.fontMiddleBig}
              color={'black'}
              style={styles.actionButton}
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  topicsMap: state.topics.topicsMap,
  userId: state.chat.userId,
  subscribedChatId: state.chat.subscribedChatId,
  connected: state.chat.connected,
  avatar: state.chat.avatar,
  userInfo: state.chat.userInfo,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserInput: topicsAction.updateUserInput
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
    position: 'relative',
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    padding: 10,
  },
  actionBar: {
    borderTopWidth:1,
    borderTopColor: AppStyle.chatActionBackgroundColor,
    flexDirection: 'row',
    position: 'absolute',
    bottom:0,
    width: '100%',
    backgroundColor: AppStyle.chatActionBackgroundColor,
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: AppStyle.chatActionBackgroundColor,
        shadowOffset: {
          width: 0,
          height: -0.5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.11,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButton: {
    padding:20,
    paddingLeft: 0,
  },
});
