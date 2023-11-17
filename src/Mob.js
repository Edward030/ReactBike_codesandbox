import React from 'react';
import {
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faX ,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import StationPage from './page/Station';


export default function MobileNav () {
  const [isBarOpen, setIsBarOpen] = React.useState(false);
  const currentPath = window.location.pathname;

  const handleMenu = () => {
    setIsBarOpen(!isBarOpen);
  };

  let content ;
  switch (currentPath) {
    case "/instructions":
    case "/charge":
    case "/news":
    case "/activity":
    case "/login":
      content = <div>News</div>;
      break;
    case "/station":
      content = <StationPage />;
      break;
    default:
      content = <StationPage />; // 或者可以提供一個默認的內容
  }

  return (
    <>
      <div id="mobNav">
        <div id="mobLogoSection">
          <img src="https://i.imgur.com/QAbUlXP.png" alt="logo" id="mobLogo" />
          <div id="mobBarDiv" onClick={handleMenu}>
            {isBarOpen ? (
              <FontAwesomeIcon icon={faX} className="mobBar" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="mobBar" />
            )}
            
          </div>
        </div>
        {isBarOpen 
        ? mobNavSection(isBarOpen) 
        : content }
        
      </div>
    </>
  );
}

function mobNavSection(isBarOpen) {
  
  return (
    <>
      <div id="mobNavSection">
        <div className="mobNavDiv">
          <NavLink
            to="/instructions"
            activeClassName="activeRoute"
            className="mobNavClass"
            id="instruction"
          >
            使用說明
          </NavLink>
        </div>
        <div className="mobNavDiv">
          <NavLink
            to="/charge"
            activeClassName="activeRoute"
            className="mobNavClass"
            id="charge"
          >
            收費方式
          </NavLink>
        </div>
        <div className="mobNavDiv">
          <NavLink
            to="/station"
            activeClassName="activeRoute"
            className="mobNavClass"
            id="mobStation"
          >
            站點資訊
          </NavLink>
        </div>
        <div className="mobNavDiv">
          <NavLink
            to="/news"
            activeClassName="activeRoute"
            className="mobNavClass"
            id="news"
          >
            最新消息
          </NavLink>
        </div>
        <div className="mobNavDiv">
          <NavLink
            to="/activity"
            activeClassName="activeRoute"
            className="mobNavClass"
          >
            活動專區
          </NavLink>
        </div>
        <div id="mobLogin">
          <NavLink
            to="/login"
            activeClassName="activeRoute"
            className="btn"
            id="login-text"
          >
            登入
          </NavLink>{' '}
        </div>
      </div>
      <Routes>
        <Route path="/instructions"/>  {/* 不放element即可 */ }
        <Route path="/charge"  />
        <Route path="/station"  />
        <Route path="/news"  />
        <Route path="/activity"  />
        <Route path="/login"  />
      </Routes>
    </>
  );
}