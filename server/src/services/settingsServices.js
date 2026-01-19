import { get } from "mongoose";
import { Settings } from "../models/Settings.js";

export default {
    getOne() {
        return Settings.findOne().lean();
    }, 
    update(settingsData) {
        return Settings.findOneAndUpdate({}, {$set: settingsData}, {
            new: true, 
            upsert: true, 
            runValidators: true,
            setDefaultsOnInsert: true
        })
    }
}