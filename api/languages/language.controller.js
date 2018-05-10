
var Language = require('./language.model.js');
var config = require('../../config');

exports.newLanguage = function(req, res) {

    if( (req.body.language == '' || req.body.language == null) ) {
        res.status(405).send('Missing Parameter');
    } else {

        var subQuery = {};
        if(req.user.type == "admin") {
            subQuery = {"creator.type": 'admin', language: req.body.language};
        } else {
            subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], language: req.body.language};
        }

        Language.find(subQuery, function(err, languages) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (languages.length > 0){
                res.status(403).send('Language Duplication');
                return;
            }

            var newLanguage = new Language({
                language: req.body.language,
                creator: {
                    login: req.user.login,
                    type: req.user.type
                }
            });
            newLanguage.save(function(err, data) {
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

exports.updateLanguage = function(req, res) {
    if( (req.body.language == '' || req.body.language == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        Language.find({_id: req.params._id}, function(err, languages) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (languages.length == 0){
                res.status(404).send('Invalid id')
                return;
            }

            var subQuery = {};
            if(req.user.type == "admin") {
                subQuery = {"creator.type": 'admin', language: req.body.language, _id: {$ne: req.params._id}};
            } else {
                subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], language: req.body.language, _id: {$ne: req.params._id}};
            }

            Language.find(subQuery, function(err, sublanguages) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (sublanguages.length > 0){
                    res.status(403).send('Language Duplication');
                    return;
                }
                languages[0].update({$set: {
                    language: req.body.language
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

exports.getLanguages = function(req, res) {

    if(req.user.type == "admin") {
        Language.find({"creator.type": 'admin'}, function(err, languages) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json(languages);
        });
    } else {
        Language.find({$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}]}, function(err, languages) {
            if (err){
                res.status(402).send(err);
                return;
            }
            for(var i = 0; i < languages.length; i++) {
                //languages[i].creator = undefined;
                languages[i].__v = undefined;
            }
            res.json(languages);
        });
    }
}

exports.deleteLanguage = function(req, res) {
    Language.find({_id: req.params._id}, function(err, languages) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (languages.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        languages[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
