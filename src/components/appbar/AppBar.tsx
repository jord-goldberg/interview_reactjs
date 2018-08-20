import * as React from "react";
import "./AppBar.css";

import navIcon from "../../assets/ic_nav_drawer.svg";
import brandmark from "../../assets/videri_brandmark_white.svg";

export interface Props {
  email: string;
  signOut: () => void;
}

const AppBar: React.SFC<Props> = (props: Props) => (
  <div className="app-bar flexContainer">
    <img className="nav-icon" src={navIcon} alt="navigation drawer" />
    <img className="brandmark" src={brandmark} alt="brandmark" />
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

export default AppBar;
