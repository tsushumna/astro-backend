'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ToDoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: '',
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    deleted: {
        type: Boolean,
        required: 'Please set disabled flag',
        default: false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
ToDoSchema.set('versionKey', 'toDoVersionKey');
mongoose.model('ToDo', ToDoSchema);