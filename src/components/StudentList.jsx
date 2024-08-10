import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { fetchStudents, deleteStudent, updateStudent } from '../features/students/studentsSlice';
import ViewStudentDialog from './ViewStudentDialog';
import EditStudentDialog from './EditStudentDialog';

const StudentList = () => {
  const { students, loading, error } = useSelector(state => state.students);
  const dispatch = useDispatch();
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

 

  const handleDelete = (admissionNumber) => {
    dispatch(deleteStudent(admissionNumber));
  };

  const handleView = (student) => {
    setViewStudent(student);
  };

  const handleEdit = (student) => {
    setEditStudent({id: student.id, ...student});
  };

  const handleCloseView = () => {
    setViewStudent(null);
  };

  const handleCloseEdit = () => {
    setEditStudent(null);
  };

  const handleSaveEdit = () => {
    dispatch(updateStudent(editStudent));
    setEditStudent(null);
  };

  const handleEditChange = (e) => {
    setEditStudent({...editStudent, [e.target.name]: e.target.value});
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Paper sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ p: 2 }}>Student List</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Admission Number</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.admissionNumber}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleView(student)}>View</Button>
                  <Button size="small" onClick={() => handleEdit(student)}>Edit</Button>
                  <Button size="small" onClick={() => handleDelete(student.admissionNumber)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewStudentDialog 
        student={viewStudent} 
        open={!!viewStudent} 
        onClose={handleCloseView} 
      />

      <EditStudentDialog 
        student={editStudent} 
        open={!!editStudent} 
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        onChange={handleEditChange}
      />
    </Paper>
  );
};

export default StudentList;