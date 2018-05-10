
var Article = require('./article.model.js');
var Tenant = require('../tenants/tenant.model.js');
var Tag = require('../tags/tag.model.js');
var Language = require('../languages/language.model.js');
var Category = require('../categories/category.model.js');
var Jurisdiction = require('../jurisdictions/jurisdiction.model.js');
var Reference = require('../references/reference.model.js');
var Subscription = require('../subscriptions/subscription.model.js');
var config = require('../../config');
var async = require('async');
var _ = require('underscore-node');

exports.newArticle = function(req, res) {

    if( (req.body.title == '' || req.body.title == null) || (req.body.description == '' || req.body.description == null) || (req.body.type == '' || req.body.type == null) || (req.body.start_date == '' || req.body.start_date == null) || (req.body.expiry_date == '' || req.body.expiry_date == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        if(req.body.start_date >= req.body.expiry_date) {
            return res.status(403).send('Missing Parameter');
        } else {
            if(req.user.type == "admin") {
                var newArticle = new Article({
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image || '',
                    type: req.body.type,
                    start_date: req.body.start_date,
                    expiry_date: req.body.expiry_date,
                    private_to_tenant: false,  
                    access_key: "",
                    tags: req.body.tags,
                    categories: req.body.categories,
                    jurisdictions: req.body.jurisdictions,
                    language: req.body.language,
                    creator: {
                        login: req.user.login,
                        type: req.user.type
                    }
                });
                newArticle.save(function(err, data) {
                    if (err) {
                        res.status(402).send(err);
                        return;
                    } else {
                        res.json(data);
                    }
                });
            } else {
                Tenant.find({login: req.user.login}, function(err, tenants) {
                    if (err) {
                        res.status(402).send(err);
                        return;
                    } else {
                        var newArticle = new Article({
                            title: req.body.title,
                            description: req.body.description,
                            image: req.body.image || '',
                            type: req.body.type,
                            start_date: req.body.start_date,
                            expiry_date: req.body.expiry_date,
                            private_to_tenant: false,  
                            access_key: tenants[0].my_access_key,
                            tags: req.body.tags,
                            categories: req.body.categories,
                            jurisdictions: req.body.jurisdictions,
                            language: req.body.language,
                            creator: {
                                login: req.user.login,
                                type: req.user.type
                            }
                        });
                        newArticle.save(function(err, data) {
                            if (err) {
                                res.status(402).send(err);
                                return;
                            } else {
                                data.creator = undefined;
                                data.private_to_tenant = undefined;
                                data.access_key = undefined;
                                data.__v = undefined;
                                res.json(data);
                            }
                        });
                    }
                });
                
            }
        }
        
    }
    
}

exports.updateArticle = function(req, res) {
    if( (req.body.title == '' || req.body.title == null) || (req.body.description == '' || req.body.description == null) || (req.body.type == '' || req.body.type == null) || (req.body.start_date == '' || req.body.start_date == null) || (req.body.expiry_date == '' || req.body.expiry_date == null) ) {
        res.status(405).send('Missing Parameter');
    } else {
        if(req.body.start_date >= req.body.expiry_date) {
            return res.status(403).send('Invalid Parameter');
        } else {
            Article.find({_id: req.params._id}, function(err, articles) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (articles.length == 0){
                    res.status(404).send('Invalid id')
                    return;
                }
                articles[0].update({$set: {
                    title: req.body.title,
                    description: req.body.description,
                    image: req.body.image || '',
                    type: req.body.type,
                    start_date: req.body.start_date,
                    expiry_date: req.body.expiry_date,
                    tags: req.body.tags,
                    categories: req.body.categories,
                    jurisdictions: req.body.jurisdictions,
                    language: req.body.language
                }}, function(err) {
                    if (err){
                        res.status(402).send(err);
                        return;
                    }
                    res.json('Success');
                });
            });
        }
    }
    
}

exports.getArticles = function(req, res) {
    if(req.user.type == "admin") {
        Article.find({"creator.type": 'admin'}, function(err, articles) {
            if (err) return;
            res.json(articles);
        });
    } else {
        Article.find({$or: [{"creator.type": 'admin'}, {"creator.type": "tenant", "creator.login": req.user.login}]}, function(err, articles) {
            if (err) return;
            for(var i = 0; i < articles.length; i++) {
                //articles[i].creator = undefined;
                articles[i].private_to_tenant = undefined;
                articles[i].access_key = undefined;
                articles[i].__v = undefined;
            }
            res.json(articles);
        });
    }
    
}

exports.getArticleById = function(req, res) {
    Article.find({_id: req.params._id}, function(err, articles) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (articles.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        if (articles[0].access_key != req.params.access_key) {

            Tenant.find({my_access_key: req.params.access_key}, function(err, tenants) {

                if (err){
                    res.status(402).send(err);
                    return;
                }

                if(tenants.length == 0) {
                    res.status(403).send('Invalid access key')
                    return;
                }

                Subscription.find({login: tenants[0].login, articleId: req.params._id}, function(err, subscriptions) {
                    if (err){
                        res.status(402).send(err);
                        return;
                    }

                    if(subscriptions.length == 0) {
                        res.status(403).send('Invalid access key')
                        return;
                    }

                    articles[0].creator = undefined;
                    articles[0].private_to_tenant = undefined;
                    articles[0].access_key = undefined;
                    articles[0].start_date = undefined;
                    articles[0].image = undefined;
                    articles[0].expiry_date = undefined;
                    articles[0]._id = undefined;
                    articles[0].tags = undefined;
                    articles[0].categories = undefined;
                    articles[0].language = undefined;
                    articles[0].jurisdictions = undefined;
                    articles[0].__v = undefined;

                    res.json(articles[0]);
                });
            });
            
        } else {
            articles[0].creator = undefined;
            articles[0].private_to_tenant = undefined;
            articles[0].access_key = undefined;
            articles[0].start_date = undefined;
            articles[0].image = undefined;
            articles[0].expiry_date = undefined;
            articles[0]._id = undefined;
            articles[0].tags = undefined;
            articles[0].categories = undefined;
            articles[0].language = undefined;
            articles[0].jurisdictions = undefined;
            articles[0].__v = undefined;

            res.json(articles[0]);
        }
    });
}

exports.deleteArticle = function(req, res) {
    Article.find({_id: req.params._id}, function(err, articles) {
        if (err){
            res.status(402).send(err);
            return;
        }
        if (articles.length == 0){
            res.status(404).send('Invalid id')
            return;
        }
        articles[0].remove(function(err) {
            if (err){
                res.status(402).send(err);
                return;
            }
            res.json('Success');
        });
    });
}

exports.getArticlesByFilter = function(req, res) {

    var articleIdList = [];
    var adminArticleIdList = [];

    var query = {};
    if(req.query.status != '' && req.query.status != null) {
        query.status = req.query.status;
    }

    if(req.query.reference != '' && req.query.reference != null) {
        query.reference = req.query.reference;
    }

    Tenant.find({my_access_key: req.params.access_key}, function(err, tenants) {
        if (err) {
            res.status(402).send(err);
            return;
        }

        var login = "";
        if(tenants.length > 0)
            login = tenants[0].login;

        Subscription.find({login: login}, function(err, subscriptions) {
            if (err) {
                res.status(402).send(err);
                return;
            }

            adminArticleIdList = _.pluck(subscriptions, 'articleId');

            

            Article.find({$or: [{access_key: req.params.access_key}, {_id: {$in: adminArticleIdList}}], start_date: {$lt: new Date()}, expiry_date: {$gt: new Date()}}, function(err, articles) {
                if (err){
                    res.status(402).send(err);
                    return;
                }

                var subQuery = {};
                var tagIdList = [];
                var categoryIdList = [];
                var jurisdictionIdList = [];
                var languageIdList = [];

                if(req.query.tags != '' && req.query.tags != null) {
                    var tags = req.query.tags.split(",");
                    for(var i = 0; i < tags.length; i++) {
                        tags[i] = tags[i].trim();
                    }
                    subQuery = {tag: { $in: tags }};
                } else
                    subQuery = {tag: ''};

                Tag.find(subQuery, function(err, tagList) {
                    if (err) {
                        res.status(402).send(err);
                        return;
                    }

                    for(var i = 0; i < tagList.length; i++)
                        tagIdList.push((tagList[i]._id).toString());


                    if(req.query.categories != '' && req.query.categories != null) {
                        var categories = req.query.categories.split(",");
                        for(var i = 0; i < categories.length; i++) {
                            categories[i] = categories[i].trim();
                        }
                        subQuery = {category: { $in: categories }};
                    } else
                        subQuery = {category: {$ne: ''}};

                    Category.find(subQuery, function(err, categoryList) {
                        if (err) {
                            res.status(402).send(err);
                            return;
                        }

                        for(var i = 0; i < categoryList.length; i++)
                            categoryIdList.push((categoryList[i]._id).toString());


                        if(req.query.jurisdictions != '' && req.query.jurisdictions != null) {
                            var jurisdictions = req.query.jurisdictions.split(",");
                            for(var i = 0; i < jurisdictions.length; i++) {
                                jurisdictions[i] = jurisdictions[i].trim();
                            }
                            subQuery = {jurisdiction: { $in: jurisdictions }};
                        } else
                            subQuery = {jurisdiction: {$ne: ''}};

                        Jurisdiction.find(subQuery, function(err, jurisdictionList) {
                            if (err) {
                                res.status(402).send(err);
                                return;
                            }

                            for(var i = 0; i < jurisdictionList.length; i++)
                                jurisdictionIdList.push((jurisdictionList[i]._id).toString());


                            if(req.query.languages != '' && req.query.languages != null) {
                                var languages = req.query.languages.split(",");
                                for(var i = 0; i < languages.length; i++) {
                                    languages[i] = languages[i].trim();
                                }
                                subQuery = {language: { $in: languages }};
                            } else
                                subQuery = {language: {$ne: ''}};

                            Language.find(subQuery, function(err, languageList) {
                                if (err) {
                                    res.status(402).send(err);
                                    return;
                                }

                                for(var i = 0; i < languageList.length; i++)
                                    languageIdList.push((languageList[i]._id).toString());

                                for(var k = 0; k < articles.length; k++) {
                                    var intersectionList1 = _.intersection(tagIdList, articles[k].tags);
                                    var intersectionList2 = _.intersection(categoryIdList, articles[k].categories);
                                    var intersectionList3 = _.intersection(jurisdictionIdList, articles[k].jurisdictions);
                                    var intersectionList4 = _.intersection(languageIdList, [articles[k].language]);
                                    if(intersectionList1.length == tagIdList.length && ((tagIdList.length == 0 && (req.query.tags == '' || req.query.tags == null)) || tagIdList.length != 0) && intersectionList2.length > 0 && intersectionList3.length > 0 && intersectionList4.length > 0)
                                        articleIdList.push(articles[k]._id);
                                }

                                if(!query.status && !query.reference) {
                                    //res.json(_.union(adminArticleIdList, articleIdList));
                                    res.json(articleIdList);
                                } else {
                                    Reference.find(query, function(err, references) {
                                        if (err) {
                                            res.status(402).send(err);
                                            return;
                                        }

                                        var referenceArticleIdList = _.pluck(references, "articleId");
                                        res.json(_union(adminArticleIdList, _.intersection(articleIdList, referenceArticleIdList)));

                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    });  

}
