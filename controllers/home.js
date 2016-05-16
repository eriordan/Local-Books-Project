//Exporting an object that has a single function called index.
//The request object is used for requests that are sent to the server.
//The response object is used to send back a response to the client, this could be a HTML page, JSON data ,errors etc.

var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    index: function(req, res) {
        var viewModel = {
            images: []
        };

        ImageModel.find({}, {}, { sort: { timestamp: -1 }}, function(err, images) {
            if (err) { throw err; }

            viewModel.images = images;
            sidebar(viewModel, function(viewModel) {
                res.render('index', viewModel);
            });
        });

    }
};