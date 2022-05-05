import React from 'react';
import TextField from '@mui/material/TextField';
import {Container, Row, Col, Button} from 'react-bootstrap';
import './../css/Banner.css'

const SearchBox = ({keyword, searchChange}) => {
  return (
    <div className='searchbox'>
      <Container>
        <Row>
          <Col md="8">
     <div className='search-box mx-auto'>
    <input
      id="search-res"
      type="text"
      placeholder=""
      name="keyword"
      value={keyword}
      onChange={searchChange}
      variant="standard"
      style={{width: "300px"}}
    />
    </div >
          </Col>
          <Col md="4">
          <button
              onClick={() => window.scrollBy(0, 525)}
          >
              Search
    </button>
          </Col>
        </Row>
      </Container>
      </div>

    
  );
}


export default SearchBox;
