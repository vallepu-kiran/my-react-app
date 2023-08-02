import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Search() {
  const [show, setShow] = useState([]);
  const [chunkedMoviePosters, setChunkedMoviePosters] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = (searchString) => {
    const url = "https://api.tvmaze.com/search/shows?q=" + searchString;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var chunks = [], size = 6;
        while (data.length > 0) {
          chunks.push(data.splice(0, size));
        }
        setShow(data);
        setChunkedMoviePosters(chunks);
      })
      .catch(error => console.error(error));
  };

  const handleMoviePosterClick = (poster) => {
    navigate(`/shows/${poster.show.id}`);
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(location.search);
    const searchString = queryParameters.get("q");
    if (searchString) {
      fetchUserData(searchString);
    }
  }, [location.search]);
  const handleImageMouseOver = (event) => {
    event.target.style.transform = 'scale(1.2)';
  };

  const handleImageMouseOut = (event) => {
    event.target.style.transform = 'scale(1)';
  };

  return (
    <div style={{paddingTop:"86px"}}>
      {chunkedMoviePosters.map((chunkedArray, index) => (
        <div className='' key={index}>
          <div className="row pb-1 pt-5 bg-black" style={{}} >
            {chunkedArray.map((poster) => (
              <div className="col-2" key={poster.show.id}>
                <Link to={`/shows/${poster.show.id}`}>
                  <img
                    src={poster.show.image && poster.show.image.medium}
                    className="img-fluid rounded-3"
                    alt={poster.show.name}
                    onMouseOver={(e) => handleImageMouseOver(e)}
                    onMouseOut={(e) => handleImageMouseOut(e)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;








