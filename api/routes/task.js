const express = require("express")
const {handleGetAllTask, handleAddTask,handleUpdateTask,handleDeleteTask,handleTaskStatus} =require("../controller/task") 
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')

router.get('/',checkAuth,handleGetAllTask);
router.post('/addTask',checkAuth,handleAddTask);
router.patch('/updateTask/:taskId',checkAuth,handleUpdateTask);
router.delete('/deleteTask/:taskId',checkAuth,handleDeleteTask);
router.patch('/updateStatus/:taskId',checkAuth,handleTaskStatus);


module.exports = router;