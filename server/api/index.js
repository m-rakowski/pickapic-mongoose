const express = require("express");
const router = express.Router();

require("../routes/standups")(router);
require("../routes/projects")(router);
require("../routes/teamMembers")(router);
require("../routes/images")(router);

module.exports = router;
