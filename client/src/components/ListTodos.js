import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './stylesList.js';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Moment from 'moment';
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);



const ListTodos = () => {
    const [todos, setTodos]=useState("");
    const [display, setDisplay]=useState("");
    const [search, setSearch]=useState("");
    const classes = useStyles();
    const [fielder, setFielder] = useState("");
   

    const deleteTodo = async id => {
        try {
          const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
          });
    
          setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

      // function MyFunction(check) {
      //   var tempDate = check;
      //   var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' ';
      //   const currDate = date;
      //   return (
      //     <p>{currDate}</p>
      //   );
      // }

      const searchTodo = async() => {
      
            if(fielder==="title")
            setDisplay(todos.filter(todo => todo.title === search));
            if(fielder==="description")
            setDisplay(todos.filter(todo => todo.description === search));
            if(fielder==="priority")
            setDisplay(todos.filter(todo => todo.priority === search));
            if(fielder==="created_date")
            {
            setDisplay(todos.filter(todo => todo.created_date === search));
            }
            if(fielder==="todo_state")
            setDisplay(todos.filter(todo => todo.todo_state === search));
          
      };

      const getTodos =async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();
            setTodos(jsonData);
            setDisplay(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getTodos();
    }, [])

    const clear = () => { 
      setFielder("");
      setSearch("");
    };
    return (
        <Fragment>
            {" "}
            <div>
            <label for="search"><b>Search: </b></label>
            <br>
            </br>
            {/* <TextField name="title" variant="outlined" label="Text" fullWidth value={text} onChange={(e) => setSearch(e.target.value )} /> */}
            <input type="text" className="form-control" label="Enter Your Search Text" value={search} onChange={e =>
                    setSearch(e.target.value)}/>
            <br>
            </br>
            <select value={fielder} onChange={e => setFielder(e.target.value)}>
                <option value="" ></option>
                <option value="title" >Title</option>
                <option value="description">Description</option>
                <option value="priority">Priority</option>
                <option value="created_date">Date</option>
                <option value="todo_state">State</option>
            </select>
            
            {/* <input type="submit" value="Submit"></input> */}
            &nbsp;&nbsp;&nbsp;&nbsp;
             <button
                    className="btn btn-danger"
                    variant="contained"
                    onClick={() => searchTodo()}
                    >
                        Search
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                    className="btn btn-danger"
                    variant="contained"
                    onClick={() => getTodos()}
                    >
                        Reset
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                    className="btn btn-danger"
                    variant="contained"
                    onClick={() => clear()}
                    >
                        Clear
                    </button>
                    </div>

          <Container>
            <br>
            </br>
         { !display.length ? <CircularProgress /> : (
         
          <TableContainer component={Paper}>
            <Typography align="center" style={{fontSize:"30px", color:"#4169E1"}}><b>TASKS</b></Typography>
            <br>
            </br>
            <Table className={classes.table} aria-label="Table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b><p style={{color:'#008B8B', fontSize:'20px'}}>Title</p></b></TableCell>
                  <TableCell align="center" ><b><p style={{color:'#008B8B', fontSize:'20px'}}>Description</p></b></TableCell>
                  <TableCell align="center"><b><p style={{color:'#008B8B', fontSize:'20px'}}>Priority</p></b></TableCell>
                  <TableCell align="center"><b><p style={{color:'#008B8B', fontSize:'20px'}}>Date</p></b></TableCell>
                  <TableCell align="center"><b><p style={{color:'#008B8B', fontSize:'20px'}}>State</p></b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {display.map(todo => (
                  <TableRow key={todo.todo_id}>
                       <TableCell align="center"><p style={{fontSize:'14px'}}> {todo.title} </p></TableCell>
                    <TableCell align="center" multiline rows={4}><p style={{fontSize:'14px'}}> {todo.description} </p></TableCell>
                    <TableCell align="center"><p style={{fontSize:'14px'}}> {todo.priority} </p></TableCell>
                    {/* todo.created_date = {Moment(todo.created).format('YYYY-MM-DD')}; */}
                    <TableCell align="center"><p style={{fontSize:'14px'}}> {Moment(todo.created_date).format('DD-MM-YYYY')} </p></TableCell>
                    <TableCell align="center"><p style={{fontSize:'14px'}}> {todo.todo_state} </p></TableCell>
                    <TableCell align="center"><p style={{fontSize:'14px'}}><EditTodo todo={todo}/></p></TableCell>
                    <TableCell align="center"><p style={{fontSize:'14px'}}> <button
                            className="btn btn-danger"
                            variant="Contained"
                            onClick={() => deleteTodo(todo.todo_id)}
                            >
                            Delete
                            </button> </p></TableCell>
                     
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
               )}
               </Container>
            </Fragment>
    )
}
export default ListTodos;