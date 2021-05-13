import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { ProjectCard } from './src/components/ProjectCard';
import { SearchProjects } from './src/components/SearchProjects';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SyncStorage from 'sync-storage';

function SearchScreen() {
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
    <View style={styles.container}>
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
    </View>
  );
}

function FavoritesScreen() {
  // const [favoriteProjects, setFavoriteProjects] = useState(SyncStorage.get('favorites') ?? []);
  const [favoriteProjects, setFavoriteProjects] = useState([]);

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
    <View style={styles.container}>
      {favoriteProjects.length > 0
        && (
          <FlatList
            data={projects}
            renderItem={renderProjectCard}
            keyExtractor={project => project.id.toString()}
          />
        )
      }
    </View>
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

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="search" color={focused ? '#00aced' : '#748c94'} />
            )
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="favorite" color={focused ? '#00aced' : '#748c94'} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
