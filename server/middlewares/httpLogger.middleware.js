export function httpLogger(req, res, next) {
  let startTime = Date.now();
  res.on("finish", () => {
    let endTime = Date.now();
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${endTime - startTime} ms`,
    );
  });

  // call the next middleware
  next();
}
