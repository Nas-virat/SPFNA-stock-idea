const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already exists"],
    },
    image: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: [6, "Password must be of minimum 6 characters"],
        required: true
    },
    role:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    port:{
        stock: [{
            symbol: {
                type: String,
                required: true
            },
            cost_price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        }],
        cash: [{
            currency: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        }],
    }
});


userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.getResetPasswordToken = async function() {

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model("User", userSchema);

module.exports = User;
