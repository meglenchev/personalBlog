import { Schema, Types, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const practiceSchema = new Schema({
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
    practiceDate: {
        type: Date,
        required: [true, 'Practice Date is required!']
    }, 
    owner: {
        type: Types.ObjectId,
        ref: 'User', 
        required: [true, 'Practice should have creator!']
    }
}, { timestamps: true });

practiceSchema.plugin(mongoosePaginate);

export const Practice = model('Practice', practiceSchema, 'practices');