const allowedCors = require('./allowerCors')
const corsOption = {
     origin:(origin,callback) => {
        if(allowedCors.indexOf(origin) !== -1 || !origin)
          callback(null,true)
        else callback(new Error("Not allowed by CORS"))
     },
     credentials:true
}   
 module.exports = corsOption