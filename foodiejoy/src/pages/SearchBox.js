import React from 'react';

const SearchBox = ({searchChange}) => {
  return (
    <input type='search'
    placeholder='search dishes'
    onChange={searchChange}/>
  );
}


export default SearchBox;
