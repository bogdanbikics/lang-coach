var express = require('express');
var router = express.Router();
var database = require('./database.js')

database.create();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin/admin');
});

router.post('/actions/insert', function (req, res, next) {
    database.insert(req.body.guessText);
    res.send("Insert happened: " + req.body.guessText);
});

router.get('/actions/read', function (req, res, next) {
    database.selectAll(function (err, rows) {
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
