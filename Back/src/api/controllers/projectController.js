const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");


// Create a new project

exports.createProject = (req, res) =>{
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

// Show all the projects

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

// Show a project by id

exports.getProjectById = (req,res) =>{
    Project.findById(req.params.projectId,(error,project) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            res.status(200);
            res.json(project);
        }
    });
}

// Delete project by id

exports.deleteProjectById = (req, res) => {
    Project.findByIdAndDelete(req.params.projectId, (error, project) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            res.status(200);
            res.json({message: `Project supprimé: ${project.name}`});
        }
    });
}

// Add groups in a project

exports.addGroups = (req, res) => {
    Project.findById({_id: req.params.projectId}, (error, project) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            let projectGroups = project.groups;

            req.body.groups.map(group => {
                if(!projectGroups.includes(group)){
                    projectGroups.push(group);

                    Project.findByIdAndUpdate({_id: req.params.projectId}, {groups: projectGroups}, {new: true}, (error, projectUpdate) => {
                        axios.get("http://localhost:3000/groups").then(async result2 => {
                            await req.body.groups.map(project => {
                                result2.data.map(datas => {
                                    if(datas.email == user){
                                        let projects = datas.projects;
                                        projects.push(project.name);
    
                                        axios.patch("http://localhost:3000/groups/" + datas._id, {projects: projects});
                                    }
                                });
                            })
                        })
                    });
                }
            })
            res.status(200);
            res.json({message: `${project.name} est bien modifié`})
        }
    }) 
}

// Delete groups in a project

exports.deleteGroups = (req, res) => {
    Project.findById({_id: req.params.projectId}, (error, project) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            let projectGroups = project.groups;

            req.body.groups.map(group => {
                if(projectGroups.includes(group)){
                    projectGroups = projectGroups.filter(project1 => !req.body.groups.includes(project1))
                    
                    Project.findByIdAndUpdate({_id: req.params.projectId}, {groups: projectGroups}, {new: true}, (error, projectUpdate) => {
                        axios.get("http://localhost:3000/groups").then(async result => {
                            await req.body.groups.map(group => {
                                result.data.map(datas => {
                                    if(datas.email == user){
                                        let projects = datas.projects;
                                        projects = projects.filter(project2 => project2 != projectUpdate.name)

                                        axios.patch("http://localhost:3000/users/" + datas._id, {projects: projects});
                                    }
                                });
                            })
                        })
                    });
                }
            })
            res.status(200);
            res.json({message: `${project.name} est bien modifié`})
        }
    }) 
}
