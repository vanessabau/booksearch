import axios from "axios";

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = "&api_key=AIzaSyB-gKYFkywMwTOoY3rn1GIpbayVMOsFmYU";

//query that works:
//   https://www.googleapis.com/books/v1/volumes?q=Twilight&api_key=AIzaSyB-gKYFkywMwTOoY3rn1GIpbayVMOsFmYU

export default {
  //object with a 'search' method that searches the book api for the passed query
  searchBook: function (query) {
    return axios.get(BASEURL + query.title + APIKEY);
  },

  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
};
