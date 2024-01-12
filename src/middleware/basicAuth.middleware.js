import UserModel from "../features/user/user.model.js";

const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Invalid Authentication");
  }

  console.log("autheheader", authHeader);
  // the credentials will be in base64 extract from them
  const base64Cred = authHeader.replace("Basic ", "");

  // decode the base64 format
  console.log("rplaced", base64Cred);
  const decodedAuth = Buffer.from(base64Cred, "base64").toString("utf8");

  // decodedAuth will be [username:password] format
  console.log("decodedAuth", decodedAuth);
  const creds = decodedAuth.split(":");
  console.log("creds", creds);

  const user = UserModel.getAllUsers().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );

  if (!user) {
    return res.status(401).send("Authentication required");
  } else {
    next();
  }
};

export default basicAuth;
