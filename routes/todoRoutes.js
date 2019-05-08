const utils = require('./../utility/color');
module.exports = {
    addTodo: (req, res) => {
        let task = req.body.task;
        let query = "INSERT INTO `todo_tasks`(`task_title`, `date`, `time`, `color_code`) VALUES ('" + task + "',CURRENT_DATE,CURRENT_TIME,'" + utils.randomColor() + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
};