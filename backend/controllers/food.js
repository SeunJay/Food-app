const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Food = require("../models/Food");
const { errorHandler } = require("../helpers/dbErrorHandler");



exports.foodById = (req, res, next, id) => {
  Food.findById(id).populate("category").exec((err, food) => {
    if (err || !food) {
      return res.status(400).json({
        error: "Food not found"
      });
    }
    req.food = food;
    next();
  });
};

exports.read = (req, res) => {
  req.food.photo = undefined;
  return res.json(req.food);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    const { name, description, price, category, quantity } = fields;

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    let food = new Food(fields);

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo)
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be les than 1mb in size"
        });
      }
      food.photo.data = fs.readFileSync(files.photo.path);
      food.photo.contentType = files.photo.type;
    }

    food.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let food = req.food;
  food.remove((err, deletedFood) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    res.json({ message: "Food deleted successfully" });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    const { name, description, price, category, quantity } = fields;

    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    let food = req.food;

    food = _.extend(food, fields);

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo)
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be les than 1mb in size"
        });
      }
      food.photo.data = fs.readFileSync(files.photo.path);
      food.photo.contentType = files.photo.type;
    }

    food.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

/**
 * sell/arrival
 * by sell = /foods?sortBy=sold&order=desc&limit=4
 * by arrival = /foods?sortBy=sold&createAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Food.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, foods) => {
      if (err) {
        return res.status(400).json({
          error: "Food not found"
        });
      }
      res.json(foods);
    });
};

/**
 * it will find foods based on the req product category
 * other products that has the same category will be returned
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Food.find({ _id: { $ne: req.food }, category: req.food.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, foods) => {
      if (err) {
        return res.status(400).json({
          error: "Food not found"
        });
      }
      res.json(foods);
    });
};

exports.listCategories = (req, res) => {
  Food.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found"
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Food.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Food not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.food.photo.data) {
    res.set("Content-Type", req.food.photo.contentType);
    return res.send(req.food.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the food based on query object with 2 properties
    // search and category
    Food.find(query, (err, foods) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(foods);
    }).select("-photo");
  }
};
