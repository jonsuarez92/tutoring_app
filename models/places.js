const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['restaurant', 'hotel', 'park', 'other'],
        required: true,
    },
    acceptsPets: {
        type: Boolean,
        required: true,
    },

    additionalInfo: {
        type: String,
        default: '',
    },
    location: {
        type: Schema.Types.Point,
        coordinates: [Number],
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
