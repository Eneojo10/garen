import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();


    try {
      console.log('Searching for:', searchTerm);
      const response = await axios.get(`http://localhost:5000/search/${searchTerm}`);
      console.log('Search results:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={searchTerm}
          placeholder='Search keyword...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} type='submit'>
          <FontAwesomeIcon icon={faSearch} color='black' />
        </button>
      </form>

      <div className='search-results'>
        {searchResults.map((result) => (
          <div key={result._id}>
            <h4>
              {result.firstname} {result.lastname}
            </h4>
            <p>Email: {result.email}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
