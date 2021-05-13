import PropTypes from 'prop-types';

export const SearchProjectsType = {
  setProjects: PropTypes.func.isRequired,
}

export const ProjectCardType = {
  initialProject: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
    full_name: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number,
    description: PropTypes.string,
    html_url: PropTypes.string.isRequired,
    language: PropTypes.string,
    id: PropTypes.number.isRequired
  }).isRequired,
  setFavoriteProjects: PropTypes.func.isRequired,
  isAlreadyFavorite: PropTypes.bool,
}
