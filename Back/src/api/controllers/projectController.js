const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// Creation de project 

exports.CreateProject = (req, res) =>{
    let newProject = new Project(req.body);
    newProject.save((error, groups) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json({message: `Project crée : ${project.name}`});
        }
    });
}


// Rechercher Project

exports.getProject = (req,res) =>{
    Project.findById(req.params.projectId,(error,project) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            res.status(200);
            res.json({message: `Project trouvé : ${project}`});
        }
    });
}


// Ajout de group





// Ajout de User

exports.addUser=(req,res) =>{
    Groups.findById(req.params.groupId,(error,group) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Group non trouvé"});
        }
        else{

            Groups.findByIdAndUpdate({_id:req.params.groupId},{listuser:group.listuser+","+req.body.mail},{new: true},(error,group2)=>{
                if(error){
                    res.status(500);
                    console.log(error);
                    res.json({message: "Group non trouvé"});
                }
                else{
                    res.status(200);
                    res.json({message: `Group update : ${group2}`});
                }
            })
        }
    });    
}