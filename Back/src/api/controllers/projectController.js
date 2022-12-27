const Project = require("../models/projectModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

// Créer un nouveau projet
exports.createProject = (req, res) =>{
    User.findOne({email: req.body.admin}, (error, admin) => {
        let newProject = new Project({
            name: req.body.name,
            admin: admin._id
        });

        newProject.save((error, project) => {
            if(error){
                res.status(401);
                console.log(error);
                res.json({message: "Rêquete invalide"});
            }
            else{
                User.findById({_id: admin._id}, (error, admin) => {
                    if(!admin.projects.includes(project)){
                        admin.projects.push(project);

                        User.findByIdAndUpdate({_id: admin._id}, {projects: admin.projects}, {new: true}, (error, result) => {});
                    }
                })

                res.status(200);
                res.json({message: `Project crée : ${project.name}`, projectData: project});
            }
        });
    })
}

// Afficher tous les projets
exports.getAllProjects = (req, res) => {
    Project.find({}).populate("admin").populate("groups").populate("timer").exec((error, projects) =>{
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

// Afficher un projet par id
exports.getProjectById = (req,res) =>{
    Project.findById(req.params.projectId).populate("admin").populate("groups").populate("timer").exec((error,project) =>{
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

// Supprimer un projet par id
exports.deleteProjectById = (req, res) => {
    Project.findById(req.params.projectId, (error, project) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            if(req.body.admin){
                User.findOne({_id: project.admin}, (error, admin) => {
                    if(req.body.admin == admin.email){
                        Project.findByIdAndDelete(req.params.projectId, (error, project) =>{
                            project.groups.map(group => {
                                Group.findById({_id: group._id}, (error, result) => {
                                    let projectsGroup = result.projects.filter(projectId => projectId.valueOf() !== req.params.projectId);

                                    Group.findByIdAndUpdate({_id: group._id}, {projects: projectsGroup}, {new: true}, (error, result) => {
                                        if(result.users.length != 0){
                                            result.users.map(user => {
                                                User.findById({_id: user}, (error, resultUser) => {
                                                    let projectsUser = resultUser.projects.filter(projectId => projectId.valueOf()  !== req.params.projectId);
                                                    
                                                    User.findByIdAndUpdate({_id: user}, {projects: projectsUser}, {new: true}, (error, result) => {})
                                                })
                                            })
                                        }

                                        let projectsAdmin = admin.projects.filter(projectId => projectId.valueOf()  !== req.params.projectId);
                                        
                                        User.findByIdAndUpdate({_id: admin._id}, {projects: projectsAdmin}, {new: true}, (error, result) => {})
                                    })
                                })
                            })

                            res.status(200);
                            res.json({message: `Project supprimé: ${project.name}`});
                        })
                    }
                    else {
                        res.status(500);
                        res.json({message: "Vous ne pouvez pas supprimer ce projet parce que vous n'êtes pas un admin du projet !"})
                    }
                })
            }
            else{
                res.status(500);
                res.json({message: "Ajoutez un email de l'admin au body !"})
            }
        }
    });
}

// Ajouter des groupes dans un projet
exports.addGroups = (req, res) => {
    Project.findById({_id: req.params.projectId},(error, project) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            if(req.body.admin){
                User.findOne({_id: project.admin}, (error, admin) => {
                    if(req.body.admin == admin.email){
                        let projectGroups = project.groups;
                    
                        req.body.groups.map(group => {
                            Group.findOne({_id: group}, (error, result) => {
                                if(!projectGroups.includes(group)){
                                    projectGroups.push(group);
                                
                                    Project.findByIdAndUpdate({_id: req.params.projectId}, {groups: projectGroups}, {new: true}, (error, projectUpdate) => {
                                        if(!result.projects.includes(project)){
                                            result.projects.push(project);

                                            Group.findOneAndUpdate({_id: group}, {projects: result.projects}, {new: true}, (error, group) => {
                                                if(result.users.length != 0){
                                                    result.users.map(user => {
                                                        User.findById({_id: user._id}, (error, user) => {
                                                            if(!user.projects.includes(project)){
                                                                user.projects.push(project);

                                                                User.findByIdAndUpdate({_id: user._id}, {projects: user.projects}, {new: true}, (error, result) => {});
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    });
                                }
                            })
                        })

                        res.status(200);
                        res.json({message: `${project.name} est bien modifié`})
                    }
                    else {
                        res.status(500);
                        res.json({message: "Vous ne pouvez pas ajouter des groupes dans ce projet parce que vous n'êtes pas un admin du projet !"})
                    }
                })
            }
            else{
                res.status(500);
                res.json({message: "Ajoutez un email de l'admin au body !"})
            }
        }
    }) 
}

// Supprimer des groupes dans un projet
exports.deleteGroups = (req, res) => {
    Project.findById({_id: req.params.projectId}, (error, project) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Project non trouvé"});
        }
        else{
            if(req.body.admin){
                User.findOne({_id: project.admin}, (error, admin) => {
                    if(req.body.admin == admin.email){
                        let projectGroups = project.groups;

                        req.body.groups.map(group => {
                            Group.findOne({_id: group}, (error, result) => {
                                let updateProject = projectGroups.filter(groupId => groupId.valueOf() !== group);
                    
                                Project.findByIdAndUpdate({_id: req.params.projectId}, {groups: updateProject}, {new: true}, (error, projectUpdate) => {
                                        let updateProjectGroup = result.projects.filter(projectId => projectId.valueOf() !== req.params.projectId);

                                        Group.findOneAndUpdate({_id: group}, {projects: updateProjectGroup}, {new: true}, (error, group) => {
                                            if(result.users.length != 0){
                                                result.users.map(user => {
                                                    User.findById({_id: user._id}, (error, user) => {
                                                        let updateProjectUser = user.projects.filter(projectId => projectId.valueOf() !== req.params.projectId);

                                                        User.findByIdAndUpdate({_id: user._id}, {projects: updateProjectUser}, {new: true}, (error, result) => {});
                                                    })
                                                })
                                            }
                                        })
                                });
                            })
                        })

                        res.status(200);
                        res.json({message: `${project.name} est bien modifié`})
                    }
                    else {
                        res.status(500);
                        res.json({message: "Vous ne pouvez pas supprimer des groupes dans ce projet parce que vous n'êtes pas un admin du projet !"})
                    }
                })
            }
            else{
                res.status(500);
                res.json({message: "Ajoutez un email de l'admin au body !"})
            }
        }
    }) 
}

// Modifier le timer dans un projet
exports.updateTimer = (req, res) => {
}
