import { Schema, Types, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const blogSchema = new Schema({
    title: {
        type: String, 
        trim: true,
        required: [true, 'Title is required!'], 
        minLength: [5, 'Title should be at least 5 characters long!'],
    }, 
    imageUrl: {
        type: String, 
        trim: true,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image Url is invalid']
    },
    presentation: {
        type: String, 
        trim: true,
        required: [true, 'Presentation is required!'],
        minLength: [10, 'Presentation should be at least 10 characters long!']
    },
    content: {
        type: String, 
        trim: true,
        required: [true, 'Content is required!'],
        minLength: [10, 'Content should be at least 10 characters long!']
    }, 
    category: {
        type: String, 
        index: true,
        lowercase: true,
        trim: true,
        required: [true, 'Blog Category is required!'],
        minLength: [3, 'Blog Category should be at least 3 characters long!']
    },
    owner: { // Single Relation Property
        type: Types.ObjectId,
        ref: 'User', 
        required: [true, 'Blog should have creator!']
    }
}, { timestamps: true });

blogSchema.plugin(mongoosePaginate);

export const Blog = model('Blog', blogSchema, 'blogs');