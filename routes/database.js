var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

module.exports = {

    create: function () {
        db.serialize(function () {
            db.run('CREATE TABLE guessText (text TEXT)');
        });
    },

    insert: function (value) {
        db.serialize(function () {
            var stmt = db.prepare('INSERT INTO guessText VALUES (?)');
            stmt.run(value);
            stmt.finalize();
        });
    },

    selectAll: function (whenReady) {
        db.serialize(function () {
            db.all('SELECT rowid, text FROM guessText', whenReady);
        });
    }
};