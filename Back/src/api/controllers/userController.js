const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Inscription d'utilisateur
exports.userRegister = (req, res, error) => {
    let newUser = new User(req.body);
    
// Modification inscription user : si le mdp ou le mail ou le firstname et le lastname ne sont pas remplie alors pas d'inscription possible
    if (newUser.password && newUser.email && newUser.firstname && newUser.lastname) {
        bcrypt.hash(newUser.password, 10, (error, hash) => {
            if (error) {
                res.status(401);
                console.log(error);
                res.json({ message: "Impossible de crypter le mot de passe" });
            }
            else {
                newUser.password = hash;

                newUser.save((error, user) => {
                    if (error) {
                        res.status(401);
                        console.log(error);
                        res.json({ message: "Rêquete invalide" });
                    }
                    else {
                        res.status(200);
                        res.json({ message: `Utilisateur crée : ${user.email}` });
                    }
                });
            }
        })
    }
    else {
        res.status(401);
        res.json({ message: "Mot de passe est vide" });
        console.log(error);
    }
}


// Connexion d'utilisateur
exports.userLogin = (req, res, error) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            if (user.email == req.body.email) {
                bcrypt.compare(req.body.password, user.password, (error, result) => {
                    if (error) {
                        res.status(401);
                        console.log(error);
                        res.json({ message: "Mot de passe incorrect" })
                    }
                    else {
                        if (!user.connected) {
                            user.connected = 1;

                            user.save((error, user) => {
                                if (error) {
                                    res.status(401);
                                    console.log(error);
                                    res.json({ message: "Rêquete invalide" });
                                }
                                else {
                                    let userData = {
                                        id: user._id.toString(),
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        email: user.email,
                                        admin: user.admin,
                                        connected: 1,
                                        groups: user.groups,
                                        projects: user.projects
                                    }

                                    jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                                        if (error) {
                                            res.status(500);
                                            console.log(error);
                                            res.json({ message: "Impossible de générer le token" })
                                        }
                                        else {
                                            res.status(200);
                                            res.json({ message: `Utilisateur connecté : ${user.email}`, token, user: userData });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.status(401);
                            console.log(error);
                            res.json({ message: "Utilisateur est déjà connecté" });
                        }
                    }
                })
            }
            else {
                res.status(401);
                res.json({ message: "Email ou mot de passe incorrect" });
                console.log(error);
            }
        }
    })
}

// Déconnexion d'utilisateur
exports.userLogout = (req, res, error) => {
    if (req.params.userId) {
        User.findById(req.params.userId, (error, user) => {
            if (error) {
                res.status(401);
                console.log(error);
                res.json({ message: "Utilisateur connecté non trouvé" });
            }
            else {
                if (user.connected) {
                    user.connected = 0;

                    user.save((error, user) => {
                        if (error) {
                            res.status(401);
                            console.log(error);
                            res.json({ message: "Rêquete invalide" });
                        }
                        else {
                            res.status(200);
                            res.json({ message: `Utilisateur déconnecté : ${user.email}` });
                        }
                    });
                }
                else {
                    res.status(401);
                    console.log(error);
                    res.json({ message: 'Utilisateur connecté non trouvé' });
                }
            }
        })
    }
    else {
        res.status(401);
        console.log(error);
        res.json({ message: 'Utilisateur connecté non trouvé' });
    }
}


// Afficher tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.find({}).populate("groups").populate("projects").exec(function (error, users) {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur" });
        }
        else {
            res.status(200);
            res.json(users);
        }
    });
}


// Afficher un utilisateur par id
exports.getUserById = (req, res) => {
    User.findById(req.params.userId).populate("groups").populate("projects").exec(function (error, user) {
        if (error) {
            res.status(401);
            res.json({ message: "Utilisateur connecté non trouvé" });
            console.log(error);
        }
        else {
            res.status(200);
            res.json(user);
        }
    });
}

// Modifier tous les informations d'un utilisateur
exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ message: "Utilisateur est bien mis à jour", result }))
        .catch((error) => res.status(404).json({ message: "Utilisateur non trouvé" }))

};

// Supprimer l'utilisateur
exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.userId })
        .then(result => res.status(200).json({ message: "Utilisateur est bien supprimé", result }))
        .catch((error) => res.status(404).json({ message: "Utilisateur non trouvé" }))
};

// Modifier quelques informations de l'utilisateur
exports.patchUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true })
        .then(result => res.status(200).json({ message: "Utilisateur est bien mis à jour", result }))
        .catch((error) => res.status(404).json({ message: "Utilisateur non trouvé" }))

};