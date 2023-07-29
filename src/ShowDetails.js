import React, { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function ShowDetails() {
  const params = useParams();
  const id = params.id;
  const [showData, setShowData] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [numEpisodesToShow, setNumEpisodesToShow] = useState(5);
  const incrementValue = 5; 

  useEffect(() => {
    const fetchShowData = () => {
      const url = `https://api.tvmaze.com/shows/${id}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setShowData(data));
    };

    const fetchEpisodes = () => {
      const url = `https://api.tvmaze.com/shows/${id}/episodes`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setEpisodes(data));
    };

    fetchShowData();
    fetchEpisodes();
  }, []);
  const handleLoadMore = () => {
    
    setNumEpisodesToShow((prevNum) => prevNum + incrementValue);
  };

  return (
    <div className="bg-black">
      <div className="row bg-black">
        <div className="col-md-4 ratio ratio-16x9" style={{ backgroundImage: `url(${showData.image && showData.image.original})`, backgroundSize: "cover" }}>
          <img src={showData.image && showData.image.original} className="img-fluid " />
          <div style={{ paddingTop: "50px", width: "720px", color: "white", paddingLeft: "130px" }}>
            <h2>{showData.name}</h2>
            <h6 style={{ margin: 0, display: 'inline' }}>Audio Languages:  </h6>
            <p style={{ color: '#7e57c2', margin: 0, display: 'inline', textAlign: 'right' }}>
              {showData.language}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: "14px" }}>
            <h6 style={{ margin: 0, display: 'inline' }}> Subtitles:  </h6>
            <p style={{margin: 0, display: 'inline', textAlign: 'right' }}>
             {showData.language}
           </p>
        </div>
            <p style={{paddingTop:"27px"}}>{showData.summary}</p>
            <p>{showData.premiered}.Duration {showData.runtime}.min  {showData.genres}</p>
          </div>
        </div>
      </div>
       <div class="row">
      <div text='white'class="col-md-10 p-2">
      <Dropdown>
      <Dropdown.Toggle variant="bg-black  text-white border border-white"  id="dropdown-basic">
        Episodes1-8
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Episodes1-8</Dropdown.Item>
      
      </Dropdown.Menu> 
    </Dropdown>
        
      </div>
      <div class="col-md-1 p-2 ">More </div> 
      <div class="col-md-1 p-2 ">
      {numEpisodesToShow < episodes.length && (
        <div className="col-md-2" key={episodes[0].season}>
           <Link to={`/shows/${id}/seasons` }
           class="bi bi-chevron-right" onClick={handleLoadMore} style={{color:"white"}}>
          </Link>
          
        </div>
      )}
      </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', text:'white'}}>
        {episodes && episodes.slice(0, numEpisodesToShow).map((episode) => (
          <div key={episode.id}>
            <div className="col pb-2 pt-2"></div>
            <div className="col-md-2 "></div>episodes
            <Link to={`/episodes/${episode.image}`}>
              <img
                src={episode.image && episode.image.medium}
                style={{ width: '280px', height: 'auto' }}
              />
            </Link>
            {episode.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetails;

