import axios from "axios";

const API_KEY = '8362380-caaef8a54ecf306e81d153d22';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

export const fetchPhotos = async (query, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: page,
  });

  return await axios.get(
    `${BASE_URL}?${searchParams}`
  );
};