import axios from "axios";

async function fetchServer(searchText, pageNumber) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const API_KEY = '42307570-a64cb029cc8427df0f0b3ddcd';
  const url = `${BASE_URL}${END_POINT}`;
  const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: searchText,
    per_page: 15,
    page: pageNumber,
  };
  const res = await axios.get(url, { params });
  return res.data;
};


export default fetchServer;


// const internetServerInfo = {
//   BASE_URL: 'https://pixabay.com',
//   END_POINT: '/api/',
//   API_KEY: '42307570-a64cb029cc8427df0f0b3ddcd',
//   constParameters: '&image_type=photo&orientation=horizontal&safesearch=true',
// };

// export default internetServerInfo;
