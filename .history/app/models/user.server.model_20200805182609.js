var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLength256, 'Please fill in your first name']
    },
    description: {
        type: String,
        trim: true,
        default: ''
    }
});
UserSchema.set('versionKey', 'userVersionKey');
mongoose.model('User', UserSchema);