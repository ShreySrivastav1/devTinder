const isAuthorised = (req,res,next) => {
    //code
    const tokenKey = "AdminPass";
    const isAdminAuth = tokenKey === "AdminPass"
    if(!isAdminAuth){
        res.status(401).send("Unauthorised Access")
    }
    else{
        console.log("valid admin, giving access to data")
        next();
    }
}   

const isAuthenticated = (req,res,next) => {
   const token = req.headers.authorization;
   if (!token) {
   return res.status(401).send("No token provided");
}

if (token === "123") {
   req.user = { role: "user" };
   return next();
}

if (token === "1234") {
   req.user = { role: "admin" };
   return next();
}

return res.status(403).send("Invalid token");

}

const isAdmin = (req,res,next) => {
    if(!token){
        return res.status(401).send("Login required");
    }
    if (req.user.role !== "admin"){
        return res.status(403).send("Access forbidden")
    }
      next();
}


module.exports = {isAuthorised , isAuthenticated , isAdmin};