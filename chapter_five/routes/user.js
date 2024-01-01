const express = require("express");
const router = express.Router();

//IMPORTING CONTROLLER/PPRODUCT FILE
const userController = require("../controllers/user");
//Instead of putting method in server we can use express router to CRUD operation in a specific path liek /api or /
router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.replaceUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
exports.routes = router;
