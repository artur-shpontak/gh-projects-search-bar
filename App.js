import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { ProjectCard } from './src/components/ProjectCard';
import { SearchProjects } from './src/components/SearchProjects';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState([]);

  const renderProjectCard = (project) => (
    <ProjectCard
      initialProject={project.item}
      setFavoriteProjects={setFavoriteProjects}
      isAlreadyFavorite={favoriteProjects.some(favoriteProject => favoriteProject.id === project.item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchProjects setProjects={setProjects} />

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
    // alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#00aced',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
