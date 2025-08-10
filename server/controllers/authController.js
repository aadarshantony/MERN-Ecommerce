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

        const user = await User.findOne({ email });
        if(req.cookies.token) return res.status(400).json({ message: "Already Logged in" });
        if (!user)
            return res.status(400).json({ message: "User not found with the mailId, please signup first." });

        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword)
            return res.status(400).json({ message: "Invalid Email or Password!" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            partitioned: true,
            maxAge: 24 * 60 * 60 * 1000
        })



        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login" })
    }
}

exports.logOut = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            partitioned: true,
        })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("Error loggin out: ", err)
        res.status(500).json({ message: "Internal Server error" })
    }

}

exports.getUser = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ message: "User is LoggedIn", user });
    } catch (err) {
        console.log("Error getting user: ", err)
        res.status(500).json({ message: "Internal Server error" })
    }
}