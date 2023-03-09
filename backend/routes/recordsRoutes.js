const router = require('express').Router();
const { verifyUser } = require('../middlewares');
const { getRecord, setRecord, myRecordsController } = require('../controllers/recordsControllers');

router.use(verifyUser);

router.get('/:level/personal-record', getRecord);
router.get('/my-records', myRecordsController);

router.post('/:level/set-record', setRecord);

module.exports = router;