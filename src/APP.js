//APP.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
//import App from './App'; // 假设您的主应用程序位于App.js中

const fetchData = async () => {
  const response = await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json');
  const jsonData = await response.json();
  return jsonData;
};

const checkbox_arr = [
  {dist: '01',name: "中正區"}, {dist: '02',name: "萬華區"}, 
  {dist: '03',name: "大同區"}, {dist: '04',name: "中山區"}, 
  {dist: '05',name: "松山區"}, {dist: '06',name: "大安區"},     
  {dist: '07',name: "信義區"}, {dist: '08',name: "內湖區"}, 
  {dist: '09',name: "南港區"}, {dist: '10',name: "士林區"}, 
  {dist: '11',name: "北投區"}, {dist: '12',name: "文山區"}
];

const APP = () => {
  return (
    <>
      <Nav/>
      {/*window.innerWidth > 600 ? <Nav /> : <MobileNav /> */}
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
          {/*
          <div id="instruction">使用說明</div>
          <div id="charge">收費方式</div>
          <div id="station">站點資訊</div>
          <div id="news">最新消息</div>
          <div id="activity">活動專區</div>
          <div id="login" className="btn"><div id="login-text">登入</div></div>
          */}
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
        {/*
        <Switch>
          <Route path="/instructions" element={<div>News</div>}/>
          <Route path="/charge" element={<div>News</div>}/>
          <Route path="/station" element={<StationPage/>}/>
          <Route path="/news" element={<div>News</div>}/>
          <Route path="/activity" element={<div>News</div>}/>
          <Route path="/login" element={<div>News</div>}/>
        </Switch>
        */}
    </>
  );
}

function Nav () {
  return (
    <>
      <div id="nav">
        <div id="logo" ><img src="https://i.imgur.com/QAbUlXP.png" alt="logo"/></div>
        <div id="navSection">
          <div className="navDiv"><Link to="/instructions" className="navClass" id="instruction">使用說明</Link></div>
          <div className="navDiv"><Link to="/charge" className="navClass" id="charge">收費方式</Link></div>
          <div className="navDiv"><Link to="/station" className="navClass" id="station">站點資訊</Link></div>
          <div className="navDiv"><Link to="/news" className="navClass" id="news">最新消息</Link></div>
          <div className="navDiv"><Link to="/activity" className="navClass">活動專區</Link></div>
          <div id="login"><Link to="/login" className="btn" id="login-text">登入</Link>       </div>
        </div>
          {/*
          <div id="instruction">使用說明</div>
          <div id="charge">收費方式</div>
          <div id="station">站點資訊</div>
          <div id="news">最新消息</div>
          <div id="activity">活動專區</div>
          <div id="login" className="btn"><div id="login-text">登入</div></div>
          */}
        </div>
          <Switch>
            <Route path="/instructions" element={<div>News</div>}/>
            <Route path="/charge" element={<div>News</div>}/>
            <Route path="/station" >
              <StationPage/>
            </Route>
            <Route path="/news" element={<div>News</div>}/>
            <Route path="/activity" element={<div>News</div>}/>
            <Route path="/login" element={<div>News</div>}/>
          </Switch>
        {/*
        <Switch>
          <Route path="/instructions" element={<div>News</div>}/>
          <Route path="/charge" element={<div>News</div>}/>
          <Route path="/station" element={<StationPage/>}/>
          <Route path="/news" element={<div>News</div>}/>
          <Route path="/activity" element={<div>News</div>}/>
          <Route path="/login" element={<div>News</div>}/>
        </Switch>
        */}
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
              <button type="button" class="btn btn-outline-secondary" id="button" onClick={handleSubmit}><i class="fa-solid fa-magnifying-glass" id="magnifier"></i></button>
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

