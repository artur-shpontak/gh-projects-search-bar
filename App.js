import React from 'react';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SearchScreen } from './src/screens/SearchScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';

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
