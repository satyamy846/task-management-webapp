const Task = require('../Models/Task');

const addTask = async (req, res, next)=>{
    try{
            const {
                name,
                description,
                status
            } = req.body;
            if(!name || !description){
                return res.status(400).json({
                    success: false,
                    msg:"Name and description is required"
                })
            }
            console.log(req.user);
            const task = await Task.create({
                name:name,
                description: description,
                status:status,
                userId: req.user.id
            });
            if(!task){
                res.status(400).json({message: "Error while adding task"});

            }
            res.status(200).json({
                message:"Task is added successfully",
                task:task
            })
    }
    catch(err){
        console.log(err)
    }
}

const updateTask = async (req, res, next)=>{
    try{
            const id = req.params.id;
            const {
                name,
                description,
                status,
            } = req.body

            const newUpdate = {
                name: name,
                description: description,
                status: status,
                userId: req.user.id,
            }

            const task = await Task.findByIdAndUpdate(id, newUpdate, {new: true});

            if(!task){
                res.status(400).json({message: "Error while adding task"});

            }
            res.status(200).json({
                message:"Task is updated successfully",
                task:task
            })
    }
    catch(err){
        console.log(err)
    }
}

const getAlltask = async (req, res, next)=>{
    try{
            const tasks = await Task.find({});
            if(!tasks){
                res.status(404).json({
                    message: "Task not found"
                })
            }

            res.status(200).json({
                tasks:tasks
            })
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

const getTaskById = async (req, res, next)=>{
    try{
            const id = req.params.id;
            const task = await Task.findOne({_id:id});
            if(!task){
                res.status(404).json({
                    message: "Task not found"
                })
            }

            res.status(200).json({
                task:task
            })
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

const getAllTaskByUserId = async(req, res, next)=>{
    try{

            console.log("user == " + req.user)
            const task = await Task.find({userId: req.user.id});
            console.log("task == ", task);
            if(!task){
                return res.status(400).json({
                    msg:"Task not found"
                })
            }

            res.status(200).json({
                msg: "Fetched successfully",
                task:task
            })
    }
    catch(err){

    }
}

const deleteTask = async (req, res, next)=>{
    try{
            const id = req.params.id;
            const task = await Task.findByIdAndRemove({_id:id});
            if(!task){
                res.status(404).json({
                    message: "Task not found"
                })
            }

            res.status(200).json({
                message:"Task has been deleted"
            })
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

const updateTaskStatus =  async (req, res, next) => {
    try{
           const status = req.body.status;
           const taskId = req.body.id;

           if(!status){
            return res.status(400).json({ msg: "Please provide status"});
           }
           if(!taskId){
            return res.status(400).json({ msg: "Task id must not empty"});
           }
           const task = Task.findOne({ _id: taskId, userId: req.user.id});

           if(!task){
            return res.status(400).json({
                msg:"Task not found"
            })
           }

           task.status = status;
           await task.save();

           res.status(200).json({ msg: "Status is updated"});
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg:"Somethig went wrong!"});
    }
}

module.exports ={
    addTask,
    updateTask,
    getAlltask,
    getTaskById,
    deleteTask,
    updateTaskStatus,
    getAllTaskByUserId
}