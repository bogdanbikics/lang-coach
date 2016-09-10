var express = require('express');
var router = express.Router();
var database = require('./database.js')

database.create();
database.insert('Test', '#This is a test!')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin/admin');
});

router.post('/actions/insert', function (req, res, next) {
    database.insert(req.body.title, req.body.guessText);
    res.send("Insert happened: " + req.body.title + " " + req.body.guessText);
});

router.post('/actions/update', function (req, res, next) {
    database.update(req.body.id, req.body.title, req.body.guessText);
    res.send("Update happened: " + req.body.title + " " + req.body.guessText + " " + req.body.id);
});

router.get('/actions/read', function (req, res, next) {
    database.selectAll(function (err, rows) {
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
