const debug = (req, res, next) => {
    console.log("I received a request on user controller")
    // console.log(`The route is: ${req.originalUrl} and the method is ${req.method}`)
    next()
}
module.exports = debug