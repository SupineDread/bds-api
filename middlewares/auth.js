const jwt = require('jsonwebtoken')
const moment = require('moment');

let secret = '/#escom/#2019/#key/#secret/#token'

exports.ensureAuth = function(req, res, next){

  if (!req.headers.authorization) {
    return res.status(403).json({message: 'Necesitas estar autenticado para acceder a esta funcion'})
  }

  let token = req.headers.authorization.replace(/['"]+/g, '')

  try{

    let payload = jwt.verify(token, secret)

    req.user = payload

    /*if (payload.exp <= moment().unix()) {
      return res.status(401).send({message: 'El token ha expirado'})
    }*/
  }catch(ex){
    return res.status(403).json({message: 'El token no es valido'})
  }

  next();

}