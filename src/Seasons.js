
  import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Seasons() {
  const params = useParams();
  const id = params.id;

  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [firstSeason, setFirstSeason] = useState(null);

  useEffect(() => {

    const fetchSeasons = () => {
      const url = `https://api.tvmaze.com/shows/${id}/seasons`;
      fetch(url)
        .then((response) => response.json())
        .then(function(data) {
          setSeasons(data)
          setFirstSeason(data[0])
        })
        .catch((error) => {
          console.error('Error fetching seasons:', error);
        });
    };

    fetchSeasons();
  }, [id]);

  useEffect(() => {
    if(firstSeason){
      fetchEpisodes(firstSeason.id)
    }
    
  }, [firstSeason]);

  const fetchEpisodes = (seasonId) => {
    const url = `https://api.tvmaze.com/seasons/${seasonId}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEpisodes(data);
        } else {
          setEpisodes([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      });
  };

  return (
    
    <div className=" bg-black text-white" style={{paddingTop:"86px"}}>
      
       
      <Dropdown style={{ paddingTop: '25px' }}>
        <Dropdown.Toggle>Seasons</Dropdown.Toggle>
        <Dropdown.Menu style={{ borderRightWidth: '67px' }}>
          {seasons.map((season) => (
            <Dropdown.Item key={season.id} onClick={() => fetchEpisodes(season.id)}>
              Season {season.number}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <h3>Episodes</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', text:'white'}}>
      {episodes.map((episode) => (
        <div className="row pb-2 pt-2" key={episode.id}>
          <div className="col-12">
            <Link to={`/episodes/${episode.id}`}>
              <img src={episode.image && episode.image.medium} style={{ width: '100%' }} class="rounded img-fluid"/>
              </Link>
              <p style={{ width: '750px' }}>{episode.name}</p>
            <h6 class="text-white-50">E{episode.number}.{episode.runtime}m.{episode.airdate}</h6>
              
           
          </div>
        </div>
      ))}
    </div>
    </div>
  );
     }
export default Seasons;































