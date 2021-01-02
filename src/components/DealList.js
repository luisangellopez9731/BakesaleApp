import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import DealItem from './DealItem';

const DealList = ({deals, onItemPress}) => {
  return (
    <>
      <View style={[styles.list]}>
        <FlatList
          data={deals}
          renderItem={({item}) => (
            <DealItem deal={item} onPress={onItemPress} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    // paddingHorizontal: 10,
  },
});

export default DealList;
