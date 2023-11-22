//APP.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import '../public/styles.scss';
import MobileNav from './Mob';
import StationPage from './pages/Station';
//import App from './App'; // 假设您的主应用程序位于App.js中
const customGreen = "#B5CC22"; 

const APP = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 708);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 708);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <Router>
        {isMobile ? <MobileNav /> : <Nav />}
      </Router>
    </>
  );
};

function Nav () {
  return (
    <>
      <div id="nav">
        <div id="logo">
          <img src="https://i.imgur.com/QAbUlXP.png" alt="logo" />
        </div>
        <div id="navSection">
          <div className="navDiv">
            <NavLink
              to="/instructions"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'normalLink'
              }
              id="instruction"
            >
              使用說明
            </NavLink>
          </div>
          <div className="navDiv">
            <NavLink
              to="/charge"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'normalLink'
              }
              id="charge"
            >
              收費方式
            </NavLink>
          </div>
          <div className="navDiv">
            <NavLink
              to="/station"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'normalLink'
              }
              id="station"
            >
              站點資訊
            </NavLink>
          </div>
          <div className="navDiv">
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'normalLink'
              }
              id="news"
            >
              最新消息
            </NavLink>
          </div>
          <div className="navDiv">
            <NavLink
              to="/activity"
              className={({ isActive }) =>
                isActive ? 'activeLink' : 'normalLink'
              }
            >
              活動專區
            </NavLink>
          </div>
          <div  id="login">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'btn activeBtn' : 'btn normalBtn'
              }
              id="login-text"
            >
              登入
            </NavLink>{' '}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/instructions" element={<div>News</div>} />
        <Route path="/charge" element={<div>News</div>} />
        <Route path="/station" element={<StationPage />} />
        <Route path="/news" element={<div>News</div>} />
        <Route path="/activity" element={<div>News</div>} />
        <Route path="/login" element={<div>News</div>} />
      </Routes>
    </>
  );
}

export default APP;
