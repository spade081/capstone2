const Product = require('../models/product');
const {createAccessToken} = require('../auth')




module.exports.getAllProducts = (req, res)=>{
	Product.find({}, (err,result)=>{
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
}

module.exports.getSingleProduct = (req, res)=>{

	let id = req.params.productId

	
	Product.findOne({_id: id}, (err, foundProduct)=>{
		if(err){
			console.log(err)
		}else{
			res.send(foundProduct)
		}
	})
}


module.exports.inputNewProduct = (req, res) =>{

	if(req.body.name && req.body.description && req.body.price){
		Product.findOne({name:req.body.name},(err, foundProduct)=>{
			if(foundProduct != null){
				res.send(`Product Already Exist`)
			}else{
				let inputNewProduct = new Product({
					name: req.body.name,
					description: req.body.description,
					price:req.body.price
				});
				inputNewProduct.save((err, registeredProduct)=>{
					if(err){
						console.log(err)
					}else{
						res.send(`Product is Successfully Added`)
					}
				})
			}
		})

	}else{
		res.send(`All Fields are required`)
	}

}
module.exports.updateProduct = (req, res) =>{
	let id = req.params.productId;
	let updates = {
		name: req.body.name,
		description:req.body.description,
		price:req.body.price
	}
	let options = {new:true}
	Product.findByIdAndUpdate(id, {$set:updates},options,(err,updatedProduct)=>{
		if(err){
			console.log(err);
		}else{
			res.send(`Product updated Successfully`)
		}
	})
}

module.exports.archiveProduct = (req, res)=>{
	let id = req.params.productId;
	let updates = {
		isActive :false
	}
	let options = {new:true}
	Product.findByIdAndUpdate(id, updates, options,(err, archivedProduct)=>{
		if(err){
			console.log(err)
		}else{
			let response = {
				message: `Product archived successfully`,
				archivedProduct: archivedProduct
			}
			res.send(response);
		}
	})
}