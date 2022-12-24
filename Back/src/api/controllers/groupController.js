const Group = require("../models/groupModel");
const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");

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
                                res.status(200);
                                res.json({message: `Groupe crée : ${group.name}`, groupData: newGroup});
                            }
                        })
                    }
                })
            }
        }

   



    })
    
}   

// Afficher tous les groupes
exports.getAllGroups = (req, res) => {
    Group.find({}, (error, groups) =>{
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
    console.log(req.params.groupId)
    Group.findById(req.params.groupId).populate("users").populate("admin").exec(function (error, group){
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
    Group.findByIdAndDelete(req.params.groupId, (error, group) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Groupe non trouvé"});
        }
        else{
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
                    users.map(e=>{if(!groupUsers.includes(e._id)){
                        groupUsers.push(e._id);
                        User.findByIdAndUpdate({ _id: e._id },{groups: group._id}, { new: true })
                        .then(result => console.log('result : ', result))
                        .catch((error) => console.log('error : ', error))
                    }})
                    Group.findByIdAndUpdate({_id: req.params.groupId}, {users: groupUsers}, {new: true}, (error, groupUpdate) => {});

                }})
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
                    console.log('users : ', users)
                    let groupUsers = group.users;
                    console.log('group : ', group)
                    users.map(e=>{
                        if(groupUsers.includes(e._id)){
                        
                            let groupUser = e.groups;
                            console.log('groupUser : ', groupUser)
                            groupUser = groupUser.filter(group1=> group1 != group._id)
                            console.log('groupUser 2 : ', groupUser)
                            User.findByIdAndUpdate({ _id: e._id },{groups: groupUser}, { new: true })
                            .then(result => console.log('result : ', result))
                            .catch((error) => console.log('error : ', error))
                     }})
                    groupUsers = groupUsers.filter(group1 => !users.includes(group1))
                    Group.findByIdAndUpdate({_id: req.params.groupId}, {users: groupUsers}, {new: true}, (error, groupUpdate) => {});

                }})
            res.status(200);
            res.json({message: `${group.name} est bien modifié`})
        }
    }) 
}