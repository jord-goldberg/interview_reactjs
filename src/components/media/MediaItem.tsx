import * as React from 'react';
import { isImage, Image, Video } from '../../types/pixabay';
import './Media.css';

import ic_imageSvg from '../../assets/ic_image.svg';
import ic_videoSvg from '../../assets/ic_video.svg';
import ic_video_4kSvg from '../../assets/ic_video_4k.svg';

export interface Props {
  item: Image | Video;
  onClick: (media: Image | Video) => void;
}

const mediaItem: React.SFC<Props> = ({ item, onClick }: Props) =>
  isImage(item) ? (
    <ImageItem item={item} onClick={onClick} />
  ) : (
    <VideoItem item={item} onClick={onClick} />
  );

export default mediaItem;

const creationDate = (media: Image | Video) => {
  if (isImage(media)) {
    const [year, month, day, hour, minute] = media.previewURL
      .split('photo/')[1]
      .split('/');
    return `${year}/${month}/${day} ${hour}:${minute}`;
  }
  if (media.userImageURL) {
    const [year, month, day] = media.userImageURL.split('user/')[1].split('/');
    return `${year}/${month}/${day}`;
  }
  return '';
};

const ImageItem = ({
  item,
  onClick,
}: {
  item: Image;
  onClick: (media: Image) => void;
}) => (
  <div className="item flexContainer" onClick={() => onClick(item)}>
    <div className="imageContainer">
      <img className="image" src={item.previewURL} />
    </div>
    <div className="details">
      <div>{item.previewURL.split('/').pop()}</div>
      <div>
        <img src={ic_imageSvg} />
      </div>
      <div>
        {item.imageWidth} x {item.imageHeight}
      </div>
      <div className="created-at">
        <div>Created</div>
        <div>{creationDate(item)}</div>
      </div>
    </div>
  </div>
);

const VideoItem = ({
  item,
  onClick,
}: {
  item: Video;
  onClick: (media: Video) => void;
}) => {
  let video;
  if (item.videos.large.size) {
    video = item.videos.large;
  } else if (item.videos.medium.size) {
    video = item.videos.medium;
  } else if (item.videos.small.size) {
    video = item.videos.small;
  } else {
    video = item.videos.tiny;
  }

  return (
    <div className="item" onClick={() => onClick(item)}>
      <div className="imageContainer">
        <img className="image" src={item.userImageURL} />
      </div>
      <div className="details">
        <div>
          {
            video.url
              .split('/')
              .pop()!
              .split('?')[0]
          }
        </div>
        <div>
          <img src={video.width > 4000 ? ic_video_4kSvg : ic_videoSvg} />
        </div>
        <div>
          {video.width} x {video.height}
        </div>
        <div className="created-at">
          <div>Created</div>
          <div>{creationDate(item)}</div>
        </div>
      </div>
    </div>
  );
};
