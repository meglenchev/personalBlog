import { About } from '../models/AboutModel.js';

export default {
    getOne() {
        return About.findOne().lean();
    },
    update(aboutData) {
        return About.findOneAndUpdate({}, {$set: aboutData}, {
            new: true, // Върни обновения документ
            upsert: true, // Създай го, ако не съществува
            runValidators: true, // Валидирай спрямо enum и изискванията в схемата 
            setDefaultsOnInsert: true // Задай default стойности, ако се създава нов документ
        });
    }
}