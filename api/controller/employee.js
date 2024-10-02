const {model} = require("mongoose");
const express = require("express");
const Employees = require('../models/employeeSchema')


const handleGetAllEmp = async(req,res,next)=>{
    await Employees.find().exec()
    .then((result)=>{
        const response ={
            status:'Emp_list',
            count:result.length,
            employees:result.map(emp =>{
                return{
                    _id : emp._id,
                    name:emp.name,
                    age:emp.age,
                    city:emp.city,
                    email: emp.email,
                    mobileNo:emp.mobileNo,
                    psot:emp.post,
                    salary:emp.salary,
                    image:emp.empImage,
                    
                }
            
            /* request:
              return  {
                    type: "GET",
                    url:"http://localhost:3000/employee/"+emp._id
                } */
            })
        }
        res.status(200).json({response})
    }).catch(err =>{
        res.status(500).json({
            error:err
        });
    });
}

const handleAddEmployee = async(req,res,next)=>{
      console.log(req.body);
      
    const emp = await Employees.findOne({email:req.body.email})

    if(!req.body){
        return res.status(400).json({
            error:"All fields are requried"
        })
    }else if(emp){
        return res.status(400).json({
            error:"this email is already exist"
        })
    }

    const employee =  new Employees({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        city:req.body.city,
        mobileNo:req.body.mobileNo,
        post:req.body.post,
        salary:req.body.salary,
        empImage:req.body.image
    });
    employee.save()
    .then(result =>{

        console.log(result);
        res.status(201).json({
            message:"post request",
            CreatedEmployee:{
                name:result.name,
                email:result.email,
                city:result.city,
                _id :result._id,
                empImage:result.empImage,
                request:{
                    type:"GET",
                    url:'http://localhost:3000/employees/'+result._id
                }
            }
        });
            
    }).catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            })
            
        })
};

const handleUpdateEmp = async(req,res,next)=>{
     const id =req.params.empId;

    let update={
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        city:req.body.city,
        mobileNo:req.body.mobileNo,
        post:req.body.post,
        salary:req.body.salary,
        empImage:req.file.path
    }

    await Employees.updateOne({_id:id},{$set:update})
    .exec()
    .then((result)=>{
        res.status.json({
            message:"empoyee data updated",
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    });

};
    



module.exports ={
    handleAddEmployee,
    handleGetAllEmp,
    handleUpdateEmp
}