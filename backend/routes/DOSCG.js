const router = require('express').Router();
var DOSCG = require('../controllers/DOSCG');

// router.post('/', DOSCG.updateBook);
router.post('/getXYZ', DOSCG.getXYZ);
router.post('/getBC', DOSCG.getBC);
router.get('/getPlace', DOSCG.getPlace);
router.get('/getRoute', DOSCG.getRoute);

module.exports = router;