import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const fetchData = async () => {
  const response = await fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json');
  const jsonData = await response.json();
  return jsonData;
};

const checkbox_taipei = [
  {dist: '01',name: "中正區"}, {dist: '02',name: "萬華區"}, 
  {dist: '03',name: "大同區"}, {dist: '04',name: "中山區"}, 
  {dist: '05',name: "松山區"}, {dist: '06',name: "大安區"},     
  {dist: '07',name: "信義區"}, {dist: '08',name: "內湖區"}, 
  {dist: '09',name: "南港區"}, {dist: '10',name: "士林區"}, 
  {dist: '11',name: "北投區"}, {dist: '12',name: "文山區"}
];

const checkbox_other = [
  {dist: '01',name: "A區"}, {dist: '02',name: "B區"}, 
  {dist: '03',name: "C區"}, {dist: '04',name: "D區"}, 
  {dist: '05',name: "E區"}, {dist: '06',name: "F區"},     
  {dist: '07',name: "G區"}, {dist: '08',name: "H區"}, 
  {dist: '09',name: "I區"}, {dist: '10',name: "J區"}, 
  {dist: '11',name: "K區"}, {dist: '12',name: "L區"}
];

export default function StationPage () {
  const [isCheckAll, setIsCheckAll] = React.useState(true);
  const [isCheck, setIsCheck] = React.useState(checkbox_taipei.map(li => li.name));
  const [search,setSearch] = React.useState('');
  const [submit,setSubmit] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState('taipei');
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const handleChange = e => { 
    setSearch(e.target.value);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
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
    else if (isCheck.length === checkbox_taipei.length - 1) {
      setIsCheckAll(true);
    }
    //console.log("isCheck: ",isCheck,'\n', 'data.filter: ', data.filter(item => isCheck.includes(item.sarea)));
    //console.log("isCheck: ",isCheck, isCheck.length, checkbox_taipei.length - 1);
    
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
      setIsCheck(checkbox_taipei.map(li => li.name));
      fetchData().then((jsonData) => {
        setData(jsonData);
      });
    }
    //console.log(checkbox_taipei.map(li => li.name));
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
            <select name="stations" className="form-select form-select" id="stationSelect" onChange={handleCityChange}>
              <option value="taipei" >台北市</option>
              <option value="newTaipei" >新北市</option>
              <option value="taoyuan" >桃園市</option>
              <option value="taichung" >台中市</option>
              <option value="tainan" >台南市</option>
              <option value="kaohsiung" >高雄市</option>
            </select>
            <div className="input-group mb-3" id="stationSearch">
              <input type="text" className="form-control" id="search" value={search} onChange={handleChange} placeholder="搜尋站點" aria-label="Recipient's username" aria-describedby="button-addon2"/>
              <button type="button" className="btn btn-outline-secondary" id="button" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faMagnifyingGlass} id="magnifier"/>
              </button>
            </div>
          </div>
          <input type="checkbox" onChange={handleSelectAll} checked={isCheckAll}  id="checkboxAll" name="checkboxAll" /><div id="checkboxAllText">全部勾選</div>
          <CheckboxPanel
            checked={isCheck}
            onChange={handleCheck}
            city={selectedCity}
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


const CheckboxPanel = ({checked, onChange, city}) => {
  
  let content = checkbox_taipei;
  if (city === "taipei" ) {
    content = checkbox_taipei;
  }
  else {
    content = checkbox_other;
  }
  
  return (
    <div id="mid-panel">
      <div id="checkbox-panel">
        {content.map(({dist, name}) => (
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

const TableComponent = ({ data, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  //console.log("filterIsInput: ",filterIsInput,"\n","filterInput: ",filterInput);
  
  const renderData = () => {
    return currentData.map((item, index) => (
      <tr key={index} >
        <td key={`scity-${index}`} className="scity">台北市</td>
        <td key={`sarea-${index}`} className="sarea">{item.sarea}</td>
        <td key={`sna-${index}`} className="sna" id="sname">{item.sna}</td>
        <td key={`sbi-${index}`} className="sbi">{item.sbi}</td>
        <td key={`bemp-${index}`} className="bemp">{item.bemp}</td>
      </tr>
    ))
  };

  return (
    <div id="divTable">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="table-custom-green scity">縣市</th>
            <th scope="col" className="table-custom-green sarea">區域</th>
            <th scope="col" className="table-custom-green ">站點名稱</th>
            <th scope="col" className="table-custom-green sbi" id="thSbi">可借車輛</th>
            <th scope="col" className="table-custom-green bemp" id="thBemp">可選空位</th>
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
    pageNumbers.push(
      <span
        key={'p'+0}
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
        key={'p'+i}
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
        key={'p'+totalPages}
        onClick={() => handleClick(totalPages)}
        className={currentPage === totalPages ? 'active' : 'page'}
      >
        {totalPages}
      </span>
    );

  return pageNumbers;
};
