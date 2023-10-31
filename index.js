const express = require("express");
const app = express();
const port = process.env.port || 5001;
const expressHandlebars = require("express-handlebars");
var path = require("path");
let a = require("./models");
var router = require("./router/indexRouter");
var proRouter = require("./router/productRoute");
var { createStar } = require("./controller/helper");
//cau hinh public
app.use(express.static(__dirname + "/public"));
//cau hinh hendlebar
app.engine(
  "hbs",
  expressHandlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: path.join(__dirname, "views/partials"),
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    defaultLayout: "layout",
    helpers: { createStar },
  })
);
app.set("view engine", "hbs");
//router
app.use("/", router);
app.use("/product", proRouter);
app.use((req, res) => {
  res.status(404).render("error", { message: "not Found" });
});
app.use((error, req, res) => {
  console.log(error);
  res.status(500).render("error", { message: "internal sever Error" });
});
app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});
