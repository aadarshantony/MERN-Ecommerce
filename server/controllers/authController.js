const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist)
            return res.status(400).json({ message: "A user with the same EmailID already exist!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();

        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during signup" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (req.cookies?.token) {
            return res.status(400).json({ message: "Already Logged in" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found with the given Email ID, please signup first."
            });
        }

        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword) {
            return res.status(400).json({ message: "Invalid Email or Password!" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const cookieValue = [
            `token=${token}`,
            "HttpOnly",
            process.env.NODE_ENV === "production" ? "Secure" : "",
            "SameSite=None",
            "Partitioned",
            "Path=/",
            `Max-Age=${24 * 60 * 60}`,
        ]
            .filter(Boolean)
            .join("; ");

        res.setHeader("Set-Cookie", cookieValue);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login" });
    }
};



exports.logOut = (req, res) => {
    try {
        const clearCookieValue = [
            "token=",
            "HttpOnly",
            process.env.NODE_ENV === "production" ? "Secure" : "",
            "SameSite=None",
            "Partitioned",
            "Path=/",
            "Max-Age=0", // delete immediately
        ]
            .filter(Boolean)
            .join("; ");

        res.setHeader("Set-Cookie", clearCookieValue);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getUser = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ message: "User is LoggedIn", user });
    } catch (err) {
        console.log("Error getting user: ", err)
        res.status(500).json({ message: "Internal Server error" })
    }
}