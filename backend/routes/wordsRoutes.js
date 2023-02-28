const router = require('express').Router();
const getWords = require('../controllers/wordsControllers');
const { verifyUser } = require('../middlewares');

router.use(verifyUser);

router.get('/:level/', getWords);

module.exports = router;