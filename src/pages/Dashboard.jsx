// import React, { useState } from 'react';
// import { Container, Typography, Box, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
// import Navbar from '../components/Navbar';
// import StudentList from '../components/StudentList';
// import BookList from '../components/BookList';

// const Dashboard = () => {
//   const [activeView, setActiveView] = useState('students');
//   const [showAddBookForm, setShowAddBookForm] = useState(false);

//   const toggleAddBookForm = () => {
//     setShowAddBookForm(prev => !prev);
//   };

//   return (
//     <>
//       <Navbar />
//       <Container maxWidth="xl">
//         <Grid container spacing={2} sx={{ mt: 4 }}>
//           {/* Left sidebar menu */}
//           <Grid item xs={3}>
//             <List component="nav">
//               <ListItem 
//                 button 
//                 selected={activeView === 'students'}
//                 onClick={() => setActiveView('students')}
//               >
//                 <ListItemText primary="Student List" />
//               </ListItem>
//               <ListItem 
//                 button 
//                 selected={activeView === 'books'}
//                 onClick={() => setActiveView('books')}
//               >
//                 <ListItemText primary="Book List" />
//               </ListItem>
//             </List>
//           </Grid>

//           {/* Main content area */}
//           <Grid item xs={9}>
//             {activeView === 'students' && (
//               <Box>
//                 <Typography variant="h4" gutterBottom>Student List</Typography>
//                 <StudentList />
//               </Box>
//             )}

//             {activeView === 'books' && (
//               <Box>
//                 <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="h4">Book List</Typography>
//                   <Button 
//                     variant="contained" 
//                     color="primary" 
//                     onClick={toggleAddBookForm}
//                   >
//                     {showAddBookForm ? 'Cancel' : 'Add New Book'}
//                   </Button>
//                 </Box>
//                 <Box>
//                   <BookList showAddBookForm={showAddBookForm} onCloseAddBookForm={toggleAddBookForm} />
//                 </Box>
//               </Box>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';
import StudentList from '../components/StudentList';
import BookList from '../components/BookList';
import { fetchBooks } from '../features/books/booksSlice';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('students');
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const toggleAddBookForm = () => {
    setShowAddBookForm(prev => !prev);
    if (showAddBookForm) {
      dispatch(fetchBooks()); // Refetch books when closing the form
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Left sidebar menu */}
          <Grid item xs={3}>
            <List component="nav">
              <ListItem 
                button 
                selected={activeView === 'students'}
                onClick={() => setActiveView('students')}
              >
                <ListItemText primary="Student List" />
              </ListItem>
              <ListItem 
                button 
                selected={activeView === 'books'}
                onClick={() => setActiveView('books')}
              >
                <ListItemText primary="Book List" />
              </ListItem>
            </List>
          </Grid>

          {/* Main content area */}
          <Grid item xs={9}>
            {activeView === 'students' && (
              <Box>
                <Typography variant="h4" gutterBottom>Student List</Typography>
                <StudentList />
              </Box>
            )}

            {activeView === 'books' && (
              <Box>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4">Book List</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleAddBookForm}
                  >
                    {showAddBookForm ? 'Cancel' : 'Add New Book'}
                  </Button>
                </Box>
                <Box>
                  <BookList 
                    books={books}
                    showAddBookForm={showAddBookForm} 
                    onCloseAddBookForm={toggleAddBookForm} 
                  />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
