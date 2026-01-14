import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'Username should be at least 3 characters long!'],
    },
    email: {
        type: String,
        required: [true, 'E-mail is required!'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        //minLength: [10, 'E-mail should be at least 10 characters long!'], 
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [10, 'Password should be at least 10 characters long!'],
    }, 
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
        required: true,
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    };

    this.password = await bcrypt.hash(this.password, 10);
});

export const User = model('User', userSchema, 'users');