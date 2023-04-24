import axios from 'axios';

export default class ApiService {
  constructor() {
    (this.page = 1),
      (this.searchQ = ''),
      (this.searchParams = new URLSearchParams({
        key: '35523628-8ab67868a338e2d72f9e83665',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        min_height: '180',
      }));
  }

  async getImgs() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${this.searchParams}&page=${this.page}&q=${this.searchQ}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
