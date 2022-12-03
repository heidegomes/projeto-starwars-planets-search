import testData from '../mocks/testData';

const requestAPIFetch = async () => {
  try {
    console.log('testData:', testData);
    // const response = await fetch('https://swapi.dev/api/planets');
    // const response = await fetch('testData');
    // console.log('RequestAPI response.json():', response.json());
    // const { results } = response.json();
    const response = testData;
    const { results } = response;
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};
export default requestAPIFetch;
