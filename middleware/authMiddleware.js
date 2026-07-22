const jwt = require("jsonwebtoken");


// Protect Routes Middleware
const authMiddleware = (req, res, next) => {

    try {

        // Get Token from Header
        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                message: "No token provided"
            });

        }


        // Token format: Bearer TOKEN
        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                message: "Invalid token format"
            });

        }


        // Verify Token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Add User Data to Request
        req.user = decoded;


        next();


    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });

    }

};


module.exports = authMiddleware;