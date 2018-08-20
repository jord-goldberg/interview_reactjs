import { Image, Video } from "../types/pixabay";

const BASE_URL = "https://pixabay.com/api/";
const PIXABAY_KEY = process.env.REACT_APP_PIXABAY_KEY;

export function getPictures(category: string, page = 1): Promise<Image[]> {
  const url = `${BASE_URL}?key=${PIXABAY_KEY}&safesearch=true&page=${page}&per_page=50&category=${category}`;

  return fetch(url)
    .then(response => response.json())
    .then(body => body.hits);
}

export function getVideos(category: string, page = 1): Promise<Video[]> {
  const url = `${BASE_URL}videos/?key=${PIXABAY_KEY}&safesearch=true&page=${page}&per_page=50&category=${category}`;

  return fetch(url)
    .then(response => response.json())
    .then(body => body.hits);
}
