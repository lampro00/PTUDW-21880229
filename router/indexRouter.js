var express = require("express");
var router = express.Router();
var controller = require("../controller/indexController");
// router.get("/createTable", (req, res) => {
//   a.sequelize.sync().then(() => {
//     res.send("table create");
//   });
// });
router.get("/", controller.showHomePage);
router.get("/:page", controller.showPage);
module.exports = router;
