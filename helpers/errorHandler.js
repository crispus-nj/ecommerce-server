function errorHandler(err, req, res, next){

    //jwt authenitication error
    if(err.name === 'UnauthorizedError'){
        return res.status(401).json({message : 'The User is not authorized!!'})
    }

    //validation error
    if(err.name === 'ValidationError'){
        return res.status(401).json({message : err})
    }

    //default to 500 server error
    return res.status(500).json(err);
}

module.exports = errorHandler;