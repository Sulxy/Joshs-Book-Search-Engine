// Modify the SearchBooks component to include book search functionality and display search results
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { searchGoogleBooks, saveBook } from '../utils/API';

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await searchGoogleBooks(searchTerm);
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleSaveBook = async (bookData) => {
    try {
      await saveBook(bookData);
      // Optionally, update UI to indicate successful save
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <>
      <Container>
        <h1>Search Books</h1>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                type='text'
                size='lg'
                placeholder='Search for a book'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type='submit' variant='success' size='lg'>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <h2 className='pt-5'>
          {searchResults.length ? `Viewing ${searchResults.length} results:` : 'No results found'}
        </h2>
        <Row>
          {searchResults.map((book) => (
            <Col md='4' key={book.id}>
              <Card>
                {book.volumeInfo.imageLinks && (
                  <Card.Img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`The cover for ${book.volumeInfo.title}`}
                    variant='top'
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.volumeInfo.title}</Card.Title>
                  <p className='small'>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>                  
                  <Card.Text>{book.volumeInfo.description}</Card.Text>
                  <Button
                    className='btn-block btn-info'
                    onClick={() => handleSaveBook(book)}>
                    Save this Book
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;