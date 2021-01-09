// import React, { Fragment } from 'react';
// import "./App.css";

// //components
// import InputTodo from './components/InputTodo';
// import ListTodos from './components/ListTodos';

// function App() {
//     return <Fragment>
//         <div className = "container">
//             <InputTodo />
//             <ListTodos />
//         </div>
//     </Fragment>
// }

// export default App;/

import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';


import AddTodoForm from './components/AddTodoForm';
import ListTodos from './components/ListTodos';

import useStyles from './styles';
import todo from './images/todo.jpg';

const App = () => {
 
  const classes = useStyles();
 
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      <img className={classes.image} src={todo} alt="icon" height="60" align="left"/>
        <Typography className={classes.heading} variant="h2" align="center">TO-DO Application</Typography>
        
      </AppBar>
      <Grow in>
        <Container>
          <Grid container alignItems="stretch" spacing={10}>
          <br></br>
            <Grid item xs={12} sm={12}>
            <AddTodoForm />
            </Grid>
            {/* <br></br> */}
            <Grid item xs={12} sm={12}>
            <ListTodos />
            </Grid>
            
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
