//APP.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../public/styles.scss';
//import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
//import App from './App'; // 假设您的主应用程序位于App.js中
const customGreen = "#B5CC22"; 


const APP = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
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

function MobileNav () {
  return (
    <>
      <div id="mobNav">
        <div id="mobLogo" ><img src="https://i.imgur.com/QAbUlXP.png" alt="logo"/></div>
        <div id="mobNavSection">
          <div className="mobNavDiv"><Link to="/instructions" className="navClass" id="instruction">使用說明</Link></div>
          <div className="mobNavDiv"><Link to="/charge" className="navClass" id="charge">收費方式</Link></div>
          <div className="mobNavDiv"><Link to="/station" className="navClass" id="station">站點資訊</Link></div>
          <div className="mobNavDiv"><Link to="/news" className="navClass" id="news">最新消息</Link></div>
          <div className="mobNavDiv"><Link to="/activity" className="navClass">活動專區</Link></div>
          <div id="login"><Link to="/login" className="btn" id="login-text">登入</Link>       </div>
        </div>
        </div>
          <Routes>
            <Route path="/instructions" element={<div>News</div>}/>
            <Route path="/charge" element={<div>News</div>}/>
            <Route path="/station" >
              <StationPage/>
            </Route>
            <Route path="/news" element={<div>News</div>}/>
            <Route path="/activity" element={<div>News</div>}/>
            <Route path="/login" element={<div>News</div>}/>
          </Routes>
    </>
  );
}

function Nav () {
  

  return (
    <>
      <div id="nav">
        <div id="logo" ><img src="https://i.imgur.com/QAbUlXP.png" alt="logo"/></div>
        <div id="navSection">
          {/*
            style={isActive => ({
    color: isActive ? customGreen : "blue"
  })}
          */}
          <div className="navDiv"><NavLink to="/instructions" className="navClass" id="instruction" >使用說明</NavLink></div>
          <div className="navDiv"><NavLink to="/charge" className="navClass" id="charge">收費方式</NavLink></div>
          <div className="navDiv"><NavLink to="/station" className="navClass" id="station">站點資訊</NavLink></div>
          <div className="navDiv"><NavLink to="/news" className="navClass" id="news">最新消息</NavLink></div>
          <div className="navDiv"><NavLink to="/activity" className="navClass">活動專區</NavLink></div>
          <div className="btn" id="login"><NavLink to="/login" id="login-text">登入</NavLink>       </div>
        </div>
        </div>
          <Routes>
            <Route path="/instructions" element={<div>News</div>}/>
            <Route path="/charge" element={<div>News</div>}/>
            <Route path="/station" element={<StationPage/>}/>
            <Route path="/news" element={<div>News</div>}/>
            <Route path="/activity" element={<div>News</div>}/>
            <Route path="/login" element={<div>News</div>}/>
          </Routes>
    </>
  );
}
 
function StationPage () {
  const [isCheckAll, setIsCheckAll] = React.useState(true);
  const [isCheck, setIsCheck] = React.useState(checkbox_arr.map(li => li.name));
  const [search,setSearch] = React.useState('');
  const [submit,setSubmit] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const handleChange = e => { 
    setSearch(e.target.value);
  };
  const handleSubmit = () => {
    setSubmit(!submit);
    /*
    if (search === "") {
      fetchData().then((jsonData) => {
        setData(jsonData);
      });
    } 
    else {
      const filteredData = data.filter( item => item.sna.includes(search));
      setData(filteredData);
    }
    */
};
  const handleCheck = e => {
    const {name, checked} = e.target;
    setIsCheck([...isCheck, name]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== name));
      setIsCheckAll(false);
    }
    else if (isCheck.length === checkbox_arr.length - 1) {
      setIsCheckAll(true);
    }
    //console.log("isCheck: ",isCheck,'\n', 'data.filter: ', data.filter(item => isCheck.includes(item.sarea)));
    //console.log("isCheck: ",isCheck, isCheck.length, checkbox_arr.length - 1);
    /*
      setIsCheck(prev => {
        if (!checked) {
          return prev.filter(item => item !== name); 
        } 
        else {
          return [...prev, name];
        }
      });
      setIsCheckAll( () => {
        if (!checked) {
          return false;
        }
        else if (isCheck.length === checkbox_arr.length - 1) {
          return true;
        }
        return false;
      });
    */
   //
  // 有空可以回來加強handleCheck的學習，因為他是用prevset來判斷
  // 因為使用else if 排除當前checked為false情形 
  }
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    if (isCheckAll) {
      setIsCheck([]);
      setData([]);
      //console.log(e.target);
    }
    else {
      setIsCheck(checkbox_arr.map(li => li.name));
      fetchData().then((jsonData) => {
        setData(jsonData);
      });
    }
    //console.log(checkbox_arr.map(li => li.name));
  };
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    //console.log(pageNumber);
  };
 
  React.useEffect( () => {
    fetchData().then((jsonData) => {
        setData(jsonData);
    });
  },[]);
  
  React.useEffect(() => {
    fetchData().then((jsonData) => {
      const filteredData = jsonData.filter((item) => isCheck.includes(item.sarea)
      && item.sna.includes(search) );
      setData(filteredData);
      });
    }
   /*
   old thing
      if (search !== "" && isCheckAll) {
      const filteredData = data.filter((item) => isCheck.includes(item.sarea));
      setData(filteredData);
    }
    else {
      fetchData().then((jsonData) => {
      const filteredData = jsonData.filter((item) => isCheck.includes(item.sarea));
      setData(filteredData);
      }
   */
  , [isCheck, submit]);
  
  return (
    <>
      <hr className="new1"/>
        <div id="fieldset">
          <legend id="legend">站點資訊</legend>
          <div id="search-panel">
            <select name="stations" className="form-select form-select" id="stationSelect">
              <option value="Taipei" >台北市</option>
              <option value="NewTaipei" >新北市</option>
              <option value="Taoyuan" >桃園市</option>
              <option value="Taichung" >台中市</option>
              <option value="Tainan" >台南市</option>
              <option value="Kaohsiung" >高雄市</option>
            </select>
            <div class="input-group mb-3" id="stationSearch">
              <input type="text" class="form-control" id="search" value={search} onChange={handleChange} placeholder="搜尋站點" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <button type="button" class="btn btn-outline-secondary" id="button" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifier"/>
              </button>
            </div>
          </div>
          {/*
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="stationSearch" value={search} onChange={handleChange} placeholder="搜尋站點" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          */}
          <input type="checkbox" onChange={handleSelectAll} checked={isCheckAll}  id="checkboxAll" name="checkboxAll" /><label for="checkboxAll">全部勾選</label>
          <CheckboxPanel
            checked={isCheck}
            onChange={handleCheck}
            />
          <TableComponent
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          handleClick={handlePage}
          filterIsInput={submit}
          filterInput={search}
          filterArea={isCheck}
        />
        <div className="pagination">
          {renderPageNumbers(totalPages, handlePage, currentPage)}
        </div>
        </div>
      </>
  );
}


const CheckboxPanel = ({checked, onChange}) => {
  return (
    <div id="mid-panel">
      <div id="checkbox-panel">
        {checkbox_arr.map(({dist, name}) => (
          <>
            <input
              type="checkbox"
              id={dist}
              name={name}
              checked={checked.includes(name)}
              onChange={onChange}
              />
            <label for={dist}>{name}</label>
          </>
        ))}
      </div>
      <img id="stationPic" src="https://i.imgur.com/dFK7idR.png" alt="stationPic"/>
    </div>
  );
}

const TableComponent = ({ data, currentPage, itemsPerPage, totalPages, handleClick, filterIsInput, filterInput, filterArea }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  //console.log("filterIsInput: ",filterIsInput,"\n","filterInput: ",filterInput);
  /*
    const filteredData = filterIsInput ? 
        data.filter(item => filterArea.includes(item.sarea) && 
        item.sna.includes(filterInput)) :
        data.filter(item => filterArea.includes(item.sarea));
    const currentData = filteredData.slice(startIndex, endIndex);    
  */
  
  const renderData = () => {
    return currentData.map((item, index) => (
      <tr key={index} >
        <td className="scity">台北市</td>
        <td className="sarea">{item.sarea}</td>
        <td className="sna" >{item.sna}</td>
        <td className="sbi">{item.sbi}</td>
        <td className="bemp">{item.bemp}</td>
      </tr>
    ))
  };

  return (
    <div id="divTable">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="table-custom-green">縣市</th>
            <th scope="col" className="table-custom-green">區域</th>
            <th scope="col" className="table-custom-green">站點名稱</th>
            <th scope="col" className="table-custom-green">可借車輛</th>
            <th scope="col" className="table-custom-green">可選空位</th>
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
    </div>
  );
};

const renderPageNumbers = (totalPages, handleClick, currentPage) => {
  const pageNumbers = [];
  const dots = '...';

  // 設置頁數邊界
  const boundaryCount = 2;

  if (totalPages <= 1) {
    return pageNumbers;
  }

  // 開始部分
/* if (currentPage <== ) {
  
}
*/
    pageNumbers.push(
      <span
        key={1}
        onClick={() => handleClick(1)}
        className={currentPage === 1 ? 'active' : 'page'}
      >
        {1}
      </span>
    );

  // 中間部分
  if (currentPage - boundaryCount > 2) {
    pageNumbers.push(<span key="startDots" className="dot">{dots}</span>);
  }

  for (let i = Math.max(2, currentPage - boundaryCount); i <= Math.min(totalPages - 1, currentPage + boundaryCount); i++) {
    pageNumbers.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        className={currentPage === i ? 'active' : 'page'}
      >
        {i}
      </span>
    );
  }

  // 結尾部分
  if (currentPage + boundaryCount < totalPages - 1) {
    pageNumbers.push(<span key="endDots" className="dot">{dots}</span>);
  }

    pageNumbers.push(
      <span
        key={totalPages}
        onClick={() => handleClick(totalPages)}
        className={currentPage === totalPages ? 'active' : 'page'}
      >
        {totalPages}
      </span>
    );

  return pageNumbers;
};


export default APP;

