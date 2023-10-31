const controller = {};
const models = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
controller.showDetail = async (req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  let product = await models.Product.findOne({
    // attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: { id },
    include: [
      { model: models.Review, include: [{ model: models.User }] },
      { model: models.Image },
    ],
  });
  console.log(product);
  res.locals.product = product;
  res.render("product-detail");
};
controller.getData = async (req, res, next) => {
  //tag
  const tag = await models.Tag.findAll();
  res.locals.tags = tag;

  //brand
  const brands = await models.Brand.findAll({
    include: {
      model: models.Product,
    },
  });
  res.locals.brands = brands;
  //category

  const catelogys = await models.Category.findAll({
    include: {
      model: models.Product,
    },
  });
  res.locals.catelogy = catelogys;
  next();
};
controller.show = async (req, res) => {
  const tagid = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
  const brand = isNaN(req.query.brandid) ? 0 : parseInt(req.query.brandid);
  const category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  let keyword = req.query.keyword || "";
  let option = {
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: {},
  };
  if (keyword.trim() != "") {
    option.where.name = { [Op.iLike]: `%${keyword}%` };
  }
  if (category > 0) {
    option.where.categoryId = category;
  }
  if (brand > 0) {
    option.where.brandId = brand;
  }
  if (tagid > 0) {
    option.include = [
      {
        model: models.Tag,
        where: { id: "tagid" },
      },
    ];
  }
  const products = await models.Product.findAll(option);

  res.locals.Product = products;
  res.render("product-list", { products });
};

module.exports = controller;
