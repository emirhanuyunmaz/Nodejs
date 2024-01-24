const express = require("express")
const pageController = require("../controller/pageController");
const router = express.Router()
const redirectMidllewares = require("../middlewares/redirectMiddlewares")

//Sırasıyla verilen parametrelere göre işlemleri yapar . (middlewares)
router.route("/").get(pageController.getIndexPage)
router.route("/about").get(pageController.getAboutPage)
router.route("/register").get(redirectMidllewares,pageController.getRegisterPage)
router.route("/login").get(redirectMidllewares,pageController.getLoginPage)
router.route("/contact").get(pageController.getContactPage)
router.route("/contact").post(pageController.postMessage)

module.exports = router