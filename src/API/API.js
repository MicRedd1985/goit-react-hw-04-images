import axios from "axios";

export const fetchImages = (query = '', page = 1) => {
  const response = `https://pixabay.com/api/?key=31315940-fbb1061bb3bfe12c6324aab94&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
  return axios.get(response).then(res => res.data);
};

