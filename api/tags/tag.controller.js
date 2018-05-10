
var Tag = require('./tag.model.js');
var config = require('../../config');

exports.newTag = function(req, res) {

    if( (req.body.tag == '' || req.body.tag == null) ) {
        res.status(405).send('Missing Parameter');
    } else {

        var subQuery = {};
        if(req.user.type == "admin") {
            subQuery = {"creator.type": 'admin', tag: req.body.tag};
        } else {
            subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], tag: req.body.tag};
        }

        Tag.find(subQuery, function(err, tags) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (tags.length > 0){
                res.status(403).send('Tag Duplication');
                return;
            }

            var newTag = new Tag({
                tag: req.body.tag,
                creator: {
                    login: req.user.login,
                    type: req.user.type
                }
            });
            newTag.save(function(err, data) {
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

exports.updateTag = function(req, res) {
    if( (req.body.tag == '' || req.body.tag == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        Tag.find({_id: req.params._id}, function(err, tags) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (tags.length == 0){
                res.status(404).send('Invalid id')
                return;
            }

            var subQuery = {};
            if(req.user.type == "admin") {
                subQuery = {"creator.type": 'admin', tag: req.body.tag, _id: {$ne: req.params._id}};
            } else {
                subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], tag: req.body.tag, _id: {$ne: req.params._id}};
            }

            Tag.find(subQuery, function(err, subtags) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (subtags.length > 0){
                    res.status(403).send('Tag Duplication');
                    return;
                }
                tags[0].update({$set: {
                    tag: req.body.tag
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

exports.getTags = function(req, res) {

    if(req.user.type == "admin") {
        Tag.find({"creator.type": 'admin'}, function(err, tags) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json(tags);
        });
    } else {
        Tag.find({$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}]}, function(err, tags) {
            if (err){
                res.status(402).send(err);
                return;
            }
            for(var i = 0; i < tags.length; i++) {
                //tags[i].creator = undefined;
                tags[i].__v = undefined;
            }
            res.json(tags);
        });
    }
}

exports.deleteTag = function(req, res) {
    Tag.find({_id: req.params._id}, function(err, tags) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (tags.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        tags[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
