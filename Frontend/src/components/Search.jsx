import React, { useState } from 'react';
import axios from 'axios';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/search?term=${searchTerm}`);
      if (response.data) {
        setSearchResult(response.data);
        setError(null);
      } else {
        setSearchResult(null);
        setError('No users found');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setSearchResult(null);
      setError('Error searching user. Please try again later.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type="text"
          placeholder='Find a user'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {searchResult && (
      <div className="userList">
        {searchResult.map(user => (
          <div key={user.id} className="user">
            <img src={user.avatar} alt="User avatar" />
            <div className="userInfo">
              <span>{user.username}</span>
            </div>
          </div>
        ))}
  </div>
      )}
    </div>
  );
}; 
