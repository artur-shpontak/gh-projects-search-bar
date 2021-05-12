import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { debounce } from "lodash";
import { getDataFromServer } from '../api/projects';
import { Platform } from 'react-native';
import { SearchProjectsType } from '../../types';

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
      <SearchBar
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
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
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

SearchProjects.propTypes = SearchProjectsType;
