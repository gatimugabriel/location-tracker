const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => { 
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message

    // mongo DB unique constraint error
    if (error.code === 11000) {
        message = `Duplicate field value entered`
        statusCode = 400
    }

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        message = `Resource not found`
        statusCode = 404
    }

    //unprocessable entity error
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(val => val.message)
        message = `Invalid input data. ${errors.join('. ')}`
        statusCode = 400
    }

    res.status(statusCode).json({
        success: false,
        message: message || error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
}

const errorMiddleware = {
    notFound, errorHandler
}
export default errorMiddleware
