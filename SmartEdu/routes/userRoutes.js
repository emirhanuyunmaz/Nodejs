const express = require("express")
const authController = require("../controller/authController");
const router = express.Router()
const authMiddleware = require("../middlewares/authMiddlewares")

router.route("/signup").post(authController.createUser) //http://localhost:3000/users
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage)

module.exports = router