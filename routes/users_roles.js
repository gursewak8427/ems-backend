const router = require("express").Router();
const multer = require("multer");
const checkAuth = require("../helper/checkAuth");

const { deleteOne, getOne, getAll, createRole, getPermissions, updatePermissions } = require("../controller/users_roles.controller");

// const multer = require("multer");
const storage = multer.diskStorage({
    destination: "uploads",

    filename: function (req, file, cb) {
        let name = `${Date.now().toString()}-${file.originalname}`;
        cb(null, name);
    },
});

var upload = multer({ storage: storage });

// User Login
router.post("/", createRole) // insert
router.get("/", getAll) // get All
router.get("/:id", getOne) // get one
router.delete("/:id", deleteOne) // delete
router.post("/get_permissions", getPermissions) // permissions get for specific role
router.patch("/update_permissions", updatePermissions) // permissions get for specific role

// router.post("/verifyToken", checkAuth, verifyToken)
// router.post("/login", studentLogin)
// router.post("/student_google_login", studentGoogleLogin)
// router.post("/register", studentRegister)
// router.post("/confirm", checkAuth, studentConfirmEmail)
// router.post("/resend_confirmation_email", checkAuth, resendEmail)
// router.get("/get_email_verification", checkAuth, getEmailVerification)
// router.post("/search", studentSearch)
// router.patch("/", checkAuth, studentUpdate)
// router.get("/", checkAuth, studentProfile)
// router.post("/forgotpassword", forgotPassword)
// router.post("/setnewpassword", checkAuth, setNewPassword)

// // Enroll's routes
// router.post("/enroll", checkAuth, enrollProgram)
// router.post("/getenrollprograms", checkAuth, getEnrollPrograms)

// router.post("/uploaddocument", checkAuth, upload.single("document"), uploadDocument)
// router.post("/getdocuments", checkAuth, getDocuments)
// router.post("/fillassessmentform", fillAssessmentForm)
// router.post("/fillsearchqueries", fillsearchqueries)
// router.post("/submitAllDocs", checkAuth, submitAllDocs)
// router.post("/approveProfile", checkAuth, approveProfile)
// router.post("/getNotifications", checkAuth, getNotifications)

// // router.post("/getHistory", checkAuth, getHistory) // DELETED
// router.post("/handlePayment", handlePayment)

// // router.post("/setRemark", checkAuth, setRemark) // DELETED
// router.post("/getRemarks", getRemarks)

// router.post("/testNotification", testNotification)

// router.post("/createOrder", createOrder)

// router.get("/landingPage", landingPage)
// router.get("/specifiCountry/:countryId", specifiCountry)
// router.get("/specificSchool/:schoolId", specificSchool)
// router.get("/discoverSchool/:searchQuery", discoverSchool)

module.exports = router;