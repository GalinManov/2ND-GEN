const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    description: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type:[]

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',       
    },
    sold: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;