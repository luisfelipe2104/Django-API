import React from 'react'
import { useState } from "react"
import { Form, Button, ListGroup, Card } from "react-bootstrap"
import ProfileItem from './ProfileItem'
import "../css/Search.css"

function Search() {
  const [searchText, setSearchText] = useState("")  // text of when we search for a user
  const [searchResults, setSearchResults] = useState([])  // results of a searching


  function search(e){
    fetch("http://127.0.0.1:8000/api/getUser/" + searchText)
    .then((res) => res.json())
    .then((data) => {
      if(data){
          
        


        setSearchResults([data])
        console.log(searchResults)
      }
    })
  }


  return (
    <div className="search">
      <div className="search-wrapper">
        <Form className="search-form">
          <Form.Group className="search-field">
            <Form.Control
              type="text"
              onInput={(e) => setSearchText(e.target.value)}
              placeholder="Search for a username"
            />
          </Form.Group>
          <Button variant="primary" onClick={ search }>
            Search
          </Button>
        </Form>
        {searchResults.length > 0 ? (
          <div className="search-results-wrapper">
            <Card style={{ width: "100%" }}>
              <ListGroup variant="flush">
                {searchResults.map((item, idx) => (
                  <ProfileItem {...item} idx={idx} />
                ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          <p>No Search Results</p>
        )}
      </div>
    </div>
  );
}


export default Search