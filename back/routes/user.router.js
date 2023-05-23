const express   = require('express');
const router    = express.Router();
const { guard } = require('../middleware/auth/auth');
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
router.get('/logout', guard, logout);
router.delete('/delete', guard, deleteUser);
router.put('/password', guard, changePasswordSanitization, changePassword);

module.exports = router;