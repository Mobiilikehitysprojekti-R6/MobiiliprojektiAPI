const jwt = require('jsonwebtoken')
exports.login = (req, res) => {
    const options = {
        expiresIn: "1d"
    }
    const generatedJWT = jwt.sign(req.user, process.env.JWT_KEY, options);
    res.json({jwt: generatedJWT});
}