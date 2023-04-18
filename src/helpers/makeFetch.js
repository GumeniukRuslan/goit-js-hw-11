import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '35523628-8ab67868a338e2d72f9e83665',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true'
});


export async function getUser(searchQ) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}&q=${searchQ}`);
    return response
  } catch (error) {
    console.error(error);
  }
}