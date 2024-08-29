const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.session.user.role !== role) {
      return res.status(300).json({ msg: "Access denied" });
    }
    next();
  };
};

module.exports = roleMiddleware;
