
var Tenant = require('./tenant.model.js');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('../../config');


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.newTenant = function(req, res) {

    if( (req.body.name == '' || req.body.name == null) || (req.body.login == '' || req.body.login == null) || (req.body.password == '' || req.body.password == null) ) {
        res.status(401).send('Missing Parameter');
    } else {
        checkTenantDuplication(req, function(result) {
            if (result.status == 'error') {
                res.status(402).send("DB Error");
                return;
            } else if(result.status == 'ok') {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        var newTenant = new Tenant({
                            name: req.body.name,
                            login: req.body.login,
                            passwordHash: hash,
                            my_access_key: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
                        });
                        newTenant.save(function(err, data) {
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
                res.status(403).send('Tenant already exist');
                return;
            }
        });
    }
    
}

exports.updateTenant = function(req, res) {
    if( (req.body.name == '' || req.body.name == null) ) {
        res.status(401).send('Missing Parameter');
    } else {
        Tenant.find({login: req.params.login}, function(err, tenants) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (tenants.length == 0){
                res.status(404).send('Invalid login')
                return;
            }
            tenants[0].update({$set: {name: req.body.name}}, function(err) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                res.json('Success');
            });
        });
    }
    
}

exports.getTenants = function(req, res) {
    Tenant.find(function(err, tenants) {
        if (err) return;
        var resultList = [];
        for(var i = 0; i < tenants.length; i++) {
            resultList.push({
                name: tenants[i].name,
                login: tenants[i].login
            })
        }
        res.json(resultList);
    });
}

exports.getAccessKey = function(req, res) {
    Tenant.find({"login": req.user.login}, function(err, tenants) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (tenants.length == 0){
            res.status(404).send('Invalid login')
            return;
        }
        res.json({access_key: tenants[0].my_access_key});
    });
}

exports.deleteTenant = function(req, res) {
    Tenant.find({login: req.params.login}, function(err, tenants) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (tenants.length == 0){
            res.status(404).send('Invalid login')
            return;
        }
        tenants[0].remove(function(err) {
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
        res.status(401).send('Missing Parameter');
        return;
    } else {
        Tenant.find({login: req.params.login}, function(err, tenants) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (tenants.length == 0){
                res.status(403).send('Wrong Login');
                return;
            }

            bcrypt.compare(req.body.oldPassword, tenants[0].passwordHash, function(err, isPasswordMatch) {
                if(isPasswordMatch == false) {
                    res.status(404).send('Old password is wrong');
                    return;
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                            tenants[0].passwordHash = hash;
                            tenants[0].save(function(err, data) {
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
        res.status(401).send('Missing Parameter');
    }
    Tenant.find({login: req.body.login}, function(err, tenants) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (tenants.length == 0){
            res.status(404).send('Invalid Credential')
            return;
        }

        bcrypt.compare(req.body.password, tenants[0].passwordHash, function(err, isPasswordMatch) {
            if(isPasswordMatch == false) {
                res.status(404).send('Invalid Credential')
                return;
            } else {
                var token = jwt.sign({login: tenants[0].login, type: 'tenant'}, config.secret, { 'expiresIn': '5h' });
                res.json({
                    token: token
                })
            }
        });
        
    });
}

function checkTenantDuplication(req, callback){
    Tenant.findOne({login: req.body.login}, function(err, tenant) {
        if (err){
            callback({status: 'error'})
            return;
        }
        if (tenant){
            callback(tenant)
            return;
        }        
        callback({status: 'ok'})
    });
}