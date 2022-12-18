const Group = require("../models/groupModel");
const bcrypt = require("bcrypt");
const axios = require("axios");

// Créer un nouveau groupe
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
            res.json({message: `Groupe crée : ${group.name}`, groupData: newGroup});
        }
    });   
}   

// Afficher tous les groupes
exports.getAllGroups = (req, res) =>{
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
exports.getGroupById = (req, res) =>{
    Group.findById(req.params.groupId, (error, group) =>{
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
exports.deleteGroupById = (req, res)=>{
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