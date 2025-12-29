import React, { useState } from "react";
import SaveBtn from "../components/SaveBtn/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books({ savedBooks, saveBook }) {
  // Setting our component's initial state
  const [searchResults, setSearchResults] = useState([]);
  const [formObject, setFormObject] = useState({});

  //Handle book search
  function handleSearch(event) {
    event.preventDefault();
    console.log(formObject.title);
    if (formObject.title) {
      API.searchBook({
        title: formObject.title,
      })
        .then((res) => renderSearch(res.data.items))
        .catch((err) => console.log(err));
    }
  }

  function handleBookSave(book) {
    if (book) {
      saveBook(book);
    }
  }

  //Render Search Results
  function renderSearch(obj) {
    console.log(obj);
    setSearchResults(obj);
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>React Book Search</h1>
            <h4>Search and Save Books of Interest</h4>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn disabled={!formObject.title} onClick={handleSearch}>
              Submit Book
            </FormBtn>
          </form>
        </Col>

        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Search Results</h1>
          </Jumbotron>
          {searchResults.length ? (
            <List>
              {searchResults.map((book) => (
                <ListItem key={book.id}>
                  <strong>
                    {book.volumeInfo.title}
                    {book.volumeInfo.authors &&
                      " by " + book.volumeInfo.authors.join(", ")}
                  </strong>
                  <SaveBtn onClick={() => handleBookSave(book)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
