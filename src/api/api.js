import axios from 'axios';

export async function fetchImages(searchValue, page) {
  const params = new URLSearchParams({
    key: '25798215-b5224b890c985f6c53280bcb2',
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });

  const URL = `https://pixabay.com/api/?q=${searchValue}&${params}`;

  const response = await axios.get(URL);
  const responseFormat = await response.data;
  return responseFormat;
}

export default fetchImages;
