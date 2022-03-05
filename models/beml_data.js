const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// temp, humidity, ws
const data = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    extra: Object,
    images: Object
})

const data = mongoose.model("data", data);
module.exports = {data};