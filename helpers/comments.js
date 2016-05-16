"use strict"

var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function(callback) {
//limit the number of records returned to five and sort by the timestamp in descending order
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } },
            function(err, comments){
                console.log("COCOCO")
                        console.log(comments)
//query mongodb and retrieve and attach the image model to a comment model
                var attachImage = function(comment, next) {
                    models.Image.findOne({ _id : comment.image_id},
                        function(err, image) {
                            if (err) throw err;

                            comment.image = image;
                            next(err);
                        });
                };
//loop through every item in the collection and send each item as a callback function in the second parameter.
// the final callback function executed when the entire series is finished with the collection
                async.each(comments, attachImage,
                    function(err) {
                        if (err) throw err;
                        callback(err, comments);
                    });
            });
    }
};
