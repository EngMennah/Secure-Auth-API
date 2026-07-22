const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Protected Profile Route
router.get("/profile", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        res.json({

            message: "Welcome to your profile",

            user

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;