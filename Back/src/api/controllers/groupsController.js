const Groups = require("../models/groupsModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios")
exports.CreateGroups = (req, res) =>{
    let listmail = req.body.listuser.split(",")
    listmail.map(e=>{                
        User.findOne({email: e}, (error, user) => {
            if(error || (!error && !user)){
                bcrypt.hash("test1234", 10, (error, hash) => {
                    if(error){
                        res.status(401);
                        console.log(error);
                        res.json({message: "Impossible de crypter le mot de passe (groups)"});
                    }
                    else{
                        let newUser = new User({firstname:e,lastname:e,email:e,password:hash});
                        newUser.save();
                    }
                })
            }
        })
    })            
    let newGroups = new Groups(req.body);
    newGroups.save((error, groups) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json({message: `Group crée : ${groups.name}`});
        }
    });
        
            
}   


exports.getGroup = (req,res) =>{
    Groups.findById(req.params.groupId,(error,group) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Group non trouvé"});
        }
        else{
            res.status(200);
            res.json({message: `Group trouvé : ${group}`});
        }
    });
}
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
exports.deleteGroup=(req,res)=>{
    Groups.findByIdAndDelete(req.params.groupId,(error,group) =>{
        if(error){
            res.status(500);
            console.log(error);
            res.json({message: "Group non trouvé"});
        }
        else{
            res.status(200);
            res.json({message: `Group trouvé : ${group}`});
        }
    });
}