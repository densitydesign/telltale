/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');


exports.render = function(req, res) {
    if (req.user) {
        res.render('index', {
            user: req.user ? JSON.stringify(req.user) : "null"
        });
    } else {
        res.redirect('/signin');
    }
};
