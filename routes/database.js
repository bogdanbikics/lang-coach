var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

function init() {
    db.serialize(function() {
        db.run('CREATE TABLE guessText (text TEXT)');
    });
    db.close();
}

function write(newText) {
    db.serialize(function() {
        var stmt = db.prepare('INSERT INTO guessText VALUES (?)');
        stmt.run(newText);
        stmt.finalize(); 
    });
    db.close();
}

function read() {
    db.serialize(function() {
        db.each('SELECT text FROM guessText', function(err, row) {
            console.log('Text: ' + row.text);
        });
    });
    db.close(); 
}