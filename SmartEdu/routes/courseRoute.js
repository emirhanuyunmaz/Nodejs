const express = require("express")
const courseController = require("../controller/courseController");
const router = express.Router()
const roleMiddleware = require("../middlewares/roleMiddlewares")

//Kayıt yapma işlemi...
router.route("/").post(roleMiddleware(["Teacher","Admin"]),courseController.createCourse) //http://localhost:3000/courses
router.route("/").get(courseController.getAllCourses)
router.route("/:slug").get(courseController.getCourse)
router.route("/enroll").post(courseController.enrollCourse) 
router.route("/release").post(courseController.releaseCourse) 


module.exports = router