const express = require("express")
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


//Routes are defined below

// { CREATE } todo
app.post("/todos", async(req, res) => {
    try {
        const newTodo = await pool.query("INSERT INTO todo (title, description, created_date, priority, todo_state) VALUES($1, $2, $3, $4, $5) RETURNING * ",
        [req.body.title, req.body.description, req.body.created_date, req.body.priority, req.body.todo_state]
        );

        res.json(newTodo.rows[0] )
    } catch (err) {
        console.error(err.message);
    }
});


// { READ } todo 
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * from todo ORDER BY priority DESC");
        res.json(allTodos.rows);
    }
    catch(err)
    {
        console.error(err.message);
    }
});


// { READ } todo by id
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * from todo WHERE todo_id = $1",[
            id
        ]);
        res.json(todo.rows[0]);
    }
    catch(err)
    {
        console.error(err.message);
    }
});


// { UPDATE } a todo
app.put('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { title, created_date, description, priority, todo_state } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET (title, created_date, description, priority, todo_state) = ($1, $2, $3, $4, $5) WHERE todo_id = $6",[
            title, created_date, description, priority, todo_state, id 
        ]);
        res.json("TODO was updated");
    }
    catch(err)
    {
        console.error(err.message);
    }
});


//{ DELETE } a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[
            id 
        ]);
        res.json("TODO was DELETED");
    }
    catch(err)
    {
        console.error(err.message);
    }
});



app.listen(5000, () => {
    console.log("Server");
});