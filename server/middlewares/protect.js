const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.cookies.token

    if (!token)
        return res.status(401).json({ message: "Not logged in." })

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid or expired token" })

    }
}

module.exports = protect;