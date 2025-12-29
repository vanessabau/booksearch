import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Saved from "./pages/Saved";

function App() {
  // Local state for saved books (when no database is available)
  const [savedBooks, setSavedBooks] = useState([]);

  // Function to save a book locally
  const saveBook = (book) => {
    // Check if book is already saved
    const isAlreadySaved = savedBooks.some(
      (savedBook) => savedBook.id === book.id
    );
    if (!isAlreadySaved) {
      setSavedBooks([...savedBooks, book]);
    }
  };

  // Function to delete a book from local state
  const deleteBook = (bookId) => {
    setSavedBooks(savedBooks.filter((book) => book.id !== bookId));
  };

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Books savedBooks={savedBooks} saveBook={saveBook} />}
          />
          <Route
            path="/books"
            element={<Books savedBooks={savedBooks} saveBook={saveBook} />}
          />
          <Route
            path="/saved"
            element={<Saved savedBooks={savedBooks} deleteBook={deleteBook} />}
          />
          <Route path="/books/:id" element={<Detail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
