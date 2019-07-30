var mongoose = require('mongoose')
var Schema = mongoose.Schema

const TravelDetails = new Schema({
    travelId: {
        type: String,
        unique: true
    },
    summary:String,
    description: String,
    monthOfTravel: String,
    location: String,
    modeOfTransport: String,
    placesToVisit: String,
    rating: Number,
    hotelName: String,
    travelUserId: String
});

module.exports = mongoose.model('TravelDetails', TravelDetails);