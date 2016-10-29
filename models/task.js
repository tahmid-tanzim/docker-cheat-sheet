var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Create a Schema */
var taskSchema = new Schema({
    title: String,
    isDone: Boolean
}, {
    collection : 'tasks'
});

/* Create a model using Schema */
module.exports = mongoose.model('Task', taskSchema);