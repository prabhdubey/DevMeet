import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

/**
 * isPasswordValid method to validate password
 *
 * @param password User input password
 *
 * @returns {*}
 */
UserSchema.methods.isPasswordValid = function (password) {
    try {
        return bcrypt.compare(password, this.password);
    }
    catch (err) {
        throw err;
    }
};

/**
 * Pre hook method before save to convert password in encrypted format
 */
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        return next();
    }
    try {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
    catch (err) {
        next(err);
    }
});

export default mongoose.model('User', UserSchema);