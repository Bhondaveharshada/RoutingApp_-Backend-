const express = require('express');
const router = express.Router();
const {handleAddEmployee,handleGetAllEmp,handleUpdateEmp} = require('../controller/employee')
const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        const date = new Date().toISOString().replace(/:/g, '-');
      cb(null, date  + file.originalname.toString())
    }
});

const filefilter = (req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
};

const upload = multer(
    {storage:storage},
    {filefilter:filefilter}
);


router.get('/',handleGetAllEmp)
router.post('/addEmployee',upload.single('empImage'),handleAddEmployee)
router.patch('/updateEmp/:empId',handleUpdateEmp)

module.exports = router


