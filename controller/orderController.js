const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')
const Cart = require ('../models/cartModel')


module.exports.getAllOrder = (req, res)=>{
	Order.find({}, (err, result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
}

module.exports.userOrder = (req, res) => {
  let id = req.decodedUser.id;

  Order.find({ userId: id }, (err, foundOrders) => {
    if (err) {
      console.log(err);
    } else {
      if (foundOrders.length > 0) {
        let orders = foundOrders.map((order) => {
          return order.orders;
        });
        let merged = [].concat.apply([], orders);
        res.send(merged);
      } else {
        res.send({ error: `You don't have any order` });
      }
    }
  });
 }

 // module.exports.finalOrder = (req, res)=>{
 // 	let id = req.decodedUser.id;
 // 	Order.find({userId: id}, (err,foundOrders)=>{
 // 		if(err){
 // 			console.log(err)
 // 		}else{
 			
 // 		}
 // 	})
 // }

  module.exports.createOrder = (req,res)=>{
	console.log("iyak")
	let userId = req.decodedUser.id
	let firstName = req.decodedUser.firstName
	let productId = req.params.productId

	Product.findOne({_id: productId}, function(err,result){
			if(err){
			console.log(err)
		}else if(result.isActive === false){
			res.send({error: "Mali ka ng gawa "})
		}else {
			Order.findOne({userId: userId},(err,foundOrder)=>{
				if(err){
					console.log(err)
				}else if(foundOrder){
					let x = foundOrder.orders.find(order =>order.productId === productId)
					if(x){
						x.quantity += req.body.quantity

						foundOrder.totalAmount += x.price * req.body.quantity
						foundOrder.save((err,save)=>{
							if(err){
								res.send({error: "Error on saving order"})
							} else {
								res.send(save)
							} 
						})
					} else {
						let newOrder = {
							productId: productId,
							name: result.name,
							price: result.price,
							description: result.description,
							quantity: req.body.quantity
						}
						foundOrder.orders.push(newOrder)
						// console.log(foundOrder)
						foundOrder.totalAmount += result.price * req.body.quantity
						foundOrder.save((err,save)=>{
							if(err){
								res.send({error:err.message})
							} else {
								res.send(save)
							}
						})
					}
				} else {
					let newOrder = new Order({
						totalAmount: result.price * req.body.quantity,
						firstName: firstName,
						userId: userId,
						orders:[{
							productId: productId,
							name: result.name,
							description: result.description,
							price: result.price,
							quantity:req.body.quantity
						}]
					})
					newOrder.save((err,save)=>{
						if(err){
							res.send({error: "code 130"})
						} else {
							res.send(save)
						}
					})
				}
			})
		}
	})
}

exports.createMultipleOrders = (req,res) => {
  let userId = req.decodedUser.id

  Cart.findOne({userId: userId}, (err,foundCart) => {
    if(err) {
      res.send({error: err.message})
    }else if (foundCart){
      Order.findOne({userId:userId}, (err,foundOrder) => {
        if (err) {
          res.send({error: "You have no order"})
        }else {
          let newOrder = new Order({
            totalAmount: foundCart.totalAmount,
            userName: foundCart.userName,
            userId: foundCart.userId,
            orders: foundCart.orders
          });

          newOrder.save((err, save) => {
            if (err) {
              res.send({ error: err.message });
            } else {
              Cart.deleteOne({userId: userId}, (err, result) => {
                console.log("deleted")
                 res.send(save);
              })
             
            }
          });
        }
      })
    }else {
      res.send({error: "You have no cart"})
    }
  })

}