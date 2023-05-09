const express = require('express');
const router  = express.Router();
const debug   = require('debug')('back:get');

router.get('/', (req, res, next) => {
    debug('ici')
    res.locals.title = 'mygame_v1';
    res.render('index');
});

module.exports = router;