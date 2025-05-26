module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || (requiredRole === 'admin' && !req.user.isAdmin)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};
