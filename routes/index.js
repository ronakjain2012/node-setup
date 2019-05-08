const todoController = require('./../app/todo/todoController');
module.exports = {
    getHomePage: (req,res) => {
        todoController.home(req, res);
    },
    addTodo: (req, res) => {
        todoController.addNewTodo(req, res);
    },
    updateTodo: (req, res) => {
        todoController.updateTodo(req, res);
    },
    deleteTodo: (req,res) => {
        todoController.deleteTodo(req, res);
    },
    markIncomplete: (req,res) => {
        todoController.markIncomplete(req, res);
    },
    markComplete: (req,res) => {
        todoController.markComplete(req, res);
    }
};
