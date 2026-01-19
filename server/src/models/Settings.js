import { Schema, model } from "mongoose";

const settingsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name should be at least 3 characters long!']
    }, 
    email: {
        type: String,
        required: [true, 'E-mail is required!'],
        lowercase: true,
        trim: true,
        required: [true, 'E-mail is required!'],
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    }, 
    facebook: {
        type: String,
        trim: true,
        required: [true, 'Facebook Url is required!'],
        match: [/^https?:\/\//, 'Facebook Url is invalid']
    }, 
    instagram: {
        type: String,
        trim: true,
        required: [true, 'Instagram Url is required!'],
        match: [/^https?:\/\//, 'Instagram Url is invalid']
    },
    presentation: {
        type: String,
        trim: true,
        required: [true, 'Presentation is required!'],
        minLength: [20, 'Presentation should be at least 20 characters long!']
    },
    headerImg: {
        type: String,
        trim: true,
        required: [true, 'Header image is required!'],
        match: [/^https?:\/\//, 'Header Image Url is invalid']
    }, 
    authorImg: {
        type: String,
        trim: true,
        required: [true, 'Author image is required!'],
        match: [/^https?:\/\//, 'Author Image Url is invalid']
    }
}, { timestamps: true, strict: true });

export const Settings = model('Settings', settingsSchema, 'settings');