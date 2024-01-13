import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("unAuthorized");
  }

  //3. to verify the token

  try {
    const payload = jwt.verify(
      authHeader,
      "jdkqso1jwisoe7dofn4jfbk54mkfwr83dnikmc"
    );
    req.userID = payload.userId;
  } catch (error) {
    return res.status(401).send("unAuthorized");
  }

  next();
};

export default jwtAuth;
