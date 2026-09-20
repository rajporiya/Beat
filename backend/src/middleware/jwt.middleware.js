import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asyncHandler, fail } from "../utils/api.js";
const tokenFor = (req) => req.cookies?.token || req.headers.authorization?.replace(/^Bearer\s+/i, "");
export const requireAuth = asyncHandler(async (req, _res, next) => { const token = tokenFor(req); if (!token) throw fail(401, "Authentication required"); const payload = jwt.verify(token, process.env.JWT_SECRET); const user = await User.findById(payload.sub).select("-password"); if (!user) throw fail(401, "Account no longer exists"); req.user = user; next(); });
export const requireAdmin = (req, _res, next) => { if (req.user?.role !== "admin") return next(fail(403, "Administrator access required")); next(); };
