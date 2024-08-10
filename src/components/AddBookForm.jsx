import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { addBook } from '../features/books/booksSlice';

const AddBookForm = ({ onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(addBook(data)).unwrap();
      reset();
      onClose(); 
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h5" gutterBottom>Add New Book</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Form fields remain the same */}
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="author"
          label="Author"
          {...register('author', { required: 'Author is required' })}
          error={!!errors.author}
          helperText={errors.author?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="isbn"
          label="ISBN"
          {...register('isbn', { required: 'ISBN is required' })}
          error={!!errors.isbn}
          helperText={errors.isbn?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="publicationYear"
          label="Publication Year"
          type="number"
          {...register('publicationYear', { required: 'Publication year is required' })}
          error={!!errors.publicationYear}
          helperText={errors.publicationYear?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="genre"
          label="Genre"
          {...register('genre', { required: 'Genre is required' })}
          error={!!errors.genre}
          helperText={errors.genre?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          id="copiesAvailable"
          label="Copies Available"
          type="number"
          {...register('copiesAvailable', { required: 'Number of copies is required' })}
          error={!!errors.copiesAvailable}
          helperText={errors.copiesAvailable?.message}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Add Book
        </Button>
      </Box>
    </Paper>
  );
};

export default AddBookForm;