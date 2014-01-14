'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//any scheme for not predefined data scheme collection (ex: twitter)

var AnyScheme = new Schema({ any: {} });

mongoose.model('AnyTwitter', AnyScheme, 'twitter');