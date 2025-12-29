import React from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Saved({ savedBooks, deleteBook }) {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Saved Books</h1>
            <h4>Saved Books of Interest</h4>
          </Jumbotron>
          {savedBooks.length ? (
            <List>
              {savedBooks.map((book) => (
                <ListItem key={book.id}>
                  <strong>
                    {book.volumeInfo.title}
                    {book.volumeInfo.authors &&
                      " by " + book.volumeInfo.authors.join(", ")}
                  </strong>
                  <DeleteBtn onClick={() => deleteBook(book.id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Saved Books to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
