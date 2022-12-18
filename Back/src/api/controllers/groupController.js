const Group = require("../models/groupModel");
const bcrypt = require("bcrypt");
const axios = require("axios");

exports.createGroup = (req, res) =>{     
    let newGroup = new Group({
        name: req.body.name, 
        users: [req.params.userId], 
        admin: req.params.userId
    });

    newGroup.save((error, group) => {
        if(error){
            res.status(401);
            console.log(error);
            res.json({message: "Rêquete invalide"});
        }
        else{
            res.status(200);
            res.json({message: `Group crée : ${group.name}`, groupData: newGroup});
        }
    });   
}   

exports.getGroup = (req,res) =>{
    Group.findById(req.params.groupId,(error,group) =>{
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

exports.deleteGroup=(req,res)=>{
    Group.findByIdAndDelete(req.params.groupId,(error,group) =>{
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
    Group.findByIdAndUpdate({_id:req.params.groupId},{listuser:req.body.mail},{new: true},(error,group2)=>{
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



/*axios.get("http://localhost:3000/users").then(resultat => {   
    const emails = [];

    resultat.data.map(datas => {
        emails.push(datas.email);
    })
});*/