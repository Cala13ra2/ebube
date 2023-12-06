
const express = require("express")
const { getAllStudents, studentSignUp, studentLogin, initiateTransaction, verifyTransaction } = require("../controllers/studentCtrl")
const { validateStudentSignup, validateStudentLogin } = require("../middleswares/validations")

const router = express.Router()



router.get("/all-students", getAllStudents)

router.post("/register", validateStudentSignup, studentSignUp)

router.post("/login", validateStudentLogin, studentLogin)

router.post("/initiate", initiateTransaction)

router.post("/verify/:id", verifyTransaction)



module.exports = router