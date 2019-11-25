const errorHandler = (err, req, res, next) => {
    if (typeof(err) === 'string') {
        // user application error
        return res.status(401).send({
            status: 400,
            error: err
        });
    }
    if (err.name === 'UnautorizedError') {
        // jwt authentification error
        return res.status(401).send({
            status: 401,
            error: 'Invalid Token'
        });
    }
    // default to 500 server error
    return res.status(500).send({ error: err.message })
}
module.exports = errorHandler;