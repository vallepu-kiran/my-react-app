import React, { useState, useEffect } from 'react';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ShowDetails() {
  const params = useParams();
  const id = params.id;
  const [showData, setShowData] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [cast,setCast]= useState([]);
  const [numEpisodesToShow, setNumEpisodesToShow] = useState(5);
  const incrementValue = 5; 
  const[numPersonsToShow,setPersonsToShow] = useState(3);
  const increment = 3;

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
    
    const fetchCast = () => {
      const url = `  https://api.tvmaze.com/shows/${id}/cast`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setCast(data));
    };
    
    

    fetchShowData();
    fetchEpisodes();
    fetchCast();
  }, []);
  const handleLoadMore = () => {
    
    setNumEpisodesToShow((prevNum) => prevNum + incrementValue);
  };
  function stripHtmlTags(htmlString) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }

  function getTruncatedSummary(summary, maxLength) {
    const strippedSummary = stripHtmlTags(summary);
    if (strippedSummary.length > maxLength) {
      return strippedSummary.slice(0, maxLength) + '...';
    }
    return strippedSummary;
  }
  function getFirstThreeCast() {
    return cast.slice(0, numPersonsToShow).map((actor) => actor.person && actor.person.name);
  
  }
  

  return (
    <div className="bg-black text-white" style={{paddingTop:"86px"}}>
      <div className="row bg-black">
        <div className="col-md-4 ratio ratio-16x9" style={{ backgroundImage: `url(${showData.image && showData.image.original})`, backgroundSize: "100% 100%" }}>
          
          <div style={{ paddingTop: "50px", width: "720px", color: "white", paddingLeft: "130px" }}>
            <h2 >{showData.name}</h2>
            <h6 class="text-white-50">
      {showData.premiered} <i className="bi bi-dot" style={{ fontSize: '24px' }}></i> {showData.genres} <i className="bi bi-dot" style={{ fontSize: '24px' }}></i> U/A
    </h6>


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
            <p style={{paddingTop:"26px"}}>{getTruncatedSummary(stripHtmlTags(showData.summary), 250)}</p>
             <h6 style={{paddingTop:"80px"}}>Cast:</h6>
             <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28px, 1fr))', gap: '100px', text:'white', paddingTop:"20px"}}>
            {getFirstThreeCast().map((actorName, index) => (
              <span key={index}>{actorName}</span>
                  ))}
                  </div>
            <div><FontAwesomeIcon icon={faShare} style={{paddingTop:"200px",width:"100px",height:"26px"}} /><i class="bi bi-play-circle-fill" style={{width:"100px",height:"26px", paddingLeft:"70px" ,fontSize:"35px"}} ></i>
            <p class="text-white-50"style={{paddingLeft:"27px"}} >share <i style={{paddingLeft:"80px"}}>Watch Promo</i></p></div>
             </div>
             <div class="pb-4" style={{paddingTop:"705px", paddingLeft:"1180px"}}>
            <button type="button" class="btn btn-primary btn-lg" onClick={showData.previousepisode} > <h6 class="bi bi-play-circle-fill fst-normal" >  WATCH LATEST EPISODE</h6> </button></div>
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
      <div class="col-md-1 p-2 bg-black text-primary"  style={{width:"44px"}}>More </div> 
      <div class="col-md-1 p-2 ">
      {numEpisodesToShow < episodes.length && (
        <div className="col-md-2" key={episodes[0].season}>
           <Link to={`/shows/${id}/seasons` }
           class= " bi bi-chevron-right primary" onClick={handleLoadMore}> 
          </Link>
          
        </div>
      )}
      </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', text:'white'}}>
        {episodes && episodes.slice(0, numEpisodesToShow).map((episode) => (
          <div key={episode.id}>
            <div className="col pb-2 pt-2"></div>
            <div className="col-md-2 "></div>
            <Link to={`/episodes/${episode.image}`}>
              <img
                src={episode.image && episode.image.medium}
                style={{ width: '280px', height: 'auto' }}
                class="rounded img-fluid"
              />
            </Link>
            {episode.name}
            <h6 class="text-white-50">E{episode.number}.{episode.runtime}m.{episode.airdate}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetails;

