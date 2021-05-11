const BASE_URL = 'https://api.github.com/search/repositories?q=';

export async function getDataFromServer(keyword) {
  try {
    if (!keyword) {
      return [];
    }

    const endpoint = BASE_URL + keyword;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Something went wrong while trying to load data from server');
    }

    const result = await response.json();

    return result.items;
  } catch (error) {
    console.error(error);

    return [];
  }
}
