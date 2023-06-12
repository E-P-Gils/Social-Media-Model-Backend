const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought');

router.route('/').get(getThoughts).post(createThought);

router.route('/thoughtId').get(getThoughtById).post(updateThought).delete(deleteThought);

router.route('/reaction').delete(removeReaction).post(createReaction);



module.exports = router;
