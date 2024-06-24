import express from "express";
import passport from "passport";
import { myProfile,logout,sendOtp,verifyOtp } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
//this will redirect to google login
router.get("/googlelogin", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//     "/login",
//     passport.authenticate("google", {
//         successRedirect: process.env.FRONTEND_URL,
//     })
// );
router.get("/login",passport.authenticate("google"), (req, res, next) => {
    res.send("logged in");
});
router.get("/me",isAuthenticated, myProfile);
router.get("/logout", logout);
router.post("/sendOtp",sendOtp)
router.post("/verifyOtp",verifyOtp)

export default router;
