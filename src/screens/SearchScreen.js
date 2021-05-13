import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProjectCard } from '../components/ProjectCard';
import { SearchProjects } from '../components/SearchProjects';
import { StatusBar } from 'react-native';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native';

export const SearchScreen = () => {
  const [projects, setProjects] = useState([]);
  // const [favoriteProjects, setFavoriteProjects] = useState(SyncStorage.get('favorites') ?? []);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);

  // useEffect(() => {
  //   SyncStorage.set('favorites', [...favoriteProjects]);
  // }, [favoriteProjects]);

  const renderProjectCard = useCallback((project) => (
    <ProjectCard
      initialProject={project.item}
      setFavoriteProjects={setFavoriteProjects}
      isAlreadyFavorite={favoriteProjects.some(favoriteProject => favoriteProject.id === project.item.id)}
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
