const jwt = require('jsonwebtoken');
const secret = "kayapasir?";

module.exports.createAccessToken = (authenticatedUser)=>{
	const data = {
		id:authenticatedUser._id,
		name:authenticatedUser.name,
	
		email:authenticatedUser.email,
		isAdmin: authenticatedUser.isAdmin
	}
	return jwt.sign(data,secret,{});
}

module.exports.verifyToken = (req, res, next)=>{
	let accessToken = req.headers.authorization;

	if(typeof accessToken === "undefined"){
		res.send(`Token is required`)
	}else{
		accessToken = accessToken.slice(7)
		jwt.verify(accessToken, secret,(err,decoded) =>{
			if(err){
				res.send(`authentication process failed token is invalid`)
			}else{
				req.decodedUser = decoded
				next();
			}
		});
	}
}
// module.exports.verifyIsAdmin = (req, res, next)=>{
// 	if(req.decodedUser.isAdmin){
// 		next();
// 	}else{
// 		res.send(`403 Forbidden! Admin access only`)
// 	}
// }

module.exports.verifyIsAdmin = (req,res ,next) =>{
		//receive the req.decodedUser
		//extract the isAdmin property to check if it true, threfore tge authentication user is an admin else the user is not an admin
		if(req.decodedUser.isAdmin){
			next();

		}else{
			res.send(`403 Forbidden! Admin access only!`)
		}
	}


module.exports.nonAdmin = (req, res, next)=>{
	if(req.decodedUser.isAdmin == false){
		next()
	}else{
		res.send(`403 Forbidden! Non Admin access only`)
	}
}