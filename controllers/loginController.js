exports.login = (req, res) => {
    // Protected route and sends userdata that bcrypt gives (id, username, premium)
    res.send(req.user);
}