
var Category = require('./category.model.js');
var config = require('../../config');

exports.newCategory = function(req, res) {

    if( (req.body.category == '' || req.body.category == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        var subQuery = {};
        if(req.user.type == "admin") {
            subQuery = {"creator.type": 'admin', category: req.body.category};
        } else {
            subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], category: req.body.category};
        }
        Category.find({category: req.body.category}, function(err, categories) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (categories.length > 0){
                res.status(403).send('Category Duplication');
                return;
            }

            var newCategory = new Category({
                category: req.body.category,
                creator: {
                    login: req.user.login,
                    type: req.user.type
                }
            });
            newCategory.save(function(err, data) {
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

exports.updateCategory = function(req, res) {
    if( (req.body.category == '' || req.body.category == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        Category.find({_id: req.params._id}, function(err, categories) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (categories.length == 0){
                res.status(404).send('Invalid id')
                return;
            }
            var subQuery = {};
            if(req.user.type == "admin") {
                subQuery = {"creator.type": 'admin', category: req.body.category, _id: {$ne: req.params._id}};
            } else {
                subQuery = {$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}], category: req.body.category, _id: {$ne: req.params._id}};
            }
            Category.find({category: req.body.category, _id: {$ne: req.params._id}}, function(err, subcategories) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (subcategories.length > 0){
                    res.status(403).send('Category Duplication');
                    return;
                }
                categories[0].update({$set: {
                    category: req.body.category
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

exports.getCategories = function(req, res) {

    if(req.user.type == "admin") {
        Category.find({"creator.type": 'admin'}, function(err, categories) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json(categories);
        });
    } else {
        Category.find({$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}]}, function(err, categories) {
            if (err){
                res.status(402).send(err);
                return;
            }
            for(var i = 0; i < categories.length; i++) {
                //categories[i].creator = undefined;
                categories[i].__v = undefined;
            }
            res.json(categories);
        });
    }
}

exports.deleteCategory = function(req, res) {
    Category.find({_id: req.params._id}, function(err, categories) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (categories.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        categories[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}
