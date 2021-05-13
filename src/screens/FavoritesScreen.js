import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ProjectCard } from '../components/ProjectCard';

export const FavoritesScreen = ({ navigation }) => {
  const [favoriteProjects, setFavoriteProjects] = useState([]);

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

  useEffect(() => {
    loadFavorites();

    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, []);

  const isAlreadyFavorite = useCallback((project) => {
    return favoriteProjects
      .some(favoriteProject => favoriteProject.id === project.id);
  }, [favoriteProjects]);

  const renderProjectCard = useCallback((project) => (
    <ProjectCard
      initialProject={project.item}
      setFavoriteProjects={setFavoriteProjects}
      isAlreadyFavorite={isAlreadyFavorite(project)}
      isFavorites
    />
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      {favoriteProjects.length > 0
        && (
          <FlatList
            data={favoriteProjects}
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
