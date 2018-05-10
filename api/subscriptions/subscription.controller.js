
var Subscription = require('./subscription.model.js');
var Article = require('../articles/article.model.js');
var config = require('../../config');

exports.updateSubscription = function(req, res) {
    var subscriptionValue = req.body.subscription;
    if( (subscriptionValue == null) || (req.body.articleId == '' || req.body.articleId == null) ) {
        res.status(405).send('Missing Parameter');
    } else {

        Subscription.find({articleId: req.body.articleId, login: req.user.login}, function(err, subscriptions) {
            if (err){
                res.status(402).send(err);
                return;
            }
            
            if(subscriptionValue == true && subscriptions.length == 0) {
                var newSubscription = new Subscription({
                    articleId: req.body.articleId,
                    login: req.user.login
                });

                newSubscription.save(function(err, data) {
                    if (err) {
                        res.status(402).send(err);
                        return;
                    } else {
                        res.json('Success');
                    }
                });
            }

            if(subscriptionValue == true && subscriptions.length != 0) {
                res.json('Already subscribed');
            }

            if(subscriptionValue == false && subscriptions.length == 0) {
                res.json('Already unsubscribed');
            }

            if(subscriptionValue == false && subscriptions.length != 0) {

                subscriptions[0].remove(function(err) {
                    if (err) {
                        res.status(402).send(err);
                        return;
                    } else {
                        res.json('Success');
                    }
                })
            }

        });
    }    
}

exports.getSubscription = function(req, res) {

    Subscription.find({articleId: req.params.articleId, login: req.user.login}, function(err, subscriptions) {
        if (err){
            res.status(402).send(err);
            return;
        }
        
        res.json({result: (subscriptions.length != 0)});

    });
}
