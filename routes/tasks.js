const router = require("express").Router();
const multer = require("multer");
const { createTask, getAllTasks, getTeamTasks, updateTask, uploadData, getData } = require("../controller/tasks.controller");
const checkAuth = require("../helper/checkAuth");


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
router.post("/create", checkAuth, createTask)
router.get("/", checkAuth, getAllTasks) // getAll
router.get("/getTeamTasks/:teamId", checkAuth, getTeamTasks)  // getAll
router.patch("/updateTask", updateTask) // getAll
router.post("/uploadData", checkAuth, upload.fields([{ name: "files" }]), uploadData) // getAll
router.post("/getData", getData) // getAll

// router.post("/login", login)
// router.get("/", checkAuth, profile)
// router.patch("/", checkAuth, update)
// router.get("/all_list", getAll)
// router.delete("/:id", deleteOne) // delete

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