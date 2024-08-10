import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Button } from '@mui/material';

const ViewBookDialog = ({ book, open, onClose }) => {
  if (!book) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Details</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography>Title: {book.title}</Typography>
            <Typography>Author: {book.author}</Typography>
            <Typography>ISBN: {book.isbn}</Typography>
            <Typography>Publication Year: {book.publicationYear}</Typography>
            <Typography>Genre: {book.genre}</Typography>
            <Typography>Copies Available: {book.copiesAvailable}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewBookDialog;