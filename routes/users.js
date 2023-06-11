const router = require("express").Router();
const multer = require("multer");
const checkAuth = require("../helper/checkAuth");

const { closeAttendance, checkLeaveWithDate, processLeave, getAllLeaves, applyLeave, register, login, profile, update, getAll, deleteOne, markAttendace, getTodayAttendace, getAllAttendaceByDate, getAllAttendaceByEmail } = require("../controller/users.controller");

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
router.post("/login", login)
router.post("/create", checkAuth, register)
router.get("/", checkAuth, profile)
router.patch("/", checkAuth, update)
router.get("/all_list", getAll)
router.delete("/:id", deleteOne) // delete
router.post("/markAttendace/", checkAuth, markAttendace) // getAll
router.post("/getTodayAttendace/", checkAuth, getTodayAttendace) // getAll
router.post("/getAllAttendaceByDate/", getAllAttendaceByDate) // getAll
router.post("/getAllAttendaceByEmail/", checkAuth, getAllAttendaceByEmail) // getAll
router.post("/applyLeave/", checkAuth, applyLeave) // getAll
router.get("/getAllLeaves/", checkAuth, getAllLeaves) // getAll
router.post("/processLeave/", checkAuth, processLeave) // getAll
router.post("/checkLeaveWithDate/", checkAuth, checkLeaveWithDate) // getAll
router.post("/closeAttendance/", checkAuth, closeAttendance) // getAll

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