import "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const access_token = req.cookies.token;
    if (!access_token) return res.status(401).json({ message: "You're not authenticated" });
    jwt.verify(access_token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAllowedRoleMiddleware =
  (...allowedRoles) =>
  (req, res, next) => {
    verifyToken(req, res, () => {
      const userRoles = req.user.payload?.roles;
      if (!userRoles) return res.status(401).send({ message: "User has no role!" });
      const allowedRolesArray = [...allowedRoles];
      const hasMatchingRole = userRoles.some((role) => allowedRolesArray.includes(role));
      if (!hasMatchingRole) return res.status(403).send({ message: "Require Allowed Role!" });
      next();
    });
  };
// export const isAdminMiddleware = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (!req.user.payload.role.includes('admin')) {
//       return res.status(403).send({ message: 'Require Admin Role!' });
//     }
//     next();
//   });
// };

// export const isStaffMiddleware = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (!req.user.payload.role.includes('staff')) {
//       return res.status(403).send({ message: 'Require Staff Role!' });
//     }
//     next();
//   });
// };
