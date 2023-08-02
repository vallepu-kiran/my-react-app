import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Layout = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      navigate(`/search?q=${search}`);
    };
  return (
    <>   <div>
          
<nav class="navbar navbar-inverse bg-dark fixed-top ">
  <div class="container-fluid bg-dark" style={{height:"70px"}}>
    <div class="navbar-header " style={{color:"rgba(255,255,255,0);"}}>
    <a className="navbar-brand" href="#">
                <img src="https://www.zee5.com/images/ZEE5_logo.svg?ver=3.12.5" alt="Logo" style={{height:"46px",paddingLeft:"35px"}} />
              </a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active">    <Link to="/Search">app</Link></li>
      <li class="active"><Link to="/SearchForm">kiran</Link></li>
      <li><a href="#">Page 2</a></li>
    </ul>
    <form className="navbar-form navbar-left" onSubmit={handleSearch}>
  <div className="input-group"> 
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="form-control"
      placeholder="Search"
      style={{right:"300px"}}
    />
    <span className="input-group-btn ">
      <button type="submit" className="btn btn-primary" style={{right:"300px"}}> 
        <i className="bi bi-search text-white"></i>
      </button>
    </span>
  </div>
</form>

  </div>
</nav>
 </div>
  <Outlet />
    </>
  )
};

export default Layout;
