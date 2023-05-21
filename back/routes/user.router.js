const express = require('express');
const router  = express.Router();
const {
        signin,
        signup,
        logout,
        deleteUser,
        changePassword
} = require('../controllers/user.controller');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.delete('/delete', deleteUser);
router.put('/password', changePassword);

module.exports = router;