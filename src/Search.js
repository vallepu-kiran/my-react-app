import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation} from 'react-router-dom';

function Search(){
    const [search, setSearch] = useState('');
    const [show, setShow] = useState([]);
    const [chunkedMoviePosters, setChunkedMoviePosters] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
      e.preventDefault();
      
    };
    
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
          setSearch('');
        })
        .catch(error => console.error(error));
    }

    const handleMoviePosterClick = (poster) => {
      navigate(`/shows/${poster.show.id}`);
    };

    useEffect(() => {
      const queryParameters = new URLSearchParams(location.search);
      const searchString = queryParameters.get("q");
      if (searchString) {
        setSearch(searchString);
        fetchUserData(searchString);
      }
    }, [location.search]);

    const handleSearch = () => {
      navigate(`/search?q=${search}`);
      fetchUserData(search);
    };

    return (
      <div className="search-container">
        This is a testing change
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button class="bi bi-search" onClick={handleSearch}></button>
        </form>

        {chunkedMoviePosters.map((chunkedArray, index) => (
          <div className='container' key={index}>
            <div className="row pb-1 pt-3 bg-black" >
              {chunkedArray.map((poster) => (
                <div className="col-md-2" key={poster.show.id}>
                  <Link to={`/shows/${poster.show.id}` }>
                    <img
                      src={poster.show.image && poster.show.image.medium}
                      alt={poster.show.name}
                      onClick={() => handleMoviePosterClick(poster)}
                      style={{ cursor: 'pointer' }}
                      class="rounded img-fluid"
                      
                    />
                   
                  </Link>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
};

export default Search;







