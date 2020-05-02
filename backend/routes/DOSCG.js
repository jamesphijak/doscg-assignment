const router = require('express').Router();
var DOSCG = require('../controllers/DOSCG');

// router.post('/', DOSCG.updateBook);
router.post('/getXYZ', DOSCG.getXYZ);
router.post('/getBC', DOSCG.getBC);
router.post('/getPlace', DOSCG.getPlace);
router.post('/getRoute', DOSCG.getRoute);
router.post('/getStaticMap', DOSCG.getStaticMap);
router.post('/webhook', DOSCG.getWebhook)

module.exports = router;