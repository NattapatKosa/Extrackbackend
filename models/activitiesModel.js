const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    activity_type: {
        type: String,
        enum: {
            values: ['cardio','weight training'],
            message: '{values} is not supported'
        },
        required: true,
    },
    activity_name: {
        type: String,
        enum: {
            values: ['run','bicycle','ride','swim','walk','hike'],
            message: '{values} is not supported'
        },
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    }
});

const activitiesModel = new mongoose.model('activities', activitiesSchema);
module.exports = activitiesModel;