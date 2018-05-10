
var Reference = require('./reference.model.js');
var Article = require('../articles/article.model.js');
var config = require('../../config');

exports.updateReference = function(req, res) {
    if( (req.body.status == '' || req.body.status == null) || (req.body.reference == '' || req.body.reference == null) || (req.body.articleId == '' || req.body.articleId == null) ) {
        res.status(405).send('Missing Parameter');
    } else {

        Article.find({_id: req.body.articleId, access_key: req.params.access_key}, function(err, articles) {
            if (err){
                res.status(402).send(err);
                return;
            }
            if (articles.length == 0){
                res.status(403).send('Invalid parameter')
                return;
            }

            Reference.find({articleId: req.body.articleId, reference: req.body.reference}, function(err, references) {
                if (err){
                    res.status(402).send(err);
                    return;
                }
                if (references.length == 0){
                    var newReference = new Reference({
                        reference: req.body.reference,
                        status: req.body.status,
                        articleId: req.body.articleId
                    });

                    newReference.save(function(err, data) {
                        if (err) {
                            res.status(402).send(err);
                            return;
                        } else {
                            res.json('Success');
                        }
                    });
                } else {
                    references[0].update({$set: {
                        status: req.body.status
                    }}, function(err) {
                        if (err){
                            res.status(402).send(err);
                            return;
                        }
                        res.json('Success');
                    });
                }

            });

        });
    }    
}
