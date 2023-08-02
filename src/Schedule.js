import React, { useState, useEffect } from 'react';

function Schedule({ id }) {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = () => {
      const url = `: https://api.tvmaze.com/schedule/full/${id}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setSchedule(data));
    };

    fetchSchedule();
  }, [id]);
}

return(
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', text:'white'}}>
    {schedule.map((episode) => (
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
)
export default Schedule;
