const todoModel = require('./todoTasksModel');

module.exports = {
    home: (req, res) => {
        todoModel.find((items) => {
            res.render('main_template.ejs', {
                title: 'Flex Force',
                todo: items,
                message: items.items.length,
            });
        });
    },
    addNewTodo: (req, res) => {
        let task = req.body;
        todoModel.insert(task, req, res);
    },
    updateTodo: (req, res) => {
        let task = req.params.id;
        if (req.query.task_title) {
            todoModel.update(task,req.query, req, res);
        } else {
            todoModel.findByPk(task, (item) => {
                res.render('edit.ejs', {
                    title: 'Flex Force edit',
                    todo: item,
                    task:task,
                });
            })
        }
    },
    deleteTodo: (req, res) => {
        let task = req.params.id;
        todoModel.delete(task, (item) => {
            console.log(item);
            res.redirect('/');
        });
    },
    markIncomplete: (req, res) => {
        let task = req.params.id;
        todoModel.incomplete(task, req, res);
    },
    markComplete: (req, res) => {
        let task = req.params.id;
        todoModel.complete(task, req, res);
    },
}