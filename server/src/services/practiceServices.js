import { Practice } from "../models/Practice.js";

export default {
    create(practiceDate, ownerId) {
        return Practice.create({
            ...practiceDate,
            owner: ownerId
        });
    },
    getAll() {
        let query = Practice.find().sort({ createdAt: -1 });
        return query;
    },
    getLast() {
        return Practice.find().sort({ _id: -1 }).limit(3)
    }, 
    getOne(practiceId) {
        return Practice.findById(practiceId);
    },
    update(practiceDate, practiceId) {
        return Practice.findByIdAndUpdate(practiceId, practiceDate, {
            runValidators: true,
            new: true
        });
    }, 
    delete(practiceId) {
        return Practice.findOneAndDelete(practiceId)
    }
}