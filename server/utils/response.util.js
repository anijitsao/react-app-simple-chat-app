export function sendResponse(res, statusCode, data) {
  if (typeof statusCode !== "number") {
    statusCode = Number(statusCode);
  }

  res.status(statusCode).json(data);
}
