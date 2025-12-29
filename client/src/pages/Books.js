import React, { useState } from "react";
import SaveBtn from "../components/SaveBtn/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books({ savedBooks, saveBook }) {
  const [searchResults, setSearchResults] = useState([]);
  const [formObject, setFormObject] = useState({});

  function handleSearch(event) {
    event.preventDefault();
    if (formObject.title) {
      API.searchBook({ title: formObject.title })
        .then((res) => setSearchResults(res.data.items || []))
        .catch((err) => console.log(err));
    }
  }

  function handleBookSave(book) {
    if (book) saveBook(book);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  return (
    <div className="books-page">
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* HERO */}
            <div className="hero">
              <div className="hero-inner">
                <p className="hero-eyebrow">REACT READING LIST</p>
                <h1 className="hero-title">Book Search</h1>
                <p className="hero-subtitle">
                  Search Google Books and save your favorites.
                </p>

                {/* SEARCH CARD */}
                <div className="card search-card">
                  <form className="search-form" onSubmit={handleSearch}>
                    <div className="search-input">
                      <label className="sr-only" htmlFor="title">
                        Book title
                      </label>

                      <Input
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Search by title"
                        id="title"
                      />
                    </div>

                    <div className="search-action">
                      <FormBtn
                        disabled={!formObject.title}
                        onClick={handleSearch}
                      >
                        Search
                      </FormBtn>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="results-header">
              <h3>Search Results</h3>
              <p className="muted">
                {searchResults.length
                  ? `${searchResults.length} results`
                  : "Try searching for a book title."}
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((book) => {
                  const info = book.volumeInfo || {};
                  const thumbnail =
                    info.imageLinks?.thumbnail ||
                    info.imageLinks?.smallThumbnail ||
                    null;

                  return (
                    <div className="book-card" key={book.id}>
                      <div className="book-left">
                        <div className="thumb">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={info.title || "Book cover"}
                            />
                          ) : (
                            <div className="thumb-fallback">No cover</div>
                          )}
                        </div>
                      </div>

                      <div className="book-main">
                        <div className="book-title">
                          {info.title || "Untitled"}
                        </div>

                        <div className="book-meta">
                          {info.authors?.length
                            ? `by ${info.authors.join(", ")}`
                            : "Unknown author"}
                        </div>

                        {info.description ? (
                          <div className="book-desc">{info.description}</div>
                        ) : null}

                        <div className="book-actions">
                          <SaveBtn onClick={() => handleBookSave(book)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Books;
