import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import SingleLineInput from '../components/SingleLineInput';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import HeaderButton from '../../../components/HeaderButton';
import Container from '../../../components/Container';

const mock = {
  mockEmptyValue: '',
};

class PasswordSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: screensList.PasswordSetting.title,
    headerRight: <HeaderButton title={t.DONE_BUTTON} onPress={() => {}} color={'#fff'} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    userId: PropTypes.string.isRequired,
  };

  render() {
    const { userId } = this.props;
    return (
      <Container>
        <Text style={styles.intro}>{t.INTRO}</Text>

        <SingleLineDisplay title={t.ID_TITLE} value={userId} style={styles.idContainer} />

        <SingleLineInput
          isPassword
          title={t.ORIGINAL_PASSWORD}
          onChangeText={() => {}}
          placeholder={t.ORIGINAL_PASSWORD_PLACEHOLDER}
          value={mock.mockEmptyValue}
        />
        <SingleLineInput
          isPassword
          title={t.NEW_PASSWORD}
          onChangeText={() => {}}
          placeholder={t.NEW_PASSWORD_PLACEHOLDER}
          value={mock.mockEmptyValue}
        />
        <SingleLineInput
          isPassword
          title={t.CONFIRM_PASSWORD}
          onChangeText={() => {}}
          placeholder={t.CONFIRM_PASSWORD_PLACEHOLDER}
          value={mock.mockEmptyValue}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.appState.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordSettingScreen);

const t = {
  ORIGINAL_PASSWORD: 'original password',
  ORIGINAL_PASSWORD_PLACEHOLDER: 'Enter original password',
  NEW_PASSWORD: 'new password',
  NEW_PASSWORD_PLACEHOLDER: 'Enter new password',
  CONFIRM_PASSWORD: 'confirm password',
  CONFIRM_PASSWORD_PLACEHOLDER: 'Enter new password again',
  ID_TITLE: 'Genesis ID',
  INTRO: 'Log in Genesis Space with your Genesis ID and new password after setting.',
  DONE_BUTTON: 'Done',
};

const styles = StyleSheet.create({
  intro: {
    color: AppStyle.lightGrey,
    padding: 30,
    paddingBottom: 0,
    fontSize: AppStyle.fontMiddleSmall,
  },
  idContainer: {
    marginVertical: 40,
  },
});
