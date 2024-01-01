const express = require("express");
const router = express.Router();

//IMPORTING CONTROLLER/PPRODUCT FILE
const productController = require("../controllers/product");
//Instead of putting method in server we can use express router to CRUD operation in a specific path liek /api or /
router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProduct);
router.put("/:id", productController.replaceProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
exports.routes = router;
