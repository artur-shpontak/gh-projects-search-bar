import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { debounce } from "lodash";

const BASE_URL = 'https://api.github.com/search/repositories?q=';

export default function App() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedHandler = useCallback(debounce(async(text) => {
    const endpoint = BASE_URL + text.split(' ').join('_');
    console.log(endpoint);

    const response = await fetch(endpoint);
    //TODO add error message if there was too many requests in a short time(GitHub API throws 403 error)
    const result = await response.json();

    console.log(result);

    setIsLoading(false);
  }, 1000), []);

  const inputHandler = useCallback((text) => {
    setIsLoading(true);
    setSearch(text);
    debouncedHandler(text);
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GitHub projects search</Text>
      <StatusBar style="auto" />
      <SearchBar
        platform="android"
        placeholder="Type here..."
        value={search}
        onChangeText={inputHandler}
      />
      {isLoading
        && search.length > 0
        && (
          <ActivityIndicator color="#ccc" size="large" />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008b8b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // searchBar: {
  //   marginTop: '10px',
  // },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    // fontVariant: ['proportional-nums'],
  },
  errorMessage: {
    color: '#ff4d4d',
  }
});
