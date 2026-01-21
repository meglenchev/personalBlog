import { get } from "mongoose";
import { Settings } from "../models/Settings.js";

export default {
    getOne() {
        return Settings.findOne().lean();
    }, 
    getContacts() {
        return Settings.findOne().select({
            email: true,
            facebook: true,
            instagram: true
        }).lean();
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