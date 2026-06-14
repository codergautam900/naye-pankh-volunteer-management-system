import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "same-origin" }
});

export const createRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 120, message = "Too many requests, please try again later" } = {}) => {
  return rateLimit({
    windowMs,
    limit: max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
      res.status(429);
      next(new Error(message));
    }
  });
};
