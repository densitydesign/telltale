'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Twitter = mongoose.model('AnyTwitter'),
    topojson = require('topojson'),
    _ = require('lodash');

/**
 * List of Tweets
 */
exports.all = function(req, res) {
    var o = {};
    o.map = function () { 
            var _day,
                _night,
                h = this.created_at.getHours();

            if (h >= 22 && h < 6 ){_night = true; _day = false;}
            else{_night = false; _day = true;}

            emit(this.geo,  {count : 1, created_at:this.created_at, day:_day, night: _night }) 
        };
    o.reduce = function (k, vals) { 
        var _day,
            _night;

        vals.forEach(function(d, i){
                var h = d.created_at.getHours();
                if (h >= 22 && h < 6 && _night === undefined){_night = true}
                else if (h >= 6 && h < 22 && _day === undefined) {_day = true}
            });

        if(_day === undefined ){_day = false}
        if(_night === undefined ){_night = false}
        return {count: vals.length, day :_day, night: _night };
        };
    o.query = {created_at: {$gte: new Date(req.body.start), $lt: new Date(req.body.end)}}

    // Twitter.find({created_at: {$gte: new Date(req.body.start), $lt: new Date(req.body.end)}}).exec(function(err, tweets) {
    //     if (err) {
    //         res.render('error', {
    //             status: 500
    //         });
    //     } else {
    //         res.json(tweets);
    //     }
    // });

    Twitter.mapReduce(o, function(err, tweets) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var geojson = {type: "FeatureCollection", features: []}

            tweets.forEach(function(d){
                var feature = {
                    "type": "Feature",
                    "geometry": d._id,
                    "properties": d.value
                };
                geojson.features.push(feature)
            })
            var  propertyTransform = function (properties, key, value) {
                    properties[key] = value;
                    return true;
                };

            var topology = topojson.topology({'collection': geojson}, {'property-transform': propertyTransform});
            res.json(geojson);
        }
    });
};