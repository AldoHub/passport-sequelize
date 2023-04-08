
const authMiddleware = () => {
    return(req, res, next)=>{
        console.log(
          `req.session.passport: ${JSON.stringify(req.session.passport)}`
        );

        if(req.isAuthenticated()){ 
            return next();
            
        }else{
            res.redirect("/auth/login");
        }
    }
}

module.exports = authMiddleware;