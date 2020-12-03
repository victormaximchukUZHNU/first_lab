const { Schema } = require('mongoose');

const UserClinicSchema = new Schema({ 
    fullName: {
        type: String,
        required: true
    },
    course: {
        type: Number,
        required: true
    },
    healthStatus: {
        type: Number,
        required: true
    },
}, { 
    collection: 'studentclinic',
    versionKey: false
});

module.exports = UserClinicSchema;