const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    admin: {
        type: Boolean,
        default: false,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});



module.exports = mongoose.model('User', userSchema);