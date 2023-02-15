const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/user.js');

// Create and Save a new Users
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Users content can not be empty"
        });
    }
    User.where('userName').exists(true)
    // Create a Note
    const user = new User({
        userName : req.body.userName,
        accountNumber : req.body.accountNumber,
        emailAddress : req.body.emailAddress,
        identityNumber : req.body.identityNumber
    });

    // Save Note in the database
    user.save()
    .then(data => {
        var token = jwt.sign(user.toJSON(), config.secret,{ expiresIn: '30m' });
        res.send({success: true, token: 'JWT ' + token , data});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single Users with a usersId
exports.findOneById = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

//Find a single users with a accountNumber
exports.findOneByAccountNumber = (req, res) => {
    console.log(req.params.accountNumber)
    User.findOne({accountNumber : req.params.accountNumber})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with account number " + req.params.accountNumber
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with account number " + req.params.accountNumber
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with account number " + req.params.accountNumber
        });
    });
};

//Find a single users with a accountNumber
exports.findOneByIdentityNumber = (req, res) => {
    User.findOne({identityNumber : req.params.identityNumber})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with identity number " + req.params.identityNumber
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with identity number " + req.params.identityNumber
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with identity number " + req.params.identityNumber
        });
    });
};

// Update a Users identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Nothing to update"
        });
    }
    console.log(User.userName)
    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        userName : req.body.userName,
        accountNumber : req.body.accountNumber,
        emailAddress : req.body.emailAddress,
        identityNumber : req.body.identityNumber,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a Users with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
