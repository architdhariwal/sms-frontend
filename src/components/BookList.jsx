import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { deleteBook, updateBook } from '../features/books/booksSlice';
import AddBookForm from './AddBookForm';
import ViewBookDialog from './ViewBookDialog';
import EditBookDialog from './EditBookDialog';

const BookList = ({ books, loading, error, showAddBookForm, onCloseAddBookForm }) => {
  const dispatch = useDispatch();
  const [viewBook, setViewBook] = useState(null);
  const [editBook, setEditBook] = useState(null);

  const handleDelete = (isbn) => {
    dispatch(deleteBook(isbn));
  };

  const handleView = (book) => {
    setViewBook(book);
  };

  const handleEdit = (book) => {
    setEditBook({...book});
  };

  const handleCloseView = () => {
    setViewBook(null);
  };


  const handleSaveEdit = () => {
    dispatch(updateBook(editBook));
    setEditBook(null);
  };

  return (
    <Paper sx={{ mt: 4 }}>
      {showAddBookForm ? (
        <AddBookForm onClose={onCloseAddBookForm} />
      ) : (
        <>
          <Typography variant="h5" sx={{ p: 2 }}>Book List</Typography>
          {loading ? (
            <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleView(book)}>View</Button>
                        <Button size="small" onClick={() => handleEdit(book)}>Edit</Button>
                        <Button size="small" onClick={() => handleDelete(book.isbn)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      <ViewBookDialog 
        book={viewBook} 
        open={!!viewBook} 
        onClose={handleCloseView} 
      />

      <EditBookDialog 
        book={editBook} 
        open={!!editBook} 
        onClose={() => setEditBook(null)}
        onSave={handleSaveEdit}
        onChange={(e) => setEditBook({...editBook, [e.target.name]: e.target.value})}
      />
    </Paper>
  );
};

export default BookList;