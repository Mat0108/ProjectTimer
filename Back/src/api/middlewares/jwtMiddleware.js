const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.authenticate = (req, res, next) => {
    let token = req.headers['authorization'];

    if(token !== undefined){
        jwt.verify(token, jwtKey, (error, user) => {
            if(error){
                res.status(403);
                res.json({message: "Accès interdit : token invalide"})
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(403);
        res.json({message: "Accès interdit : token manquant"});
    }
}