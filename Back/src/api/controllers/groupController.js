const Group = require("../models/groupModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

// Créer un nouveau groupe
exports.createGroup = async (req, res) => {  
    User.findOne({ email: req.body.admin }, (error, admin) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            if(req.body.users){
                User.find({ email: {$in:req.body.users} }, (error, users) => {
                    if (error) {
                        res.status(500);
                        console.log(error);
                        res.json({ message: "Utilisateur non trouvé" });
                    }
                    else {
                        let newGroup = new Group({
                            name: req.body.name, 
                            users: users.map(e=>{return e._id}), 
                            admin: admin._id
                        }); 

                        newGroup.save((error, group) => {
                            if(error){
                                res.status(401);
                                console.log(error);
                                res.json({message: newGroup});
                            }
                            else{
                                users.map(e=>{
                                    let groupUsers = e.groups;
                                    groupUsers.push(group._id);  

                                    User.findByIdAndUpdate({ _id: e._id },{groups: groupUsers}, { new: true })
                                    .then(result => console.log('result : ', result))
                                    .catch((error) => console.log('error : ', error))
                                })

                                admin.groups.push(group._id)
                                User.findByIdAndUpdate({ _id: admin._id },{groups: admin.groups}, { new: true })
                                .then(result => console.log('result : ', result))
                                .catch((error) => console.log('error : ', error))

                                res.status(200);
                                res.json({message: `Groupe crée : ${group.name}`, groupData: newGroup});
                            }
                        })
                    }
                })
            }
            else {
                let newGroup = new Group({
                    name: req.body.name, 
                    admin: admin._id
                }); 
    
                newGroup.save((error, group) => {
                    if(error){
                        res.status(401);
                        console.log(error);
                        res.json({message: newGroup});
                    }
                    else{
                        res.status(200);
                        res.json({message: `Groupe crée : ${group.name}`, groupData: newGroup});
                    }
                })
            }
        }
    })
}   

// Afficher tous les groupes
exports.getAllGroups = (req, res) => {
    Group.find({}).populate("users").populate("admin").populate("projects").exec(function (error, groups){
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur"});
        }
        else{
            res.status(200);
            res.json(groups);
        }
    });
}

// Afficher un groupe par id
exports.getGroupById = (req, res) => {
    Group.findById(req.params.groupId).populate("users").populate("admin").populate("projects").exec(function (error, group){
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Groupe non trouvé"});
        }
        else{
            res.status(200);
            res.json(group);
        }
    });
}

// Supprimer un groupe par id
exports.deleteGroupById = (req, res) => {
    Group.findByIdAndDelete(req.params.groupId).populate("users").populate("admin").populate("projects").exec((error, group) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Groupe non trouvé"});
        }
        else{
            if(group.users != null){
                group.users.map(user => {
                    let userGroups = user.groups.filter(group => group.valueOf() !== req.params.groupId);
                    User.findByIdAndUpdate({_id: user._id}, {groups: userGroups}, {new: true}, (error, userUpdate) =>{})

                    group.projects.map(project => {
                        if(user.projects.includes(project._id)){
                            console.log(user.projects)
                            console.log("user.projects")
                            let newProjects = user.projects.filter(userProject => userProject.valueOf() !== project._id.valueOf());

                            console.log(newProjects)
                            User.findByIdAndUpdate({_id: user._id}, {projects: newProjects}, {new: true}, (error, adminUpdate) =>{})
                        }
                        
                    })
                })
            }

            if(group.projects != null){
                group.projects.map(project => {  
                    let projectGroups = project.groups.filter(group => group.valueOf() !== req.params.groupId);
                    Project.findByIdAndUpdate({_id: project._id}, {groups: projectGroups}, {new: true}, (error, userUpdate) =>{})                   
                })
            }

            User.findById({_id: group.admin._id}, (error, admin) =>{
                if(admin.groups != null) {
                    let adminGroups = admin.groups.filter(group => group.valueOf() !== req.params.groupId);
                    User.findByIdAndUpdate({_id: group.admin}, {groups: adminGroups }, {new: true}, (error, adminUpdate) =>{})
                }

                if(admin.projects != null){
                    admin.projects.map(projectId => {
                        Project.findById({_id: projectId}, (error, project) => {
                            project.groups.map(group => {
                                if(project.groups.includes(req.params.groupId)){
                                    let newGroups = group.filter(groupId => groupId.valueOf() !== req.params.groupId);
                                
                                    let updateProject = {
                                        _id: adminProject._id,
                                        name: adminProject.name,
                                        groups: newGroups,
                                        __v: adminProject.__v
                                    }
    
                                    User.findByIdAndUpdate({_id: group.admin}, {projects: updateProject}, {new: true}, (error, adminUpdate) =>{})
                                }
                            })
                        })
                    })
                }
            })
            
            res.status(200);
            res.json({message: `Groupe supprimé: ${group.name}`});
        }
    });
}

// Ajouter les utilisateurs voulus dans un groupe
exports.addUsers = (req, res) => {
    Group.findById({_id: req.params.groupId}, (error, group) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Groupe non trouvé"});
        }
        else{
            User.find({ email: {$in:req.body.users} }, (error, users) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({ message: "Utilisateur non trouvé" });
                }
                else {
                    let groupUsers = group.users;
                    users.map(e => {
                        if(!groupUsers.includes(e._id)){
                            groupUsers.push(e._id);

                            User.findByIdAndUpdate({ _id: e._id },{groups: group._id}, { new: true })
                            .then(result => console.log('result : ', result))
                            .catch((error) => console.log('error : ', error))
                        }
                    })

                    Group.findByIdAndUpdate({_id: req.params.groupId}, {users: groupUsers}, {new: true}, (error, groupUpdate) => {});
                }
            })

            res.status(200);
            res.json({message: `${group.name} est bien modifié`})
        }
    }) 
}

// Supprimer les utilisateurs voulus dans un groupe
exports.deleteUsers = (req, res) => {
    Group.findById({_id: req.params.groupId}, (error, group) => {
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Groupe non trouvé"});
        }
        else{
            User.find({ email: {$in:req.body.users} }, (error, users) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({ message: "Utilisateur non trouvé" });
                }
                else {
                    let groupUsers = group.users;
                    users.map(e => {
                        if(groupUsers.includes(e._id)) {
                            let groupUser = e.groups;
                            groupUser = groupUser.filter(group1 => group1.valueOf() !== group._id.valueOf())

                            User.findByIdAndUpdate({ _id: e._id },{groups: groupUser}, { new: true })
                            .then(result => console.log('result : ', result))
                            .catch((error) => console.log('error : ', error))
                        }

                        groupUsers = groupUsers.filter(user => user._id.valueOf() !== e._id.valueOf())
                    
                        Group.findByIdAndUpdate({_id: req.params.groupId}, {users: groupUsers}, {new: true}, (error, groupUpdate) => {});
                    })
                }
            })

            res.status(200);
            res.json({message: `${group.name} est bien modifié`})
        }
    }) 
}