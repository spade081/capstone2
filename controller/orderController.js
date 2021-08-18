const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')


module.exports.getAllOrder = (req, res)=>{
	Order.find({}, (err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
}

// module.exports.ordered = (req, res)=>{
// 	let userId = req.decodedUser.productId
// 	let firstName = req.decodedUser.firstName
// 	let productId = req.params.productId

// 	product.find({_id:productId}, (err, result)=>{
// 		console.log(result)
// 		if(err){
// 			console.log(err)
// 		}else if(result.isActive == false){
// 			res.send(`Sorry, ${result.productName} is currently on backorder`)

// 		}else{
// 			Order.findOne({userId: userId},(err,foundOrder)=>{
// 				if(err){
// 					console.log(err)
// 				}else if(foundOrder){

// 				}
// 			})
// 		}
// 	})
// }
module.exports.userOrder = (req, res) => {
    let userId = req.decodedUser.id
    Order.find({userId}, (err, orderDetails) => {
        if(err){
            console.log(err)
        } else {
            res.send(orderDetails)
        }
    })
};


module.exports.ordered = (req, res)=>{
	Product.find({_id:req.body.productId},(err, foundProduct)=>{
		if(err){
			console.log(err)

		}else{
			// User.find({_id: req.decodedUser.id}, (err, foundUser)=>{
			// 	if(err){
			// 		console.log(err)
			// 	}else{
			// 		console.log(foundUser)
			// 	}

			// })
			console.log(req.decodedUser.email)
			console.log(req.decodedUser.firstName)
		
			let price = foundProduct[0].price
			let newOrder = new Order(
				{	
					firstName: req.decodedUser.firstName,
					// lastName:req.decodedUser.lastName,
					// email:req.decodedUser.email,
					name:req.decodedUser.name,
					userId: req.decodedUser.id,
					totalAmount: (req.body.quantity * price)
				}
			) 
			newOrder.save((err, saveOrder)=>{
				if(err){
					console.log(err)
				}else{
					saveOrder.ordered.push(req.body)
					saveOrder.save()
					res.send(`Walang atrasan sir sa order mo ${saveOrder}` )
				}
			})
		}

	})


}

	