// mongodb+srv://kalepallikesavulareddy:ugPHI1XXuRwbCw6A@cluster0.tzpqn.mongodb.net/

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://kalepallikesavulareddy:ugPHI1XXuRwbCw6A@cluster0.tzpqn.mongodb.net/todoApp');

const newtodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const addTodo = mongoose.model('addTodo', newtodoSchema);


module.exports = {
    addTodo
}