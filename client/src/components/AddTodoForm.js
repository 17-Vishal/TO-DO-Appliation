import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';


import useStyles from './stylesadd';

const AddTodoForm = () => {
    
    const classes = useStyles();
    const [formData, setFormData] = useState({ title: '', description: '', created_date: new Date(), priority: '', todo_state:''})

    function MyFunction() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' ';
        const currDate = date;
        return (
          <p>{currDate}</p>
        );
      }
      

    const onSubmitForm =  async e  => {
        e.preventDefault();
        try {
            setFormData({ ...formData, created_date: <MyFunction /> })
            const body = formData;
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body),
            });
            // console.log(response);
            window.location="/"     //to refesh
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
      
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={onSubmitForm}>     
                <Typography variant="h4" style={{ color:"#4169E1"}}><b>Form</b></Typography>
                {/* <TextField name="check" variant="outlined" label="check" fullWidth value={reviewData.check} onChange={(e) => setReviewData({ ...reviewData, check: e.target.value })} /> */}

                <TextField name="title" variant="outlined" label="Title" fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <TextField name="priority" variant="outlined" label="Priority ( 1 - 5 ) 5 being high" fullWidth  value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} />
                <TextField name="todo_state" variant="outlined" label="State ( Completed/ In_Progress/ Pending )" fullWidth value={formData.todo_state} onChange={(e) => setFormData({ ...formData, todo_state: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default AddTodoForm;