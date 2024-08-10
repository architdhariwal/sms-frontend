import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const EditStudentDialog = ({ student, open, onClose, onSave, onChange }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <form>
          <TextField fullWidth margin="normal" name="name" label="Student Name" value={student.name} onChange={onChange} />
          <TextField fullWidth margin="normal" name="admissionNumber" label="Admission Number" value={student.admissionNumber} disabled />
          <TextField fullWidth margin="normal" name="class" label="Class" value={student.class} onChange={onChange} />
          <TextField fullWidth margin="normal" name="section" label="Section" value={student.section} onChange={onChange} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={student.gender} onChange={onChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth margin="normal" name="mobileNumber" label="Mobile Number" value={student.mobileNumber} onChange={onChange} />
          <TextField fullWidth margin="normal" name="address" label="Address" value={student.address} onChange={onChange} multiline rows={3} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentDialog;