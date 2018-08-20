import * as React from 'react';
import { getPictures, getVideos } from '../../api/PixabayApi';
import { Image, Video } from '../../types/pixabay';
import AppBar from '../appbar/AppBar';
import './Media.css';
import MediaItem from './MediaItem';
import MediaDetail from '../mediadetail/MediaDetail';

import ic_folderSvg from '../../assets/ic_folder.svg';
import ic_folder_selectedSvg from '../../assets/ic_folder_selected.svg';

enum Folder {
  SCIENCE = 'science',
  ANIMALS = 'animals',
  FASHION = 'fashion',
  FOOD = 'food',
}

interface FolderData<T> {
  pages: number;
  items: T[];
}

export interface Props {
  email: string;
  signOut: () => void;
}

interface State {
  currentFolder: Folder | string;
  mediaDetail?: Image | Video;
  folders: {
    [folder: string]: FolderData<Image | Video>;
  };
}

export default class Media extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.appendFolderData = this.appendFolderData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
    this.onMediaClick = this.onMediaClick.bind(this);
    this.onCloseDetail = this.onCloseDetail.bind(this);

    const folders = Object.keys(Folder)
      .map(name => Folder[name])
      .reduce((map, folder) => {
        map[folder] = {
          items: [],
          pages: 0,
        };
        return map;
      },      {});

    this.state = {
      folders,
      currentFolder: Folder.SCIENCE,
    };
  }

  componentDidMount() {
    const { currentFolder } = this.state;
    this.fetchData(currentFolder);
  }

  appendFolderData(folder: Folder | string, data: (Image | Video)[]) {
    const { folders } = this.state;
    const folderData = folders[folder];

    this.setState({
      folders: Object.assign(folders, {
        [folder]: {
          items: folderData ? folderData.items.concat(data) : data,
          pages: folderData ? folderData.pages + 1 : 1,
        },
      }),
    });
  }

  fetchData(folder: string) {
    const { folders } = this.state;
    const folderData = folders[folder];

    Promise.all([
      getPictures(folder, folderData.pages + 1),
      getVideos(folder, folderData.pages + 1),
    ])
      .then(([pictures, videos]) => {
        const data: (Image | Video)[] = [];
        return data
          .concat(pictures)
          .concat(videos)
          .sort((a, b) =>
            a.tags.toLowerCase().localeCompare(b.tags.toLowerCase()),
          );
      })
      .then(data => this.appendFolderData(folder, data));
  }

  selectFolder(ev: any) {
    const selectedFolder = ev.target.id;
    const { currentFolder, folders } = this.state;

    if (selectedFolder !== currentFolder) {
      this.setState({ currentFolder: selectedFolder });

      const selectedData = folders[selectedFolder];

      if (!selectedData.items.length) {
        this.fetchData(selectedFolder);
      }
    }
  }

  onMediaClick(media: Image | Video) {
    this.setState({ mediaDetail: media });
  }

  onCloseDetail() {
    this.setState({ mediaDetail: undefined });
  }

  render() {
    const { email, signOut } = this.props;
    const { currentFolder, mediaDetail, folders } = this.state;
    const currentData = folders[currentFolder];

    return (
      <div>
        <div className={mediaDetail ? 'media blur' : 'media'}>
          <AppBar email={email} signOut={signOut} />
          <div className="folders">
            {Object.keys(folders).map(folder => (
              <div
                className="folder"
                key={folder}
                id={folder}
                onClick={this.selectFolder}
              >
                <img
                  id={folder}
                  className="icon"
                  src={folder === currentFolder ? ic_folder_selectedSvg : ic_folderSvg}
                />
                <div id={folder}>{folder}</div>
              </div>
            ))}
          </div>
          <div className="flexContainer content">
            {currentData && currentData.items.length
              ? currentData.items.map(item => (
                <MediaItem
                  key={item.id}
                  item={item}
                  onClick={this.onMediaClick} />
                ),
              ) : null}
          </div>
        </div>
        {mediaDetail ? (
          <MediaDetail media={mediaDetail} closeDetail={this.onCloseDetail} />
        ) : null}
      </div>
    );
  }
}
