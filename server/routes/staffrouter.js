const router = require("express").Router();
const { signupStaff, loginStaff, updateStaff, fetchOne, fetchAll, deleteStaff } = require('../controllers/staffcontroller.js');

//Staff SignUp
router.post('/signup', signupStaff);

//Staff Login
router.post('/login', loginStaff);

//Staff Update
router.put('/update/:id', updateStaff);

//Find one Staff member
router.get('/:id', fetchOne);

//Find all staff members
router.get('/', fetchAll);

//Delete staff members
router.delete('/delete/:id', deleteStaff);

module.exports = router;