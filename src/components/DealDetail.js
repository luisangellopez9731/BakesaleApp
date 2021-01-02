import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking,
  ScrollView,
} from 'react-native';

import {priceDisplay} from '../util';

import {fetchDealDetail} from '../ajax';

class DealDetail extends React.Component {
  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  width = Dimensions.get('window').width;

  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return true;
    },
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        //Swipe left
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
    },
  });

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
      return;
    }
    this.setState(
      (prevState) => ({
        imageIndex: prevState.imageIndex + indexDirection,
      }),
      () => {
        this.imageXPos.setValue(this.width * indexDirection);
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      },
    );
  };

  openDealUrl = () => {
    console.log(this)
    Linking.openURL(this.state.deal.url);
  }

  componentDidMount() {
    fetchDealDetail(this.state.deal.key).then((dealDetail) => {
      this.setState(() => ({
        deal: dealDetail,
      }));
    });
  }

  render() {
    const {deal, imageIndex} = this.state;
    return (
      <>
        <View style={[styles.container]}>
          <TouchableOpacity onPress={this.props.onBack}>
            <Text style={[styles.backLink]}>Back</Text>
          </TouchableOpacity>
          <Animated.Image
            {...this.imagePanResponder.panHandlers}
            source={{uri: deal.media[imageIndex]}}
            style={[{left: this.imageXPos}, styles.image]}
          />
          <View style={[styles.infoContainer]}>
            <Text style={[styles.title]}>{deal.title}</Text>
            <ScrollView style={[styles.infoPriceUserScrollContainer]}>
              <View style={[styles.infoPriceUserContainer]}>
                <View style={[styles.infoPriceOrUserContainer]}>
                  <Text style={[styles.bold]}>{priceDisplay(deal.price)}</Text>
                  <Text style={[styles.secondaryText]}>{deal.cause.name}</Text>
                </View>
                <View style={[styles.infoPriceOrUserContainer]}>
                  {deal.user && (
                    <>
                      <Image
                        source={{uri: deal.user.avatar}}
                        style={[styles.userAvatar]}
                      />
                      <Text>{deal.user.name}</Text>
                    </>
                  )}
                </View>
              </View>
              <View>{deal.description && <Text>{deal.description}</Text>}</View>
            </ScrollView>
          </View>
          <Button title="Buy this deal!" onPress={this.openDealUrl} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoPriceUserScrollContainer: {
    flex: 1,
  },
  infoPriceUserContainer: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  infoPriceOrUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .3)',
  },
  secondaryText: {
    color: '#555',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    paddingHorizontal: 10,
  },
});

export default DealDetail;
