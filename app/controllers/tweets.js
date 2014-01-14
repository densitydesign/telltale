'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Twitter = mongoose.model('AnyTwitter'),
    _ = require('lodash');

/**
 * List of Tweets
 */
exports.all = function(req, res) {
    Twitter.find({created_at: {$gte: new Date(2013,9,19,0,0,0), $lt: new Date(2013,9,20,0,0,0)}}).exec(function(err, tweets) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(tweets);
        }
    });
};