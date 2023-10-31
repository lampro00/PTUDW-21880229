const controller = {};
const models = require("../models");

controller.showHomePage = async (req, res) => {
  const resenProduct = await models.Product.findAll({
    order: [["createdAt", "desc"]],
    limit: 10,
  });
  res.locals.ResenProduct = resenProduct;
  const fproducts = await models.Product.findAll({
    order: [["stars", "desc"]],
    limit: 10,
  });
  res.locals.furproducts = fproducts;

  const category = await models.Category.findAll();
  const secondArray = category.splice(2, 2);
  const thirArray = category.splice(1, 1);
  res.locals.CategoryAll = [category, secondArray, thirArray];
  console.log(category);
  const brands = models.Brand;
  const data = await brands.findAll();

  res.render("index", { data });
};

controller.showPage = (req, res, next) => {
  const page = [
    "cart",
    "checkout",
    "contact",
    "login",
    "my-account",
    "product-detail",
    "product-list",
    "wishlist",
  ];
  if (page.includes(req.params.page)) {
    return res.render(req.params.page);
  }
  next();
};
module.exports = controller;
