import * as React from 'react';
import './AppBar.css';

import ic_nav_drawerSvg from '../../assets/ic_nav_drawer.svg';
import videri_brandmark_whiteSvg from '../../assets/videri_brandmark_white.svg';

export interface Props {
  email: string;
  signOut: () => void;
}

const appBar: React.SFC<Props> = (props: Props) => (
  <div className="app-bar flexContainer">
    <img className="nav-icon" src={ic_nav_drawerSvg} alt="navigation drawer" />
    <img className="brandmark" src={videri_brandmark_whiteSvg} alt="brandmark" />
    <span className="title">CONTENT</span>
    <div className="flexContainer vertical organization-container">
      <span className="organization">Organization</span>
      <span>151 Pro-Serv</span>
    </div>
    <span className="user-email">{props.email}</span>
    <div className="avatar" onClick={props.signOut}>
      <span>{props.email.charAt(0).toUpperCase()}</span>
    </div>
  </div>
);

export default appBar;
