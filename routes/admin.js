var express = require('express');
var router = express.Router();
var database = require('./database.js')

database.create();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin/admin');
});

router.post('/actions/insert', (req, res, next) => {
    database.insert(req.body.title, req.body.guessText, (err, row) => {
        res.send(JSON.stringify(row));
    });
});

router.post('/actions/delete', (req, res, next) => {
    database.delete(req.body.id);
    res.send("true");
});

router.post('/actions/update', function (req, res, next) {
    database.update(req.body.id, req.body.title, req.body.text);
    res.send("true");
});

router.get('/actions/read', function (req, res, next) {
    database.selectAll(function (err, rows) {
        res.send(JSON.stringify(rows));
    });
});

module.exports = router;
