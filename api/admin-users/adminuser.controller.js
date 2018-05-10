
var Admin = require('./adminuser.model.js');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.newAdmin = function(req, res) {

    if( (req.body.name == '' || req.body.name == null) || (req.body.login == '' || req.body.login == null) || (req.body.password == '' || req.body.password == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        checkAdminDuplication(req, function(result) {
            if (result.status == 'error') {
                res.status(402).send("DB Error");
                return;
            } else if(result.status == 'ok') {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        var newAdmin = new Admin({
                            name: req.body.name,
                            login: req.body.login,
                            passwordHash: hash
                        });
                        newAdmin.save(function(err, data) {
                            if (err) {
                                res.status(402).send(err);
                                return;
                            } else {
                                res.json('Success');
                            }
                        })
                    });
                });
            } else {
                res.status(403).send('Admin User already exist');
                return;
            }
        });
    }
    
}

exports.updateAdmin = function(req, res) {
    if( (req.body.name == '' || req.body.name == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        Admin.find({login: req.params.login}, function(err, admins) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (admins.length == 0){
                res.status(404).send('Invalid login')
                return;
            }
            admins[0].update({$set: {name: req.body.name}}, function(err) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                res.json('Success');
            });
        });
    }
    
}

exports.getAdmins = function(req, res) {
    Admin.find(function(err, admins) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < admins.length; i++) {
            resultList.push({
                name: admins[i].name,
                login: admins[i].login
            })
        }
        res.json(resultList);
    });
}

exports.deleteAdmin = function(req, res) {
    if(req.params.login == req.user.login && req.user.type == "admin") {
        res.status(403).send('Could not delete super admin');
        return;
    }
    Admin.find({login: req.params.login}, function(err, admins) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (admins.length == 0){
            res.status(404).send('Invalid login')
            return;
        }
        admins[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

exports.changePassword = function(req, res) {

    if( (req.body.newPassword == '' || req.body.newPassword == null) || (req.body.oldPassword == '' || req.body.oldPassword == null) ) {
        res.status(405).send('Missing Parameter');
        return;
    } else {
        Admin.find({login: req.params.login}, function(err, admins) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (admins.length == 0){
                res.status(403).send('Wrong Login');
                return;
            }

            bcrypt.compare(req.body.oldPassword, admins[0].passwordHash, function(err, isPasswordMatch) {
                if(isPasswordMatch == false) {
                    res.status(404).send('Old password is wrong');
                    return;
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                            admins[0].passwordHash = hash;
                            admins[0].save(function(err, data) {
                                if (err) {
                                    res.status(402).send(err);
                                    return;
                                } else {
                                    res.json('Success');
                                }
                            })
                        });
                    });
                }
            });
            
        });
    }
    
}

exports.login = function(req, res) {
    if( (req.body.login == '' || req.body.login == null) || (req.body.password == '' || req.body.password == null) ) {
        res.status(405).send('Missing Parameter');
        return;
    }
    Admin.find({login: req.body.login}, function(err, admins) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (admins.length == 0){
            res.status(404).send('Invalid Credential')
            return;
        }

        bcrypt.compare(req.body.password, admins[0].passwordHash, function(err, isPasswordMatch) {
            if(isPasswordMatch == false) {
                res.status(404).send('Invalid Credential')
                return;
            } else {
                var token = jwt.sign({login: admins[0].login, type: 'admin'}, config.secret, { 'expiresIn': '5h' });
                res.json({
                    token: token
                })
            }
        });
        
    });
}

function checkAdminDuplication(req, callback){
    Admin.findOne({login: req.body.login}, function(err, admin) {
        if (err){
            callback({status: 'error'})
            return;
        }
        if (admin){
            callback(admin)
            return;
        }        
        callback({status: 'ok'})
    });
}