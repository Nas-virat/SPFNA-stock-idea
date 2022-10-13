const express = require("express");
const router = express.Router();

const convert =require("../utils/convert");

router.get("/convert",convert);

module.exports = router;