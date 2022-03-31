const withAuth = (req, res, next) => {
    //replace homepage text
    if (!req.[homepage].loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;