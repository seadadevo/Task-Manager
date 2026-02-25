import { Request, Response, NextFunction } from "express";
import Task , { ITask } from "../models/Task";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/ApiFeatures";

export const createTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const {title , description , status , priority , dueDate} = req.body;
    
    const newTask = await Task.create({
        title,
        description,
        status,
        priority,
        dueDate,
        user: req.user?.id
    });

    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: {
            task: newTask
        }
    })
});


export const getTasks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures<ITask , any>(Task.find() , req.query)
    .search()
    .filter()
    .execute()
    .sort()
    .limitFields()
    .paginate();

    const tasks = await features.query.find({ user: req.user?.id });
    
    res.status(200).json({
        success: true,
        length: tasks.length,
        message: 'Tasks fetched successfully',
        data: {
            tasks
        }
    })
})

export const getTaskById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user?._id 
    });
    if (!task) {
        return next(new AppError('Task not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Task fetched successfully',
        data: {
            task
        }
    })
})


export const updateTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findOneAndUpdate({
        _id: req.params.id,
        user: req.user?._id 
    }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(new AppError('Task not found', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: {
            task
        }
    })
})

export const deleteTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user?._id
    })

    if(!task) {
        return next(new AppError('Task not found' , 404));
    }

    res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        data: null
    })
    
})

export const deleteAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.deleteMany({ user: req.user?._id });
    res.status(200).json({
        success: true,
        message: 'All tasks deleted successfully',
        data: null
    })
})

export const getTaskStats = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const statsList = await Task.aggregate([
        { $match: { user: userId } },
       
        {
            $group: {
                _id: null, 
                total: { $sum: 1 },
                pending: {
                    $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
                },
                inProgress: {
                    $sum: { $cond: [{ $eq: ["$status", "In-Progress"] }, 1, 0] }
                },
                completed: {
                    $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] }
                }
            }
        },
    ]);

    const stats = statsList[0] || { total: 0, pending: 0, inProgress: 0, completed: 0 };

    res.status(200).json({
        success: true,
        data: { stats },
    });
});

