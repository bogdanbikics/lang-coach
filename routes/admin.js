var express = require('express');
var router = express.Router();

require('./database', function (db) {
    database.init();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin');
});

router.post('/actions/upload', function (req, res, next) {
    require('./database', function (db) {
        database.write(req.guessText);
        res.send('Oh yeah!: ' + database.read());
    });
});

module.exports = router;
