const requireUser = (req, res, next) => {
  // console.log('🚀 ~ requireUser ~ res:', res);
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
