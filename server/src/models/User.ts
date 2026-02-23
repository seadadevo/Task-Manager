import mongoose from "mongoose"; 
import validator from "validator";

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your name!'],
        trim: true,
        minLength: [5 , 'Name must be at least 5 characters long!'],
        maxLength: [30 , 'Name must be at most 30 characters long!']
    },
    email: {
        type: String,
        required: [true, 'Please Enter your email!'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail , 'Please Enter a valid email!']
    },
    photo: {
        type: String,
        default: 'default.png'    
    },
    password: {
        type: String,
        required: [true, 'Please Enter your password!'],
        trim: true,
        minLength: [6 , 'Password must be at least 6 characters long!'],
        maxLength: [30 , 'Password must be at most 30 characters long!'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your Password'],
        validate: {
            validator: function(el: string) {
                return el === (this as any).password
            },
            message: 'Passwords are not the same'
        }

    },
    
} )

const User = mongoose.model('User', userSchema);
export default User