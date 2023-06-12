const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).post(updateUser).delete(deleteUser);

router.route('/friend').delete(removeFriend).post(addFriend);



module.exports = router;
