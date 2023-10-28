const express = require('express');

const router = express.Router();
const taskController = require('../Controllers/Task');
const {auth, isUser, isAdmin} = require('../Middleware/auth');


router.post("/add-task", auth, taskController.addTask);
router.put("/update-task/:id", taskController.updateTask);
router.get("/fetchAll-task", taskController.getAlltask);
router.get("/fetch-task/:id", taskController.getTaskById);
router.get("/fetch-taskByUserId", auth,  taskController.getAllTaskByUserId);
router.delete("/delete-task/:id", taskController.deleteTask);
router.patch("/update-status/:id", isUser, taskController.updateTaskStatus);

module.exports = router;