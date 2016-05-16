var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');

var LocalBooksSchema = new Schema({
    title:          { type: String },
    author:         { type: String },
    filename:       { type: String },
    views:          { type: Number, 'default': 0 },
    likes:          { type: Number, 'default': 0 },
    timestamp:      { type: Date, 'default': Date.now }
});

LocalBooks.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '');
    });

module.exports = mongoose.model('Image', LocalBooksSchema);
