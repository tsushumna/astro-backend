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
    }
});
UserSchema.set('versionKey', 'userVersionKey');
mongoose.model('User', UserSchema);