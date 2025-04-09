import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  
  useEffect(() => {
    // Add click outside listener to close results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  
  const fetchSearchResults = async () => {
    try {
      // Search for movies
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=80db2c88f978a7c08fd8b402180ede6e&query=${searchTerm}`
      );
      
      // Search for TV shows
      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=80db2c88f978a7c08fd8b402180ede6e&query=${searchTerm}`
      );
      
      // Combine and sort results by popularity
      const combinedResults = [
        ...movieResponse.data.results.map(item => ({ ...item, media_type: 'movie' })),
        ...tvResponse.data.results.map(item => ({ ...item, media_type: 'tv' }))
      ]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 8); // Limit to 8 results
      
      setSearchResults(combinedResults);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleResultClick = () => {
    setShowResults(false);
    setSearchTerm('');
  };
  
  return (
    <div className="search-container" ref={searchRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies & TV shows..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => searchTerm.length > 2 && setShowResults(true)}
      />
      
      <div className={`search-results ${showResults ? 'active' : ''}`}>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <Link
              key={`${result.media_type}-${result.id}`}
              to={`/Plotwist/${result.media_type}/${result.id}`}
              className="search-item"
              onClick={handleResultClick}
            >
              <img
                className="search-item-img"
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                    : 'https://imgur.com/IqNlhr9.jpeg'
                }
                alt={result.title || result.name}
              />
              <div className="search-item-details">
                <h4 className="search-item-title">
                  {result.title || result.name}
                </h4>
                <div className="search-item-info">
                  <span className="search-item-type">
                    {result.media_type === 'movie' ? 'Movie' : 'TV Show'}
                  </span>
                  <span className="search-item-year">
                    {result.media_type === 'movie'
                      ? (result.release_date && result.release_date.slice(0, 4))
                      : (result.first_air_date && result.first_air_date.slice(0, 4))}
                  </span>
                  <span className="search-item-rating">
                    {Math.round(result.vote_average * 10)}%
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          searchTerm.length > 2 && (
            <div className="search-item">
              <div className="search-item-details">
                <h4 className="search-item-title">No results found</h4>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Search;