const db = require("./../../config/mysql_db");
const utils = require("./../../utility/color");
module.exports = {
    find: function (callback) {
            db.query("SELECT * FROM `todo_tasks` ORDER BY `todo_tasks`.`_id` DESC", function (err, result, fields) {
                if (err) {
                    item = {
                        items: [],
                        total: 0,
                        table: 'todo_tasks',
                        err: JSON.stringify(err),
                    };
                } else {
                    item = {
                        items: result,
                        total: result.length,
                        table: 'todo_tasks',
                        err: JSON.stringify(err),
                    };
                }
                callback(item);
            });
            // Use the connection
    },
    insert: function (task, req, res) {
        var sql = "INSERT INTO `todo_tasks` SET ?";
        var color_code = utils.randomColor();
        db.query(sql, {task_title:task.task,date:task.date,time:task.time,color_code}, (err, result) => {
            console.log(task);
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });

    },
    update: function (_id, data,req, res) {
        var sql = "UPDATE `todo_tasks` SET ? where _id="+_id;
        db.query(sql, {task_title:data.task_title,date:data.date,time:data.time}, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    findByPk: function (id,cb) {
        var item = {};
        db.query("SELECT * FROM `todo_tasks` where _id=" + id, function (err, result, fields) {
            if (err) {
                item = JSON.stringify(err);
               
            } else {
                item = result[0];
                
            }
            cb(item);
        });
    },
    delete: (_id,cb)=>{
        var item = {};
        db.query("DELETE FROM `todo_tasks` WHERE `todo_tasks`.`_id` =" + _id, function (err, result, fields) {
            if (err) {
                item = JSON.stringify(err);
               
            } else {
                item = result[0];
                
            }
            cb(item);
        });
    },
    complete: (_id, req, res) => {
        var sql = "UPDATE todo_tasks SET task_status=? where _id="+_id;
        var t = db.query(sql, ['0'], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    incomplete: (_id, req, res) => {
        var sql = "UPDATE todo_tasks SET task_status=? where _id=" + _id;
        var t = db.query(sql,['1'] ,(err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
}