const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);