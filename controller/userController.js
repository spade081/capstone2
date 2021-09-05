const User = require('../models/user');
const Product = require('../models/product')
const bcrypt = require('bcrypt')

const {createAccessToken} = require('../auth')


module.exports.getAllUsers = (req, res) =>{
	User.find({}, (err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
}
module.exports.getAllProducts =(req, res)=>{
	Product.find({isActive:true}, (err,result)=>{
		if(err){
			res.send(false)
		}else{
			res.send(result)
		}
		
	})

}

module.exports.getSingleProduct = (req, res) => {
	Product.findById({_id: req.params.productId}, (err, foundProduct) => (err) ? res.send(err) : res.send(foundProduct));
}

module.exports.register = (req, res)=>{
	let hashedPassword = bcrypt.hashSync(req.body.password, 10)
	if(req.body.firstName && req.body.lastName  && req.body.email && req.body.password ){
		User.findOne({email:req.body.email},(err,foundUser)=>{
			if(foundUser != null){
				res.send(`email already exists`)
			}else{
					let registerUser = new User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password:hashedPassword
					});

			registerUser.save((err, registeredUser)=>{
					if(err){
						console.log(err)
					}else{
						res.send(true)
					}
				});
			}

		})
		

	}else{
		res.send(`all fields are required`)
	}

}
// module.exports.product = (req, res)=>{

// }

module.exports.login = (req, res)=>{
	User.findOne({email:req.body.email}, (err, foundUser)=>{
		if(err){
			console.log(err)
		}else{
			if(foundUser !=null){
				if(req.body.password){
					let isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password);
					if(isPasswordCorrect){
						res.send({accessToken: createAccessToken(foundUser)});
					}else{
						// res.send("credentials are incorrect!")
						// return false
						res.send(false)
					}
				}
			}else{
				// res.send(`email is incorrect`)
					res.send(false)
			}
		}
	})
}
module.exports.profile = (req, res) => { 
	User.findOne({ _id: req.decodedUser.id }, (err, foundUser) => {
		if(err){
			console.log(err)
		}else{
			res.send(foundUser)
		}
	})
}

module.exports.userToAdmin = (req, res)=>{
	let id = req.params.userId;
	let updates = {
		isAdmin :true
	}
	let options = {new:true}
	User.findByIdAndUpdate(id, updates, options,(err, usersToAdmin)=>{
		if(err){
			console.log(err)
		}else{
			let response = {
				message: `Congratulations`,
				usersToAdmin: usersToAdmin
				
			}
			res.send(response);
		}
	})
}





