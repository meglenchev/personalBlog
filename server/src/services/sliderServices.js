import { Slider } from "../models/Slider.js";

export default {
    create(sliderData) {
        return Slider.create({sliderData});
    }, 
    getAll() {
        return Slider.find()
    },
    getOne(sliderId) {
        return Slider.findById(sliderId);
    },
    update(sliderId, sliderData) {
        return Slider.findByIdAndUpdate(sliderId, sliderData, { 
            runValidators: true, 
            new: true 
        });
    }, 
    delete(sliderId) {
        return Slider.findByIdAndDelete(sliderId)
    }
}