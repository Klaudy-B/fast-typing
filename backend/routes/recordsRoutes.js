const router = require('express').Router();
const { getRecord, setRecord } = require('../controllers/recordsControllers');
const { verifyUser } = require('../middlewares');

router.use(verifyUser);

router.get('/:level/personal-record', getRecord);

router.post('/:level/set-record', setRecord);

module.exports = router;