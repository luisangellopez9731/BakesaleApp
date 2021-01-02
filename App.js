import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {fetchInitialDeals, fetchDealsSearchResults} from './src/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';

class App extends React.Component {
  titleXPos = new Animated.Value(0);
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
    activeSearchTerm: '',
  };

  setCurrentDeal = (dealId) => {
    this.setState(() => ({
      currentDealId: dealId,
    }));
  };

  unSetCurrentDeal = () => {
    this.setState(() => ({
      currentDealId: null,
    }));
  };

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId,
    );
  };

  searchDeals = (searchTerm) => {
    if (searchTerm) {
      fetchDealsSearchResults(searchTerm).then((dealsFromSearch_) => {
        this.setState(() => ({
          dealsFromSearch: dealsFromSearch_,
        }));
      });
    } else {
      this.setState(() => ({
        dealsFromSearch: [],
      }));
    }
    this.setState(() => ({
      dealsactiveSearchTermFromSearch: searchTerm,
    }));
  };

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 130;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease,
    }).start(({finished}) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };

  componentDidMount() {
    this.animateTitle();
    fetchInitialDeals().then((res) => {
      this.setState(() => ({
        deals: res,
      }));
    });
  }

  render() {
    const {
      deals,
      currentDealId,
      activeSearchTerm,
      dealsFromSearch,
    } = this.state;
    return (
      <>
        {currentDealId !== null ? (
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unSetCurrentDeal}
          />
        ) : (
          <View style={[styles.container]}>
            {deals.length > 0 ? (
              <View>
                <SearchBar
                  initialSearchTerm={activeSearchTerm}
                  searchDeals={this.searchDeals}
                />
                <DealList
                  deals={dealsFromSearch.length > 0 ? dealsFromSearch : deals}
                  onItemPress={this.setCurrentDeal}
                />
              </View>
            ) : (
              <Animated.View
                style={[{left: this.titleXPos}, styles.loadingContainer]}>
                <Text style={[styles.header]}>Bakesale</Text>
                <Text>Loading...</Text>
              </Animated.View>
            )}
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
