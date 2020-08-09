var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
'use strict';
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        default: '',
    },
    password: {
        type: String,
        trim: true,
        default: '',
    }
});
UserSchema.set('versionKey', 'userVersionKey');
mongoose.model('User', UserSchema);