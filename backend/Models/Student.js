const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studantSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    rollno:{
        type: Number
    },
    gender:{
        type: String
    },
    dateofbirth:{
        type: Date
    },
    allregistered:{
        type: Boolean
    }
},{
    collection: 'students'
})

module.exports = mongoose.model('Studant', studantSchema)