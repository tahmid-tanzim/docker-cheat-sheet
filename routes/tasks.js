var express = require('express');
var router = express.Router();

/* MongoDB Connection  */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean_test');

/* Get Model */
var Task = require('../models/task');

/* Get All Tasks */
router.get('/tasks', function (req, res, next) {
    Task.find({}, function (err, tasks) {
        if (err) {
            res.send(err);
        }
        var taskMap = {};

        tasks.forEach(function (task) {
            taskMap[task._id] = task;
        });

        res.json(taskMap);
        //res.json(tasks);
    });
});

/* Get Single Task */
router.get('/task/:id', function (req, res, next) {
    Task.find({_id: req.params.id}, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

/* Save Single Task */
router.post('/task', function (req, res, next) {
    var data = req.body;
    console.log("Save Task: ",JSON.stringify(data, null, 2));
    if (!data.title || typeof data.isDone != 'boolean') {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        var task = new Task(data);
        task.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({"message": "Task save successfully."}, task);
        });
    }
});

/* Delete Single Task */
router.delete('/task/:id', function (req, res, next) {
    Task.findByIdAndRemove({_id: req.params.id}, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({"message": "Task remove successfully"});
    });
});

/* Update Single Task */
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if(task.isDone) {
        updTask.isDone = task.isDone;
    }

    if(task.title) {
        updTask.title = task.title;
    }

    if(!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        Task.findByIdAndUpdate({_id: req.params.id}, updTask, {new: true}, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({"message": "Task updated successfully"});
        });
    }


});

module.exports = router;