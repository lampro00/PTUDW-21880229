var express = require("express");
var router = express.Router();
var controller = require("../controller/proControler");

// router.get("/createTable", (req, res) => {
//   a.sequelize.sync().then(() => {
//     res.send("table create");
//   });
// });
router.get("/", controller.getData, controller.show);
router.get("/:id", controller.getData, controller.showDetail);
module.exports = router;
