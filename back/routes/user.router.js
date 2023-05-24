const express = require('express');
const router  = express.Router();
const {
    signinSanitization,
    signupSanitization,
    changePasswordSanitization
} = require('../middleware/sanitization/user.sanitization');
const {
        signin,
        signup,
        logout,
        deleteUser,
        changePassword
} = require('../controllers/user.controller');

router.post('/signup', signupSanitization, signup);
router.post('/signin', signinSanitization, signin);
router.get('/logout', logout);
router.delete('/delete', deleteUser);
router.put('/password', changePasswordSanitization, changePassword);

module.exports = router;