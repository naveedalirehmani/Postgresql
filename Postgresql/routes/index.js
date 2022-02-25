const { Router } = require('express');
const router = Router();

// api routes
const habitatsRouter = require('./habitats_api.js');
const monstersRouter = require("./monsters_api.js");
const livesRouter = require('./lives.js');
const PersonRouter = require('./person_api.js');

// api routes for monsters and habitats
router.use("/monsters", monstersRouter);
router.use('/habitats',habitatsRouter);
router.use('/lives',livesRouter);
router.use('/person',PersonRouter)

module.exports = router