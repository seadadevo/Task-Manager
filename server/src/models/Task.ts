import mongoose, { Document } from "mongoose";

export interface ITask extends Document {
    title: string;
    description: string;
    status: 'Pending' | 'In-Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate: Date;
    user: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema<ITask>({
    title: {
        type: String,
        required: [true, 'A Task Must have a title'],
        trim: true,
        minLength: [5, 'Title must be at least 5 characters long'],
        maxLength: [100, 'Title must be at most 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'A Task Must have a description'],
        trim: true,
        minLength: [10, 'Description must be at least 10 characters long'],
        maxLength: [1000, 'Description must be at most 1000 characters long']
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'In-Progress', 'Completed'],
            message: 'Status must be: Pending, In-Progress, or Completed'
        },
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: {
            values: ['Low', 'Medium', 'High'],
            message: 'Priority must be: Low, Medium, or High'
        },
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        required: [true, 'A Task Must have a due date'],
        validate: {
            validator: function(el: Date) {
                return el > new Date()
            },
            message: 'Due date must be in the future'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A Task Must belong to a user']
    },

    
}, { timestamps: true })


const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task
