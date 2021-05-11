import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { debounce } from "lodash";
import { getDataFromServer } from '../api/projects';

export const SearchProjects = ({ setProjects }) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedHandler = useCallback(debounce((keyword) => {
    getDataFromServer(keyword)
      .then(newProjects => setProjects(newProjects));

    setIsLoading(false);
  }, 1000), []);

  const inputHandler = useCallback((text) => {
    setSearch(text);
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    debouncedHandler(search);
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
    paddingTop: 40,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
