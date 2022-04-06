module.exports = (req, res, next) => {
  const authHeadred = req.get("Authorization");
  if (!authHeadred) {
    req.isAuth = false;
    return next();
  }
  const token = authHeadred.split(" ");
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToke;
  try {
    decodedToke = jwt.verfy(token, "sdgsdgsdg");
  } catch {
    req.isAuth = false;
    return next();
  }

  if (!decodedToke) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.email = decodedToke.email;
  next();
};
