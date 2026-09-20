export const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
export const ok = (res, data, message = "OK", status = 200, extra = {}) => res.status(status).json({ success: true, message, data, ...extra });
export const fail = (status, message) => Object.assign(new Error(message), { status });
export const pagination = (query) => { const page = Math.max(Number.parseInt(query.page, 10) || 1, 1); const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 100); return { page, limit, skip: (page - 1) * limit }; };
