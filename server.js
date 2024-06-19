// server.js

const express = require("express");
const dotenv = require("dotenv").config();

const { Todo, todos } = require("./todo");

const app = express();

app.use(express.json());

//used for GET all todos, filtered by title todos, and filtered by title and date
app.get("/todos", (req, res) => {
  const { title, date, operator } = req.query;
  console.log(title, date, operator);
  let filteredTodos = todos;

  if (title) {
    filteredTodos = filteredTodos.filter((todo) =>
      // todo.title.toLowerCase().includes(title.toLowerCase())
      todo.matchesFiltersTitle(title)
    );
  }

  if (date && operator) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.matchesFiltersDate(date, operator)
    );
  }

  res.json(filteredTodos);
});

// GET todo by id
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  console.log("Params checking", todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// POST new todo
app.post("/todos", (req, res) => {
  const { id, title, detail, date, isCompleted } = req.body;
  const newTodo = new Todo(id, title, detail, date, isCompleted);
  todos.push(newTodo);
  res.status(201).json({ message: "success", data: newTodo });
});

// PUT update todo by id
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, detail, date, isCompleted } = req.body;
  const todoToUpdate = todos.find((todo) => todo.id === todoId);
  if (todoToUpdate) {
    todoToUpdate.title = title;
    todoToUpdate.detail = detail;
    todoToUpdate.date = date;
    todoToUpdate.isCompleted = isCompleted;
    res.json(todoToUpdate);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE todo by id
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    const deleteTodos = todos.splice(index, 1);
    res.json({ message: "Todo deleted", data: deleteTodos });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Todo API server listening at http://localhost:${port}`);
});
