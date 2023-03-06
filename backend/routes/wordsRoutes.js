const router = require('express').Router();
const { verifyUser } = require('../middlewares');
const getWords = require('../controllers/wordsControllers');

router.use(verifyUser);

router.get('/:level/', getWords);

module.exports = router;