//stats helper module gathers some totals for the application
'use strict';

var models = require('../models'),
    async = require('async');

module.exports = function(callback) {

    async.parallel([
        function(next) {
            models.Image.count({}, function(err,total) {
            	next(err,total);
        }),
        function(next) {
            models.Comment.count({}, function(err,total) {
            	next(err,total);
        }),
//get the total views and likes for every image, need to use MongoDB's aggregate function (sum)
//telling MongoDB to group every document together and sum up all of their views into a new field called viewsTotal
        function(next) {
            models.Image.aggregate({ $group : {
                _id : '1',
                viewsTotal : { $sum : '$views' }
            }}, function(err, result) {
                var viewsTotal = 0;
                if (result.length > 0) {
                    viewsTotal += result[0].viewsTotal;
                }
                next(null, viewsTotal);
            });
        },
//same as above but for the sum of likes.
        function(next) {
            models.Image.aggregate({ $group : {
                _id : '1',
                likesTotal : { $sum : '$likes' }
            }}, function (err, result) {
                var likesTotal = 0;
                if (result.length > 0) {
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], function(err, results){
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    });
};