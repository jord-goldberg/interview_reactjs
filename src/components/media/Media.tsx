import * as React from 'react';
import { getPictures } from '../../api/PixabayApi';
import { Image, Video } from '../../types/pixabay';
import AppBar from '../appbar/AppBar';
import './Media.css';
import MediaItem from './MediaItem';

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
  folders: {
    [folder: string]: FolderData<Image | Video>;
  };
}

export default class Media extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.selectFolder = this.selectFolder.bind(this);
    this.appendFolderData = this.appendFolderData.bind(this);

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

    getPictures(currentFolder)
      .then(pictures =>
        pictures.sort((a, b) =>
          a.tags.toLowerCase().localeCompare(b.tags.toLowerCase()),
        ),
      )
      .then(pictures => this.appendFolderData(currentFolder, pictures));
  }

  selectFolder(ev: any) {
    const selectedFolder = ev.target.id;
    const { currentFolder, folders } = this.state;

    if (selectedFolder !== currentFolder) {
      this.setState({ currentFolder: selectedFolder });

      const selectedData = folders[selectedFolder];

      if (!selectedData.items.length) {
        getPictures(selectedFolder)
          .then(pictures =>
            pictures.sort((a, b) =>
              a.tags.toLowerCase().localeCompare(b.tags.toLowerCase()),
            ),
          )
          .then(pictures => this.appendFolderData(selectedFolder, pictures));
      }
    }
  }

  appendFolderData(folder: Folder | string, data: Image[] | Video[]) {
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

  render() {
    const { email, signOut } = this.props;
    const { currentFolder, folders } = this.state;
    const currentData = folders[currentFolder];

    return (
      <div className="media">
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
                src={folder === currentFolder ? ic_folderSvg : ic_folder_selectedSvg}
              />
              <div id={folder}>{folder}</div>
            </div>
          ))}
        </div>
        <div className="flexContainer content">
          {currentData && currentData.items.length
            ? currentData.items.map(item => <MediaItem key={item.id} item={item} />)
            : null}
        </div>
      </div>
    );
  }
}
