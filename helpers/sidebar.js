//using async parallel, performing a unique set of functions all at the same time
var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require('async');

module.exports = function(viewModel, callback){
    async.parallel([
        function(next) {
            Stats(next);
        },
        function(next) {
            Images.popular(next);
        },
        function(next) {
// passing in the next callback function as a parameter, 
//want the execution to not happen until comments.newest has completed its work.
            Comments.newest(next);
        }
    ], function(err, results){
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(viewModel);
    });
};