import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Images from '../../../commons/Images';
import SmallCard from '../../../components/SmallCard';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
const { width } = Dimensions.get('window');

class WalletCreateInnerScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: screensList.WalletCreate.title,
    headerBackTitle: null,
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  createWallet = () => {

  };

  gotoImport = () => {
    this.props.navigation.navigate(screensList.WalletImport.label);
  };

  render() {
    return (
      <View style={styles.container}>
        <SmallCard
          style={styles.card}
          title={t.createTitle}
          subtitle={t.createSubtitle}
          imageCard={Images.imgCardCreate}
          onPress={this.createWallet}
          subtitleTextStyle={styles.subtitle}
        />

        <SmallCard
          style={styles.card}
          title={t.importTitle}
          subtitle={t.importSubtitle}
          imageCard={Images.imgCardImport}
          onPress={this.gotoImport}
          subtitleTextStyle={styles.subtitle}
        />
      </View>
    );
  }
}

export default withNavigation(WalletCreateInnerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 40,
  },
  subtitle: {
    color: AppStyle.secondaryTextColor,
    marginTop: 4,
    fontSize: 16,
  },
});

const t = {
  createTitle: 'Create',
  createSubtitle: 'a new wallet',
  importTitle: 'Import',
  importSubtitle: 'existing wallet',
};
