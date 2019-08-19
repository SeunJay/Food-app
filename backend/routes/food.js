const express = require("express");
const router = express.Router();

const {
  create,
  foodById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo
} = require("../controllers/food");

router.get("/food/:foodId", read);
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.post("/food/create/:userId", requireSignin, isAuth, isAdmin, create);
const { userById } = require("../controllers/user");

router.delete("/food/:foodId/:userId", requireSignin, isAuth, isAdmin, remove);

router.put("/food/:foodId/:userId", requireSignin, isAuth, isAdmin, update);

router.get("/foods", list);
router.get("/foods/search", listSearch);
router.get("/foods/related/:foodId", listRelated);
router.get("/foods/categories", listCategories);
router.post("/foods/by/search", listBySearch);
router.get("/food/photo/:foodId", photo);

router.param("userId", userById);
router.param("foodId", foodById);

module.exports = router;
