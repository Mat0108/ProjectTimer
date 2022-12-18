const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");


// Creation d'un nouveau project
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























// Afficher tous les projects
exports.getAllProjects = (req, res) => {
    Project.find({}, (error, projects) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(projects);
        }
    });
}

// // Afficher un groupe par id
// exports.getProjectById = (req,res) =>{
//     Project.findById(req.params.projectId,(error,project) =>{
//         if(error){
//             res.status(500);
//             console.log(error);
//             res.json({message: "Project non trouvé"});
//         }
//         else{
//             res.status(200);
//             res.json({message: `Project trouvé : ${project}`});
//         }
//     });
// }

// Delete project

// Ajout de group
//Faire un udap
// Ajout de User
