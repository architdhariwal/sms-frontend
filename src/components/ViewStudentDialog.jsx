import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Button } from '@mui/material';

const ViewStudentDialog = ({ student, open, onClose }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Student Details</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography>Student Name: {student.name}</Typography>
            <Typography>Admission Number: {student.admissionNumber}</Typography>
            <Typography>Class: {student.class}</Typography>
            <Typography>Section: {student.section}</Typography>
            <Typography>Gender: {student.gender}</Typography>
            <Typography>Mobile Number: {student.mobileNumber}</Typography>
            <Typography>Address: {student.address}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewStudentDialog;