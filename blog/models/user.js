var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    avatar: {
        type: String,
        default: '/images/default-avatar.png'
    },
    title: {
        type: String,
        default: 'Sabertazimi\'s Blog'
    },
    description: {
        type: String,
        default: 'The Art of Code'
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
