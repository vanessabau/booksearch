import React from "react";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";

function Saved({ savedBooks, deleteBook }) {
  return (
    <div className="saved-page">
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* HERO */}
            <div className="hero hero--saved">
              <div className="hero-inner">
                <p className="hero-eyebrow">REACT READING LIST</p>
                <h1 className="hero-title">Saved Books</h1>
                <p className="hero-subtitle">
                  Your library of favorites — ready whenever you are.
                </p>

                {/* SMALL STATS CARD (optional but nice) */}
                <div className="card search-card saved-summary">
                  <div className="saved-summary-inner">
                    <div>
                      <p className="saved-summary-title">In your library</p>
                      <p className="saved-summary-count">
                        {savedBooks?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="results-header">
              <h3>Saved Books</h3>
              <p className="muted">
                {savedBooks?.length
                  ? `${savedBooks.length} saved`
                  : "You haven't saved any books yet."}
              </p>
            </div>

            {savedBooks?.length ? (
              <div className="results-grid">
                {savedBooks.map((book) => {
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
                          <DeleteBtn onClick={() => deleteBook(book.id)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"></div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Saved;
