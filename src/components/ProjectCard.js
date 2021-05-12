import React, { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { ProjectCardType } from '../../types';

export const ProjectCard = ({
  initialProject,
  setFavoriteProjects,
  isAlreadyFavorite
}) => {
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);
  const { owner, full_name, stargazers_count, description, html_url, language, id } = initialProject;

  return (
    <ListItem>
      <Avatar rounded source={{ uri: owner.avatar_url }} />
      <ListItem.Content>
        <ListItem.Title>{full_name}</ListItem.Title>
        <ListItem.Subtitle>Rating: {stargazers_count}</ListItem.Subtitle>
        <ListItem.Subtitle>{description}</ListItem.Subtitle>
        <ListItem.Subtitle>Language: {language}</ListItem.Subtitle>
        <ListItem.Subtitle
          style={{color: '#00aced'}}
          onPress={async() => {
            const supported = await Linking.canOpenURL(html_url);

            if (!supported) {
              Alert.alert(`Don't know how to open this URL: ${html_url}`);

              return;
            }

            await Linking.openURL(html_url);
          }}
        >
          Link
        </ListItem.Subtitle>
      </ListItem.Content>
      {!isFavorite
        && (
          <Icon
            reverse
            name='favorite'
            color='#00aced'
            onPress={() => {
              setIsFavorite(true);
              setFavoriteProjects(prevProjects => [...prevProjects, initialProject]);
            }}
          />
        )
      }
    </ListItem>
  );
};

ProjectCard.defaultProps = {
  description: 'There is no description',
  language: 'not specified',
  stargazers_count: 0,
}

ProjectCard.propTypes = ProjectCardType;
