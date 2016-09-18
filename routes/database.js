var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var file = "test.db";
var exists = fs.existsSync(file);
var db = new sqlite3.Database(file);

module.exports = {

    create: () => {
        db.serialize(() => {
            if (!exists) {
                db.run('CREATE TABLE guessText (id INTEGER PRIMARY KEY, title TEXT, text TEXT)');
            }
        });
    },

    insert: (title, text, whenReady) => {
        db.serialize(() => {
            var stmt = db.prepare('INSERT INTO guessText (title, text) VALUES (?, ?)');
            stmt.run([title, text], () => {
                db.get('SELECT last_insert_rowid() as id', whenReady);
            });
            stmt.finalize();
        });
    },

    update: (id, title, text) => {
        db.serialize(() => {
            var stmt = db.prepare('UPDATE guessText SET title=?, text=? WHERE id=?');
            stmt.run(title, text, id);
            stmt.finalize();
        })
    },

    selectAll: (whenReady) => {
        db.serialize(() => {
            db.all('SELECT * FROM guessText', whenReady);
        });
    }
};