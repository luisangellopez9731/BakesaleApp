import React, {useState, useRef} from 'react';
import debounce from 'lodash.debounce';

import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function SearchBar({searchDeals, initialSearchTerm}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const inputRef = useRef(null)

  const searchDealsLocal = (searchTerm) => {
    searchDeals(searchTerm)

    inputRef.current.blur()
  }

  const debounceSearchDeals = debounce(searchDealsLocal, 1000);
  const handleChange = (searchTerm_) => {
    setSearchTerm(searchTerm_);
    debounceSearchDeals(searchTerm_);
  };

  

  return (
    <TextInput
      ref={inputRef}
      placeholder="Type to Search..."
      style={styles.input}
      onChangeText={handleChange}
      value={searchTerm}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 40,
    // backgroundColor: 'white'
  },
});
