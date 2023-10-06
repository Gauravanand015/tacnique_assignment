const { rateLimit } = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 2 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { apiLimiter };
