
exports.doStripeCheckout = function(req, res) {
    var stripe = require("stripe")("sk_test_mLd6XlVDBYv7CT6FGJuKQm8S");

    stripe.charges.create({
        amount: Math.round(req.body.amount * 100),
        currency: "usd",
        source: req.body.id, // obtained with Stripe.js
        description: "Charge for job posting"
    }, function(err, charge) {
        if(err) {
            res.json(err);
        } else {
            res.json(charge);
        }
    });
}
