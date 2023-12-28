const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Patient Registeration Route
router.post("/register-patient", async (req, res) => {
  await userRegister(req.body, "patient", res);
});

// Doctor Registration Route
router.post("/register-doctor", async (req, res) => {
  await userRegister(req.body, "doctor", res);
});

//  Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Patients Login Route
router.post("/login-patient", async (req, res) => {
  await userLogin(req.body, "patient", res);
});

// Doctors Login Route
router.post("/login-doctor", async (req, res) => {
  await userLogin(req.body, "doctor", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Patient Protected Route
router.get(
  "/patient-protectd",
  userAuth,
  checkRole(["patient"]),
  async (req, res) => {
    return res.json("Hello Patient");
  }
);

// Doctor Protected Route
router.get(
  "/doctor-protectd",
  userAuth,
  checkRole(["doctor"]),
  async (req, res) => {
    return res.json("Hello Doctor");
  }
);

//  Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

//  Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

module.exports = router;
