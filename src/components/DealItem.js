import React from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {priceDisplay} from '../util';

const DealItem = ({deal, onPress}) => {
  const handlePress = () => {
    onPress(deal.key);
  };

  return (
    <>
      <TouchableOpacity style={[styles.container]} onPress={handlePress}>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <View style={[styles.infoContainer]}>
          <Text style={[styles.title]}>{deal.title}</Text>
          <View style={[styles.infoBottomContainer]}>
            <Text style={[styles.secondaryText]}>{deal.cause.name}</Text>
            <Text style={[styles.secondaryText]}>
              {priceDisplay(deal.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, .3)',
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  infoBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryText: {
    color: '#555',
  },
});

export default DealItem;
