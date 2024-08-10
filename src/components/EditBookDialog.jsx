import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditBookDialog = ({ book, open, onClose, onSave, onChange }) => {
  if (!book) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <form>
          <TextField fullWidth margin="normal" name="title" label="Title" value={book.title} onChange={onChange} />
          <TextField fullWidth margin="normal" name="author" label="Author" value={book.author} onChange={onChange} />
          <TextField fullWidth margin="normal" name="isbn" label="ISBN" value={book.isbn} onChange={onChange} disabled/>
          <TextField fullWidth margin="normal" name="publicationYear" label="Publication Year" value={book.publicationYear} onChange={onChange} type="number" />
          <TextField fullWidth margin="normal" name="genre" label="Genre" value={book.genre} onChange={onChange} />
          <TextField fullWidth margin="normal" name="copiesAvailable" label="Copies Available" value={book.copiesAvailable} onChange={onChange} type="number" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDialog;