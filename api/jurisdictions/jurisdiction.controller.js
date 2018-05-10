
var Jurisdiction = require('./jurisdiction.model.js');
var config = require('../../config');

exports.newJurisdiction = function(req, res) {

    if( (req.body.jurisdiction == '' || req.body.jurisdiction == null) ) {
        res.status(405).send('Missing Parameter');
    } else {

        var subQuery = {};
        if(req.user.type == "admin") {
            subQuery = {"creator.type": 'admin', jurisdiction: req.body.jurisdiction};
        } else {
            subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], jurisdiction: req.body.jurisdiction};
        }

        Jurisdiction.find(subQuery, function(err, jurisdictions) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (jurisdictions.length > 0){
                res.status(403).send('Jurisdiction Duplication');
                return;
            }

            var newJurisdiction = new Jurisdiction({
                jurisdiction: req.body.jurisdiction,
                creator: {
                    login: req.user.login,
                    type: req.user.type
                }
            });
            newJurisdiction.save(function(err, data) {
                if (err) {
                    res.status(402).send(err);
                    return;
                } else {
                    data.creator = undefined;
                    data.__v = undefined;
                    res.json(data);
                }
            });
        });
    }
    
}

exports.updateJurisdiction = function(req, res) {
    if( (req.body.jurisdiction == '' || req.body.jurisdiction == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        Jurisdiction.find({_id: req.params._id}, function(err, jurisdictions) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (jurisdictions.length == 0){
                res.status(404).send('Invalid id')
                return;
            }

            var subQuery = {};
            if(req.user.type == "admin") {
                subQuery = {"creator.type": 'admin', jurisdiction: req.body.jurisdiction, _id: {$ne: req.params._id}};
            } else {
                subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], jurisdiction: req.body.jurisdiction, _id: {$ne: req.params._id}};
            }

            Jurisdiction.find(subQuery, function(err, subjurisdictions) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (subjurisdictions.length > 0){
                    res.status(403).send('Jurisdiction Duplication');
                    return;
                }
                jurisdictions[0].update({$set: {
                    jurisdiction: req.body.jurisdiction
                }}, function(err) {
                    if (err){
                        res.status(402).send(err);
                        return;
                    }
                    res.json('Success');
                });
            });
        });
    }
    
}

exports.getJurisdictions = function(req, res) {

    if(req.user.type == "admin") {
        Jurisdiction.find({"creator.type": 'admin'}, function(err, jurisdictions) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json(jurisdictions);
        });
    } else {
        Jurisdiction.find({$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}]}, function(err, jurisdictions) {
            if (err){
                res.status(402).send(err);
                return;
            }
            for(var i = 0; i < jurisdictions.length; i++) {
                //jurisdictions[i].creator = undefined;
                jurisdictions[i].__v = undefined;
            }
            res.json(jurisdictions);
        });
    }
}

exports.deleteJurisdiction = function(req, res) {
    Jurisdiction.find({_id: req.params._id}, function(err, jurisdictions) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (jurisdictions.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        jurisdictions[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
