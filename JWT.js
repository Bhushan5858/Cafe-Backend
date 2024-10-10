const jwt =require('jsonwebtoken');
require('dotenv').config();

const SECRETE_KEY = process.env.SECRETE_KEY
const JWTmiddelware=(req,res,next)=>{

    const authorization=req.headers.authorization;

    if(!authorization) return res.status(401).json({err:"unauthorized first"})

        //getting token from headers part
        const token=authorization.split(" ")[1];

        if(!token) return res.status(401).json({err:"unauthorized second"})

            try{

                const decode = jwt.verify(token,SECRETE_KEY);
                req.userdata=decode;

                next();

            }catch(err){
                console.log(err)
                res.status(401).json({message:"unauthorized in catch"})
            }

    }


    //creating the token
    const createToken=(userdata)=>{

        return token = jwt.sign({userdata},SECRETE_KEY);
    }
    
    module.exports = { JWTmiddelware, createToken };
