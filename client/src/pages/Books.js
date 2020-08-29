import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
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

  function handleBookSave(obj) {
    if (formObject.title) {
      API.saveBook({
        title: formObject.title,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }
  }

  //Render Search Results
  function renderSearch(obj) {
    console.log(obj);
    setSearchResults(obj);
  }

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis,
      })
        .then((res) => loadBooks())
        .catch((err) => console.log(err));
    }
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
                  <strong>{book.volumeInfo.title}</strong>
                  <SaveBtn
                    onClick={() => handleBookSave(book.volumeInfo.title)}
                  />
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
