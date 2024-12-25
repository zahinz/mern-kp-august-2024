import jwt from "jsonwebtoken";

function isAuthenticated(req, res, next) {
  // check the bearer token is valid and what is the user id
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const authToken = token.split(" ")[1];
  console.log(authToken);
  jwt.verify(authToken, "SUPA-DUPA-SECRET-KEY", function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(decoded);

    //   THIS IS THE LINE THAT ADD THE USER ID TO THE REQUEST OBJECT
    req.user = decoded.id;
    return next();
  });
}

export default isAuthenticated;
