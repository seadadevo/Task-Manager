import mongoose from "mongoose"; 
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
    password: string;
    passwordConfirm?: string; 
    isModified: (field: string) => boolean;
}

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



userSchema.pre<IUser>('save', async function(){
    if(!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined ;
    
})


const User = mongoose.model('User', userSchema);
export default User