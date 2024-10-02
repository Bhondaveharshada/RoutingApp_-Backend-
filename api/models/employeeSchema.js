const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    mobileNo:{
       type:Number,
       required:true
    },
    post:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    empImage:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Employees',employeeSchema)