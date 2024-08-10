import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Container, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../features/auth/authSlice';
import api from '../api';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const onSubmit = (data) => {
    api.post('/auth/login', data)
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        dispatch(login({ user: data.admissionNumber, token }));
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Invalid credentials', error);
      });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="admissionNumber"
            label="Admission Number"
            {...register('admissionNumber', { required: 'Admission number is required' })}
            error={!!errors.admissionNumber}
            helperText={errors.admissionNumber?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="outlined"
              color="primary">
              Register Student
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
