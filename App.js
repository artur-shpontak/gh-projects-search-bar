import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchProjects } from './src/components/SearchProjects';

export default function App() {
  const [projects, setProjects] = useState([]);

  return (
    <View style={styles.container}>
      <SearchProjects setProjects={setProjects} />
      {projects.length > 0
        && (
          <Text style={styles.text}>{`Projects found: ${projects.length}`}</Text>
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
    justifyContent: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
