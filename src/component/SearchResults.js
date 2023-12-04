import React from 'react';

const SearchResults = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <div>
      {results.map((result, index) => {
        <div key={index}>{result}</div>;
      })}
    </div>
  );
};

export default SearchResults;
