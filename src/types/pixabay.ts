export enum MediaType {
  PHOTO = 'photo',
  ILLUSTRATION = 'illustration',
  VECTOR = 'vector',
  VECTOR_AI = 'vector/ai',
  VECTOR_SVG = 'vector/svg',
  ANIMATION = 'animation',
  FILM = 'film',
}

export interface Media {
  comments: number;
  downloads: number;
  favorites: number;
  id: number;
  likes: number;
  pageURL: string;
  type: MediaType;
  user: string;
  userImageURL: string;
  tags: string;
  user_id: number;
}

export interface Image extends Media {
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

interface VideoDetail {
  url: string;
  width: number;
  size: number;
  height: number;
}

export interface Video extends Media {
  duration: number;
  picture_id: string;
  videos: {
    large: VideoDetail;
    medium: VideoDetail;
    small: VideoDetail;
    tiny: VideoDetail;
    views: 58;
  };
}

export function isImage(media: Media): media is Image {
  switch (media.type) {
    case MediaType.ILLUSTRATION:
    case MediaType.PHOTO:
    case MediaType.VECTOR:
    case MediaType.VECTOR_AI:
    case MediaType.VECTOR_SVG:
      return true;
  }
  return false;
}
