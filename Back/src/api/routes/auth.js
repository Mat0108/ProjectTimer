// const router = require("express").Router();
// const userModel = require("../models/userModel");
// const express = require('express);
// const bcrypt = require("crypto-js");


 //REGISTER
// router.post('/register',async (req,res) => {
//     try{
//         const {firstname,lastname,email,password} = req.body;
//         const admin = "user";

//         const saltRounds = 10;
//         const hash = bcrypt.hashSync(password, saltRounds);
//         if (
//             email === "" || typeof email === 'undefined' ||
//             password === "" || typeof password === 'undefined' ||
//             firstname === "" || typeof firstname === 'undefined' ||
//             lastname === "" || typeof lastname === 'undefined' 
//             )
//         {
//             let error = 'Les champs obligatoires n\'ont pas été renseignées !';
//             console.log(error);
//             return res.status(500).json(error);
//         }
//         const user = await userModel.create({
//             firstname,
//             lastname,
//             email,
//             password: hash,
//             role: "user"

//         })
//         console.log(user);
//         return res.status(200).json("ok");
//     }catch(error){
//         console.log(error);
//         return res.status(500).json(error);
//     }
// });


// //LOGIN
// router.post('/login',async (req,res) => {
//     try{
//         const {email,password} = req.body;
//         if (typeof email === 'undefined' || typeof password === 'undefined'){
//             let error = 'Les champs obligatoires n\'nont pas été renseignées';
//             console.log(error);
//             return res.status(500).json(error);
//         }
//         const user = await userModel.findOne({ where: { email: email } });
        
//         if (bcrypt.compareSync(password, user.password)){

//             user.password = ""
//             return res.status(200).json(user);
//         }
//         else{
//             return res.status(503).json("erreur d'authification");
//         }
        
//     }catch(error){
//         console.log(error);
//         return res.status(500).json(error);
//     }
// });
// module.exports = router;