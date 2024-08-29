const authMiddleware = async (req, res, next) => {
  const user = req.session.user;

  if (!user) return res.status(201).json({ msg: "Unauthenticated!" });
  next();
};

module.exports = authMiddleware;
