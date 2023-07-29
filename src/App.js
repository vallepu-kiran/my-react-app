import logo from './logo.svg';
import React from 'react';
import Search from './Search';
import './Search.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import ShowDetails from './ShowDetails';
import Seasons from './Seasons';

function App() {
  return (
    

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="search" element={<Search />} />
        <Route path="shows/:id" element={<ShowDetails />} />
        <Route path="shows/:id/seasons" element={<Seasons />} />
      </Route>
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
