const router = require('express').Router();
const DOSCG = require('./DOSCG');

// DOSCG route
router.use('/doscg', DOSCG);

module.exports = router;