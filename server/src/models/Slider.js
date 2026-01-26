import { Schema, Types, model } from "mongoose";

const sliderSchema = new Schema({
    sliderContent: {
        type: String, 
        trim: true,
    },
    sliderImage: {
        type: String, 
        trim: true, 
        required: [true, 'Slider Image is required!'],
        match: [/^https?:\/\//, 'Slider Image Url is invalid']
    }
}, { timestamps: true });

export const Slider = model('Slider', sliderSchema, 'sliders');