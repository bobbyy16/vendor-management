const errorMiddleware = (err, req, res, next) => {
    console.log("This is a error middleware");
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode)
    res.json({
        "message" : err.message,
        stack: process.env.NODE_ENV === "dev" ? err.stack : null
    })
}
module.exports = errorMiddleware