import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { ProjectCard } from '../components/ProjectCard';
import { SearchProjects } from '../components/SearchProjects';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const SearchScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState([]);

  const saveFavorites = async() => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteProjects));
    } catch (error) {
      alert(error);
    }
  }

  const loadFavorites = async() => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');

      if (favorites !== null) {
        setFavoriteProjects(JSON.parse(favorites));
      }
    } catch (error) {
      alert(error)
    }
  }

  const isAlreadyFavorite = useCallback((project) => {
    return favoriteProjects
      .some(favoriteProject => favoriteProject.id === project.id);
  }, [favoriteProjects]);

  useEffect(() => {
    saveFavorites();
  }, [favoriteProjects]);

  useEffect(() => {
    loadFavorites();

    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, []);

  const renderProjectCard = useCallback((project) => (
    <ProjectCard
      initialProject={project.item}
      setFavoriteProjects={setFavoriteProjects}
      isAlreadyFavorite={isAlreadyFavorite(project.item)}
    />
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchProjects setProjects={setProjects} />

      {/* TODO create ProjectList component */}
      {projects.length > 0
        && (
          <FlatList
            data={projects}
            renderItem={renderProjectCard}
            keyExtractor={project => project.id.toString()}
          />
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#00aced',
  },
});
