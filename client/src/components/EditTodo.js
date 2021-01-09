import React,{ Fragment, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import useStyles from './stylesadd';

const EditTodo = ({ todo }) => {
    // const [description, setDescription] =  useState(todo.description); 
    const [formData, setFormData] = useState({ title: todo.title,  created_date: todo.created_date, description: todo.description, priority: todo.priority, todo_state: todo.todo_state})
    //edit description function
    
    const classes = useStyles();
    // console.log(formData);
    const updateDescription= async e => {
        e.preventDefault();
        try {
            // console.log(formData);
            const body = formData;
            console.log(JSON.stringify(body));
            const response  =await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.application = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return <Fragment>
        
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
           Edit
            </button>

            
        <div class="modal" id={`id${todo.todo_id}`} onClick={() => setFormData(formData)}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Todo</h4>
                    <button type="button" class="close" data-dismiss="modal" onClick={() => setFormData(formData)}>&times;</button >
                </div>

                <div class="modal-body">
                    {/* <input type="text" className="form-control" value={description} onChange={e =>
                    setDescription(e.target.value)}/> */}
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={e=>updateDescription(e)}>     
                <Typography variant="h6">Form</Typography>
                {/* <TextField name="check" variant="outlined" label="check" fullWidth value={reviewData.check} onChange={(e) => setReviewData({ ...reviewData, check: e.target.value })} /> */}

                <TextField name="title" variant="outlined" label="Title" fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <TextField name="description" variant="outlined" label="description" fullWidth value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <TextField name="priority" variant="outlined" label="priority" fullWidth  value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} />
                <TextField name="todo_state" variant="outlined" label="todo_state" fullWidth value={formData.todo_state} onChange={(e) => setFormData({ ...formData, todo_state: e.target.value })} />
                <div class="modal-footer">

                <Button className="btn btn-danger" variant="contained" color="primary"  type="submit" fullWidth>Edit</Button>
                <Button variant="contained" color="secondary"  fullWidth onClick={() => setFormData(formData)}>Close</Button>
                </div>
            </form>

                     </div>

                </div> 
            </div>
            </div>
    </Fragment>
}

export default EditTodo;