var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var file = "test.db";
var exists = fs.existsSync(file);
var db = new sqlite3.Database(file);

module.exports = {

    create: function () {
        db.serialize(function () {
            if (!exists) {
                db.run('CREATE TABLE guessText (id INTEGER PRIMARY KEY, title TEXT, text TEXT)');
            }
        });
    },

    insert: function (title, text) {
        db.serialize(function () {
            var stmt = db.prepare('INSERT INTO guessText (title, text) VALUES (?, ?)');
            stmt.run(title, text);
            stmt.finalize();
        });
    },

    update: function (id, title, text) {
        db.serialize(function () {
            var stmt = db.prepare('UPDATE guessText SET title=?, text=? WHERE id=?');
            stmt.run(title, text, id);
            stmt.finalize();
        })
    },

    selectAll: function (whenReady) {
        db.serialize(function () {
            db.all('SELECT * FROM guessText', whenReady);
        });
    }
};