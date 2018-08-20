import * as React from 'react';
import { isImage, Image, Video } from '../../types/pixabay';
import './MediaDetail.css';

import ic_closeSvg from '../../assets/ic_close.svg';

export interface Props {
  media: Image | Video;
  closeDetail: () => void;
}

const MediaDetail = ({ media, closeDetail }: Props) => (
  <div className="media-detail">
    {isImage(media) ? (
      <ImageDetail image={media} />
    ) : (
      <VideoDetail video={media} />
    )}
    <img className="close" src={ic_closeSvg} onClick={closeDetail} />
  </div>
);

export default MediaDetail;

const ImageDetail = ({ image }: { image: Image }) => (
  <div className="container">
    <div>{image.previewURL.split('/').pop()}</div>
    <img className="media-detail content" src={image.largeImageURL} />
  </div>
);

const VideoDetail = ({ video }: { video: Video }) => {
  let videoDetail;
  if (video.videos.large.size) {
    videoDetail = video.videos.large;
  } else if (video.videos.medium.size) {
    videoDetail = video.videos.medium;
  } else if (video.videos.small.size) {
    videoDetail = video.videos.small;
  } else {
    videoDetail = video.videos.tiny;
  }

  return (
    <div className="container">
      <div>
        {
          videoDetail.url
            .split('/')
            .pop()!
            .split('?')[0]
        }
      </div>
      <video className="content" autoPlay >
        <source src={videoDetail.url} type="video/mp4" />
      </video>
    </div>
  );
};
