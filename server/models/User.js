const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    ratedProducts: {
        
    },
    favoriteProducts: {
        type: []     
    },
    soldProducts: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'Product',  
    }

    
}, {timestamps: true});


const User = mongoose.model("User", UserSchema );

module.exports = User;