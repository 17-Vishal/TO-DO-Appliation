# TO-DO Application


### Approach:
I have made made a Database using Postgre SQL, In the database I created a table todo and set columns with field title, description, priority, date and state in it.
Then I worked on API's of backend to Create, Update, Read and Delete the data. In Read I have sorted the data by priority so that the more priority data is displayed on top of the table. For update and delete I have took help of parameter because we need the id of the row that is to be changed. 
Then I have worked on the frontend part using React JS, designing the form and table field.
In form I have took all the data and then called my post API to store data.
Then to display table I have used get API, and also PUT and DELETE API's are used to change the data.
Also I have put a search field so that oen can search the specific tasks.

-> To run I have not shared node modules. The project can be cloned and after adding node modules it will be ready to run. I have used node version 14 in this. Also to start server we have go in server folder and so "npm start" and the same commmand by going in client folder from the command line.

Below is the database Schema
```
CREATE DATABASE TODO_APP;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    created_date DATE,
    description VARCHAR(255),
    priority VARCHAR(255),
    todo_state VARCHAR(255)
);
```

All The API's to Create, Read, Delete, Update.
```
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
```

This is the form section here we can enter fields like title, description, priority of the task, and state it is in.
 ![alt text](https://github.com/17-Vishal/TO-DO-Application/blob/main/App_Images/1.PNG)


 Now, here below is search button that can be used to search for a specific text of specific field.
 ![alt text](https://github.com/17-Vishal/TO-DO-Application/blob/main/App_Images/2.png)
 
 
 Now, below is the table that will be displayed. The table is sorted by **priority** and  also we can edit and delete data from list.
 ![alt text](https://github.com/17-Vishal/TO-DO-Application/blob/main/App_Images/3.PNG)
 
 
 Now, this is edit section that will come on clicking edit button, we can edit our data here and save it.
 ![alt text](https://github.com/17-Vishal/TO-DO-Application/blob/main/App_Images/4.PNG)

Below is the database Schema
```
CREATE DATABASE TODO_APP;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    created_date DATE,
    description VARCHAR(255),
    priority VARCHAR(255),
    todo_state VARCHAR(255)
);
```

All The API's to Create, Read, Delete, Update.
```
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
```


Thanks a lot!
